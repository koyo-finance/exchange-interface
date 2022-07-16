import { SubgraphPoolBase } from '@balancer-labs/sor';
import { ChainId } from '@koyofinance/core-sdk';
import { KoyoSOR } from '@koyofinance/sor';
import { DEFAULT_CHAIN } from 'config/chain';
import { useWeb3 } from 'hooks/useWeb3';
import { useJpex } from 'react-jpex';
import { useQuery } from 'react-query';

const IDENTITY_FN = (v: unknown) => v;

export function useGetSORPools(chainId?: ChainId) {
	const jpex = useJpex();
	const { chainId: activeChainId } = useWeb3();
	const sor = jpex.resolveWith<KoyoSOR, ChainId>([activeChainId || chainId || DEFAULT_CHAIN]);

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
