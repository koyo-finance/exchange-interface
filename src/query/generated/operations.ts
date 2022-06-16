import gql from 'graphql-tag';
export const LitePool = gql`
	fragment LitePool on Pool {
		id
		address
		poolType
		name
	}
`;
export const GetPools = gql`
	query GetPools {
		allPools: pools {
			...LitePool
		}
	}
	${LitePool}
`;
