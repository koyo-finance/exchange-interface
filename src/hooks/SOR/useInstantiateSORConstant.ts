import { PoolDataService, SOR, TokenPriceService } from '@balancer-labs/sor';
import { ChainId } from '@koyofinance/core-sdk';
import { DEFAULT_CHAIN } from 'config/chain';
import { ChainMulticall1, ChainNativeWrappedAsset, ChainVault } from 'constants/contracts';
import { EXCHANGE_SUBGRAPH_URL } from 'constants/subgraphs';
import { bobaReadonlyProvider } from 'hooks/useProviders';
import { useWeb3 } from 'hooks/useWeb3';
import { useJpex } from 'react-jpex';
import { AggregateTokenPriceService } from 'utils/exchange/router/AggregateTokenPriceService';
import { CoingeckoTokenPriceService } from 'utils/exchange/router/CoingeckoTokenPriceService';
import { SubgraphPoolDataService } from 'utils/exchange/router/SubgraphPoolDataService';
import { SubgraphTokenPriceService } from 'utils/exchange/router/SubgraphTokenPriceService';
import useSORRPCProviders from './useSORRPCProviders';

export function useInstantiateSORConstant() {
	const jpex = useJpex();
	const { defaultedProvider } = useWeb3();
	const providers = useSORRPCProviders();

	jpex.factory<PoolDataService>((chainId: ChainId) => {
		return new SubgraphPoolDataService({
			chainId,
			provider: providers[chainId] || defaultedProvider,
			multiAddress: ChainMulticall1[chainId] || ChainMulticall1[DEFAULT_CHAIN]!,
			vaultAddress: ChainVault[chainId] || ChainVault[DEFAULT_CHAIN]!,
			onchain: true,
			subgraphUrl: EXCHANGE_SUBGRAPH_URL
		});
	});

	jpex.factory<TokenPriceService>((chainId: ChainId) => {
		const sgPriceService = new SubgraphTokenPriceService(ChainNativeWrappedAsset[chainId] || '');
		const cgPriceService = new CoingeckoTokenPriceService(chainId);

		const priceService = new AggregateTokenPriceService([cgPriceService, sgPriceService]);

		return priceService;
	});

	jpex.factory<SOR>((chainId: ChainId, poolDataService: PoolDataService, priceService: TokenPriceService) => {
		return new SOR(
			providers[chainId] || bobaReadonlyProvider,
			{
				chainId,
				vault: ChainVault[chainId] || ChainVault[DEFAULT_CHAIN]!,
				weth: ChainNativeWrappedAsset[chainId] || ChainNativeWrappedAsset[DEFAULT_CHAIN]!
			},
			poolDataService,
			priceService
		);
	});
}
