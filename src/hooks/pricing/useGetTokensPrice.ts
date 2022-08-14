import useExchangeSubgraphURL from 'hooks/useExchangeSubgraphURL';
import { useGetLatestPricesQuery } from 'query/generated/graphql-codegen-generated';

export function useGetTokensPrice(tokens: string[]): number[] {
	const subgraphUrl = useExchangeSubgraphURL();

	const { data: latestPrices } = useGetLatestPricesQuery({
		endpoint: subgraphUrl
	});

	if (!latestPrices) return tokens.map(() => 0);

	return tokens.map((t) => {
		const price = latestPrices.prices.find((prices) => prices.asset === t.toLowerCase());
		const priceUSD = price ? parseFloat(price.priceUSD) : 0;

		return priceUSD;
	});
}
