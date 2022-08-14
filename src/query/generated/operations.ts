import gql from 'graphql-tag';
export const KoyoGauge = gql`
	fragment KoyoGauge on Gauge {
		id
		address
		name
		symbol
		killed
		pool {
			id
			address
			name
		}
	}
`;
export const Token = gql`
	fragment Token on PoolToken {
		id
		name
		address
		symbol
		decimals
		weight
	}
`;
export const LitePool = gql`
	fragment LitePool on Pool {
		id
		name
		symbol
		address
		poolType
		swapFee
		totalLiquidity
		owner {
			address
		}
		tokens {
			...Token
		}
	}
	${Token}
`;
export const LatestPrice = gql`
	fragment LatestPrice on LatestPrice {
		asset
		pricingAsset
		price
		priceUSD
		poolId {
			id
		}
	}
`;
export const GetAllGauges = gql`
	query GetAllGauges {
		allGauges: gauges(first: 1000) {
			...KoyoGauge
		}
	}
	${KoyoGauge}
`;
export const GetPools = gql`
	query GetPools {
		allPools: pools(first: 1000) {
			...LitePool
		}
	}
	${LitePool}
`;
export const GetLatestPrices = gql`
	query GetLatestPrices {
		prices: latestPrices(first: 1000) {
			...LatestPrice
		}
	}
	${LatestPrice}
`;
