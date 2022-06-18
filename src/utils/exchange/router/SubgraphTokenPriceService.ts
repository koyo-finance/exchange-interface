import { TokenPriceService } from '@balancer-labs/sor';
import { fetch as sapphireFetch, FetchMethods, FetchResultTypes } from '@sapphire/fetch';
import { EXCHANGE_SUBGRAPH_URL } from 'constants/subgraphs';
import { keyBy } from 'lodash';
import { TokenLatestPricesDocument, TokenLatestPricesQuery } from 'query/generated/graphql-codegen-generated';

export class SubgraphTokenPriceService implements TokenPriceService {
	private readonly weth: string;

	public constructor(weth: string) {
		// the subgraph addresses are all toLowerCase
		this.weth = weth.toLowerCase();
	}

	public async getNativeAssetPriceInToken(tokenAddress: string): Promise<string> {
		const ethPerToken = await this.getLatestPriceInEthFromSubgraph(tokenAddress);

		if (!ethPerToken) {
			throw Error('No price found in the subgraph');
		}

		// We want the price of 1 ETH in terms of the token base units
		return `${1 / ethPerToken}`;
	}

	public async getLatestPriceInEthFromSubgraph(tokenAddress: string): Promise<number | null> {
		tokenAddress = tokenAddress.toLowerCase();

		const { data: tokenLatestPricesData } = await sapphireFetch<{ data: TokenLatestPricesQuery }>(
			EXCHANGE_SUBGRAPH_URL,
			{
				method: 'POST' as FetchMethods,
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					query: TokenLatestPricesDocument,
					variables: [
						'TokenLatestPrices',
						{
							where: { asset_in: [tokenAddress, this.weth] }
						}
					]
				})
			},
			'json' as FetchResultTypes.JSON
		);
		const { latestPrices } = tokenLatestPricesData;
		const pricesKeyedOnId = keyBy(latestPrices, 'id');

		// the ids are set as ${asset}-${pricingAsset}
		// first try to find an exact match
		if (pricesKeyedOnId[`${tokenAddress}-${this.weth}`]) {
			return parseFloat(pricesKeyedOnId[`${tokenAddress}-${this.weth}`].price);
		}

		// no exact match, try to traverse the path
		const matchingLatestPrices = latestPrices.filter((price) => price.asset === tokenAddress);

		// pick the first one we match on.
		// There is no timestamp on latestPrice, should get introduced to allow for sorting by latest
		for (const tokenPrice of matchingLatestPrices) {
			const pricingAssetPricedInEth = pricesKeyedOnId[`${tokenPrice.pricingAsset}-${this.weth}`];

			// 1 BAL = 20 USDC, 1 USDC = 0.00025 ETH, 1 BAL = 20 * 0.00025
			if (pricingAssetPricedInEth) {
				return parseFloat(tokenPrice.price) * parseFloat(pricingAssetPricedInEth.price);
			}
		}

		return null;
	}
}
