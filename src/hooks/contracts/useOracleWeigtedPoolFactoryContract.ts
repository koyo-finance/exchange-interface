import { ChainId } from '@koyofinance/core-sdk';
import { DEFAULT_CHAIN } from 'config/chain';
import { ChainOracleWeightedPoolFactory } from 'constants/contracts';
import useProviders from 'hooks/useProviders';
import { useWeb3 } from 'hooks/useWeb3';
import { OracleWeightedPoolFactory__factory } from 'types/contracts/exchange';

export default function useOracleWeigtedPoolFactoryContract(chainId?: ChainId) {
	const { defaultedProvider, chainId: activeChainId } = useWeb3();
	const providers = useProviders();

	return OracleWeightedPoolFactory__factory.connect(
		ChainOracleWeightedPoolFactory[activeChainId || chainId || DEFAULT_CHAIN] as string,
		providers[activeChainId || chainId] || defaultedProvider
	);
}
