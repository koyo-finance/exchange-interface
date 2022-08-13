import { ChainId } from '@koyofinance/core-sdk';
import { CHAIN_ORACLE_WEIGHTED_POOL_FACTRORY, SupportedChainsList } from '@koyofinance/exchange-sdk';
import { DEFAULT_CHAIN } from 'config/chain';
import useProviders from 'hooks/useProviders';
import { useWeb3 } from 'hooks/useWeb3';
import { OracleWeightedPoolFactory__factory } from 'types/contracts/exchange';

export default function useOracleWeigtedPoolFactoryContract(chainId?: ChainId) {
	const { defaultedProvider, chainId: activeChainId } = useWeb3();
	const providers = useProviders();

	return OracleWeightedPoolFactory__factory.connect(
		CHAIN_ORACLE_WEIGHTED_POOL_FACTRORY[(activeChainId || chainId || DEFAULT_CHAIN) as SupportedChainsList] as string,
		providers[activeChainId || chainId] || defaultedProvider
	);
}
