import { SOR, SubgraphPoolBase } from '@balancer-labs/sor';
import jpex from 'jpex';
import { useQuery } from 'react-query';

const IDENTITY_FN = (v: unknown) => v;

export function useGetSORPools() {
	const sor = jpex.resolve<SOR>();

	return useQuery({
		queryKey: ['sor', 'pools'],
		queryFn: async () => {
			await sor.fetchPools();

			return sor.getPools();
		},
		enabled: Boolean(sor),
		select: IDENTITY_FN as (v: SubgraphPoolBase[]) => SubgraphPoolBase[]
	});
}
