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
		tokens {
			...Token
		}
	}
	${Token}
`;
export const SubgraphTokenLatestPrice = gql`
	fragment SubgraphTokenLatestPrice on LatestPrice {
		id
		asset
		price
		poolId {
			id
		}
		pricingAsset
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
export const TokenLatestPrices = gql`
	query TokenLatestPrices(
		$skip: Int
		$first: Int
		$orderBy: LatestPrice_orderBy
		$orderDirection: OrderDirection
		$where: LatestPrice_filter
		$block: Block_height
	) {
		latestPrices(skip: $skip, first: $first, orderBy: $orderBy, orderDirection: $orderDirection, where: $where, block: $block) {
			...SubgraphTokenLatestPrice
		}
	}
	${SubgraphTokenLatestPrice}
`;
