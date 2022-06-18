import gql from 'graphql-tag';
export const KoyoGauge = gql`
	fragment KoyoGauge on Gauge {
		id
		address
		name
		symbol
		killed
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
export const GetAllGauges = gql`
	query GetAllGauges {
		allGauges: gauges {
			...KoyoGauge
		}
	}
	${KoyoGauge}
`;
export const GetPools = gql`
	query GetPools {
		allPools: pools {
			...LitePool
		}
	}
	${LitePool}
`;
