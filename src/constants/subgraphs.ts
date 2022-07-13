import { ChainId } from '@koyofinance/core-sdk';

export const GAUGES_SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/koyo-finance/exchange-subgraph-boba';

export const BOBA_EXCHANGE_SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/koyo-finance/exchange-subgraph-boba';
export const AURORA_EXCHANGE_SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/koyo-finance/exchange-subgraph-aurora';

export const ChainExchangeSubgraphURL: { [C in ChainId]?: string } = {
	[ChainId.BOBA]: BOBA_EXCHANGE_SUBGRAPH_URL,
	[ChainId.AURORA]: AURORA_EXCHANGE_SUBGRAPH_URL
};
