import { LitePoolFragment } from 'query/generated/graphql-codegen-generated';

export function getPoolWeightRatio(poolData: LitePoolFragment) {
	const tokens = poolData.tokens || [];
	let name = '';
	tokens.forEach((token, i) => {
		name += (Number(token.weight) * 100).toString();
		if (i === tokens.length - 1) return;
		name += '/';
	});
	return name;
}
