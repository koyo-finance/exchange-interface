import gql from 'graphql-tag';
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
export const GetPools = gql`
	query GetPools {
		allPools: pools {
			...LitePool
		}
	}
	${LitePool}
`;
