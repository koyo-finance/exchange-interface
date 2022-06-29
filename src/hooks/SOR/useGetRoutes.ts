import { SubgraphPoolBase, SwapV2 } from '@balancer-labs/sor';
import { BigNumber } from 'ethers';
import { getAddress } from 'ethers/lib/utils';
import { isSameAddress } from 'utils/isSameAddress';

export interface Route {
	share: number;
	hops: Hop[];
}
export interface Hop {
	pool: {
		id: string;
		tokens: Asset[];
	};
	tokenIn: string;
	tokenOut: string;
	amount: BigNumber;
}
export interface Asset {
	address: string;
	share: number;
}

export function useGetRoutes(addressIn: string, addressOut: string, pools: SubgraphPoolBase[], swaps: SwapV2[], addresses: string[]): Route[] {
	addressIn = getAddress(addressIn);
	addressOut = getAddress(addressOut);

	if (!pools.length || !swaps.length || !addresses.length || addresses.length === 1) {
		return [];
	}

	const totalSwapAmount = swaps.reduce((total, rawHops) => {
		return total.add(rawHops.amount || '0');
	}, BigNumber.from(0));

	// Contains direct and multihops
	const routes: Route[] = [];
	// Contains every token > token hop
	const allHops: Hop[] = [];

	for (let i = 0; i < swaps.length; i++) {
		const swap = swaps[i];
		const rawPool = pools.find((pool) => pool.id === swap.poolId);
		if (!rawPool) break;

		const tokenIn = getAddress(addresses[swap.assetInIndex]);
		const tokenOut = getAddress(addresses[swap.assetOutIndex]);
		const isDirectSwap = tokenIn === addressIn && tokenOut === addressOut ? true : false;

		const pool = {
			id: rawPool.id,
			tokens: rawPool.tokens
				.map((token) => {
					return {
						address: getAddress(token.address),
						share: parseFloat(token.weight || '') || 1 / rawPool.tokens.length
					};
				})
				.sort((a, b) => {
					if (isSameAddress(a.address, tokenIn) || isSameAddress(b.address, tokenOut)) {
						return -1;
					}
					if (isSameAddress(a.address, tokenOut) || isSameAddress(b.address, tokenIn)) {
						return 1;
					}
					return a.share - b.share;
				})
				.filter((_token, index, tokens) => {
					// Show first 2 and last 2 tokens
					return index < 2 || index > tokens.length - 3;
				})
		};

		const hop = {
			pool,
			tokenIn,
			tokenOut,
			amount: BigNumber.from(swap.amount || '0')
		};
		allHops.push(hop);

		if (isDirectSwap) {
			// Direct swaps are pushed to routes array immediately
			const share = hop.amount.div(totalSwapAmount).toNumber();
			const route = {
				share,
				hops: [hop]
			} as Route;
			routes.push(route);
		} else if (tokenOut === addressOut && swap.amount === '0') {
			// TokenOut with amount of 0 for multihop means it's a swapExactIn and previous swap is partner of hop
			const swapAmount = BigNumber.from(allHops[i - 1].amount);
			const share = swapAmount.div(totalSwapAmount).toNumber();
			const route = {
				share,
				hops: [allHops[i - 1], hop]
			} as Route;
			routes.push(route);
		} else if (tokenIn === addressIn && swap.amount === '0') {
			// TokenIn with amount of 0 for multihop means it's a swapExactOut and previous swap is partner of hop
			const swapAmount = BigNumber.from(allHops[i - 1].amount);
			const share = swapAmount.div(totalSwapAmount).toNumber();
			const route = {
				share,
				hops: [hop, allHops[i - 1]]
			} as Route;
			routes.push(route);
		}
	}

	return routes;
}
