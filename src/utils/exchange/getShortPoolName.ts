import { LitePoolFragment } from 'query/generated/graphql-codegen-generated';
import { analyticsLikePoolDataLite } from './analyticsLikePoolDataLite';

export function getShortPoolName(poolData: LitePoolFragment) {
	const analyticsLikePoolData = analyticsLikePoolDataLite(poolData);

	let shortName = '';
	shortName = analyticsLikePoolData.tokens.map((e) => e.symbol).join('/');
	if (analyticsLikePoolData.tokens[1].weight !== 0) {
		const ratios = ` (${analyticsLikePoolData.tokens.map((e) => Number(e.weight * 100).toFixed(0)).join('/')})`;
		shortName += ratios;
	}
	return shortName;
}
