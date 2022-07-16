import { ChainId } from '@koyofinance/core-sdk';
import { CHAIN_WEIGHTED_POOL_FACTORY } from '@koyofinance/exchange-sdk';
import { DEFAULT_CHAIN } from 'config/chain';
import useProviders from 'hooks/useProviders';
import { useWeb3 } from 'hooks/useWeb3';
import { WeightedPoolFactory__factory } from 'types/contracts/exchange';

export default function useWeigtedPoolFactoryContract(chainId?: ChainId) {
	const { defaultedProvider, chainId: activeChainId } = useWeb3();
	const providers = useProviders();

	return WeightedPoolFactory__factory.connect(
		CHAIN_WEIGHTED_POOL_FACTORY[activeChainId || chainId || DEFAULT_CHAIN] as string,
		providers[activeChainId || chainId] || defaultedProvider
	);
}
