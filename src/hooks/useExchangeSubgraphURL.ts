import { ChainId } from '@koyofinance/core-sdk';
import { DEFAULT_CHAIN } from 'config/chain';
import { ChainExchangeSubgraphURL } from 'constants/subgraphs';
import { useWeb3 } from 'hooks/useWeb3';

export default function useExchangeSubgraphURL(chainId?: ChainId) {
	const { chainId: activeChainId } = useWeb3();

	return ChainExchangeSubgraphURL[activeChainId || chainId || DEFAULT_CHAIN]!;
}
