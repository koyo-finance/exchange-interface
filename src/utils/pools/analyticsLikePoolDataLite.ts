import { LitePoolFragment } from 'query/generated/graphql-codegen-generated';

export interface PoolTokenData {
	__typename: string;

	id: string;
	name: string;
	address: string;
	symbol: string;

	decimals: number;
	weight: number;
}

export interface PoolData {
	__typename: string;

	id: string;
	address: string;
	poolType?: string | null;

	name: string;
	symbol: string;
	feeTier: number;
	swapFee: number;

	tokens: PoolTokenData[];
}

export function analyticsLikePoolDataLite(poolDataLite: LitePoolFragment): PoolData {
	return {
		...poolDataLite,
		name: poolDataLite.name || '',
		symbol: poolDataLite.symbol || '',
		feeTier: 1,
		swapFee: parseFloat(poolDataLite.swapFee),
		tokens: (poolDataLite.tokens || []).map((token) => {
			const weight = token.weight ? parseFloat(token.weight) : 0;

			return {
				...token,
				decimals: token.decimals,
				weight
			};
		})
	};
}
