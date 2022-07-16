import { ChainId } from '@koyofinance/core-sdk';
import { CHAIN_EXCHANGE_SUBGRAPH } from '@koyofinance/exchange-sdk';
import { DEFAULT_CHAIN } from 'config/chain';
import { useWeb3 } from 'hooks/useWeb3';

export default function useExchangeSubgraphURL(chainId?: ChainId) {
	const { chainId: activeChainId } = useWeb3();

	return CHAIN_EXCHANGE_SUBGRAPH[activeChainId || chainId || DEFAULT_CHAIN]!;
}
