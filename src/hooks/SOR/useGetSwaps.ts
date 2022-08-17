import { SwapInfo } from '@balancer-labs/sor';
import { ChainId } from '@koyofinance/core-sdk';
import { KoyoSOR } from '@koyofinance/sor';
import { DEFAULT_CHAIN } from 'config/chain';
import type { SwapOptions } from 'hooks/SOR/useRoutedSwap';
import { useWeb3 } from 'hooks/useWeb3';
import { useJpex } from 'react-jpex';
import { useQuery } from 'react-query';

const IDENTITY_FN = (v: unknown) => v;

export function useGetSwaps(options: Required<Omit<SwapOptions, 'funds'>>, enabled?: boolean, chainId?: ChainId) {
	const jpex = useJpex();
	const { chainId: activeChainId } = useWeb3();
	const sor = jpex.resolveWith<KoyoSOR, ChainId>([activeChainId || chainId || DEFAULT_CHAIN]);

	return useQuery({
		queryKey: ['swapRouting', options.tokenIn, options.tokenOut, options.swapType, options.amount],
		queryFn: async () => {
			await sor.fetchPools();

			const swapInfo = await sor.getSwaps(options.tokenIn, options.tokenOut, options.swapType, options.amount, {
				maxPools: options.maxHops,
				gasPrice: options.gasPrice,
				poolTypeFilter: options.poolTypeFilter,
				forceRefresh: options.forceRefresh
			});

			return swapInfo;
		},
		enabled: Boolean(options.tokenIn && options.tokenOut && options.amount) && enabled,
		select: IDENTITY_FN as (v: SwapInfo) => SwapInfo
	});
}
