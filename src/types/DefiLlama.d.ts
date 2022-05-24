export interface DefiLlamaProtocol {
	id: string;
	name: string;
	address: string | null;
	symbol: string;
	url: string;
	description: string;
	chain: string;
	logo: string;
	audits: string;
	audit_note: string | null;
	gecko_id: string | null;
	cmcId: string | null;
	category: string;
	chains: readonly string[];
	oracles: readonly string[];
	forkedFrom: readonly string[];
	module: string;
	twitter: string;
	listedAt: number;
	methodology: string;
	chainTvls: ChainTVLs;
	currentChainTvls: CurrentChainTVLs;
	tvl: readonly TVLEntry[];
	tokensInUsd: readonly TVLTokens[];
	tokens: readonly TVLTokens[];
}

export interface ChainTVLs {
	[K: string]: TVL;
}

export interface TVL {
	tvl: readonly TVLEntry[];
	tokensInUsd: readonly TVLTokens[];
	tokens: readonly TVLTokens[];
}

export interface TVLTokens {
	date: number;
	tokens: { [key: string]: number };
}

export interface TVLEntry {
	date: number;
	totalLiquidityUSD: number;
}

export interface CurrentChainTVLs {
	[K: string]: number;
}
