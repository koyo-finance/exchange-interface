import { SOR, SwapInfo } from '@balancer-labs/sor';
import type { SwapOptions } from 'hooks/SOR/useRoutedSwap';
import jpex from 'jpex';
import { useQuery } from 'react-query';

const IDENTITY_FN = (v: unknown) => v;

export function useGetSwaps(options: Required<Omit<SwapOptions, 'funds'>>) {
	const sor = jpex.resolve<SOR>();

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
		enabled: Boolean(options.tokenIn && options.tokenOut && options.amount),
		select: IDENTITY_FN as (v: SwapInfo) => SwapInfo
	});
}
