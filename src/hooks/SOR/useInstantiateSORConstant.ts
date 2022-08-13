import { PoolDataService, TokenPriceService } from '@balancer-labs/sor';
import { ChainId } from '@koyofinance/core-sdk';
import {
	AggregateTokenPriceService,
	CHAIN_EXCHANGE_SUBGRAPH,
	CHAIN_MULTICALL_ONE,
	CHAIN_NATIVE_WRAPPED_ASSET,
	CHAIN_VAULT,
	CoingeckoTokenPriceService,
	SubgraphPoolDataService,
	SubgraphTokenPriceService,
	SupportedChainsList
} from '@koyofinance/exchange-sdk';
import { KoyoSOR } from '@koyofinance/sor';
import { DEFAULT_CHAIN } from 'config/chain';
import { bobaReadonlyProvider } from 'hooks/useProviders';
import { useJpex } from 'react-jpex';
import useSORRPCProviders from './useSORRPCProviders';

export function useInstantiateSORConstant() {
	const jpex = useJpex();
	const providers = useSORRPCProviders();

	jpex.factory<PoolDataService>((chainId: ChainId) => {
		return new SubgraphPoolDataService({
			chainId,
			provider: providers[chainId] || providers[DEFAULT_CHAIN]!,
			multiAddress: CHAIN_MULTICALL_ONE[chainId] || CHAIN_MULTICALL_ONE[DEFAULT_CHAIN]!,
			vaultAddress: CHAIN_VAULT[chainId as SupportedChainsList] || CHAIN_VAULT[DEFAULT_CHAIN]!,
			onchain: true,
			subgraphUrl: CHAIN_EXCHANGE_SUBGRAPH[(chainId as SupportedChainsList) || DEFAULT_CHAIN]!
		});
	});

	jpex.factory<TokenPriceService>((chainId: ChainId) => {
		const sgPriceService = new SubgraphTokenPriceService(
			CHAIN_EXCHANGE_SUBGRAPH[chainId as SupportedChainsList],
			CHAIN_NATIVE_WRAPPED_ASSET[chainId] || CHAIN_NATIVE_WRAPPED_ASSET[DEFAULT_CHAIN]!
		);
		const cgPriceService = new CoingeckoTokenPriceService(chainId);

		const priceService = new AggregateTokenPriceService([cgPriceService, sgPriceService]);

		return priceService;
	});

	jpex.factory<KoyoSOR>((chainId: ChainId, poolDataService: PoolDataService, priceService: TokenPriceService) => {
		return new KoyoSOR(
			providers[chainId] || bobaReadonlyProvider,
			{
				chainId,
				vault: CHAIN_VAULT[chainId as SupportedChainsList] || CHAIN_VAULT[DEFAULT_CHAIN]!,
				weth: CHAIN_NATIVE_WRAPPED_ASSET[chainId] || CHAIN_NATIVE_WRAPPED_ASSET[DEFAULT_CHAIN]!
			},
			poolDataService,
			priceService
		);
	});
}
