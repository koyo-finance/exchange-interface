import { PoolDataService, SOR, TokenPriceService } from '@balancer-labs/sor';
import { JsonRpcProvider } from '@ethersproject/providers';
import { ChainId } from '@koyofinance/core-sdk';
import { ChainMulticall1, ChainNativeWrappedAsset, ChainVault } from 'constants/contracts';
import { EXCHANGE_SUBGRAPH_URL } from 'constants/subgraphs';
import { useJpex } from 'react-jpex';
import { AggregateTokenPriceService } from 'utils/exchange/router/AggregateTokenPriceService';
import { CoingeckoTokenPriceService } from 'utils/exchange/router/CoingeckoTokenPriceService';
import { SubgraphPoolDataService } from 'utils/exchange/router/SubgraphPoolDataService';
import { SubgraphTokenPriceService } from 'utils/exchange/router/SubgraphTokenPriceService';

export function useInstantiateSORConstant() {
	const jpex = useJpex();
	const customNodeProvider = new JsonRpcProvider('https://boba-rpc.koyo.finance/rpc', ChainId.BOBA);

	const poolDataService = new SubgraphPoolDataService({
		chainId: ChainId.BOBA,
		provider: customNodeProvider,
		multiAddress: ChainMulticall1[ChainId.BOBA],
		vaultAddress: ChainVault[ChainId.BOBA],
		onchain: true,
		subgraphUrl: EXCHANGE_SUBGRAPH_URL
	});

	const sgPriceService = new SubgraphTokenPriceService(ChainNativeWrappedAsset[ChainId.BOBA]);
	const cgPriceService = new CoingeckoTokenPriceService(ChainId.BOBA);

	const priceService = new AggregateTokenPriceService([cgPriceService, sgPriceService]);

	const sor = new SOR(
		customNodeProvider,
		{
			chainId: ChainId.BOBA,
			vault: ChainVault[ChainId.BOBA],
			weth: ChainNativeWrappedAsset[ChainId.BOBA]
		},
		poolDataService,
		priceService
	);

	jpex.constant<PoolDataService>(poolDataService);
	jpex.constant<TokenPriceService>(priceService);
	jpex.constant<SOR>(sor);
}
