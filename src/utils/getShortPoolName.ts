import { LitePoolFragment } from 'query/generated/graphql-codegen-generated';

export function getShortPoolName(poolData: LitePoolFragment) {
	const tokens = poolData.tokens || [];
	let name = '';
	tokens.forEach((token, i) => {
		name += token.symbol;
		if (i === tokens.length - 1) return;
		name += '/';
	});
	return name;
}
