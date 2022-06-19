import { PoolDataService, SOR, TokenPriceService } from '@balancer-labs/sor';
import { ChainId } from '@koyofinance/core-sdk';
import { ChainMulticall1, ChainNativeWrappedAsset, ChainVault } from 'constants/contracts';
import { EXCHANGE_SUBGRAPH_URL } from 'constants/subgraphs';
import { bobaReadonlyProvider } from 'hooks/useProviders';
import jpex from 'jpex';
import { SubgraphPoolDataService } from 'utils/exchange/router/SubgraphPoolDataService';
import { SubgraphTokenPriceService } from 'utils/exchange/router/SubgraphTokenPriceService';

export function useInstantiateSORConstant() {
	const poolDataService = new SubgraphPoolDataService({
		chainId: ChainId.BOBA,
		provider: bobaReadonlyProvider,
		multiAddress: ChainMulticall1[ChainId.BOBA],
		vaultAddress: ChainVault[ChainId.BOBA],
		onchain: true,
		subgraphUrl: EXCHANGE_SUBGRAPH_URL
	});
	const priceService = new SubgraphTokenPriceService(ChainNativeWrappedAsset[ChainId.BOBA]);

	const sor = new SOR(
		bobaReadonlyProvider,
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
