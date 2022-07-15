import { ChainId } from '@koyofinance/core-sdk';
import { DEFAULT_CHAIN } from 'config/chain';
import { ChainWeightedPoolFactory } from 'constants/contracts';
import useProviders from 'hooks/useProviders';
import { useWeb3 } from 'hooks/useWeb3';
import { WeightedPoolFactory__factory } from 'types/contracts/exchange';

export default function useWeigtedPoolFactoryContract(chainId?: ChainId) {
	const { defaultedProvider, chainId: activeChainId } = useWeb3();
	const providers = useProviders();

	return WeightedPoolFactory__factory.connect(
		ChainWeightedPoolFactory[activeChainId || chainId || DEFAULT_CHAIN] as string,
		providers[activeChainId || chainId] || defaultedProvider
	);
}
