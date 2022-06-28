import { SwapTypes } from '@balancer-labs/sor';
import { BigNumber } from 'ethers';

export function getLimits(
	tokenIn: string,
	tokenOut: string,
	swapType: SwapTypes,
	swapAmount: BigNumber,
	returnAmount: BigNumber,
	tokenAddresses: string[]
): string[] {
	// Limits:
	// +ve means max to send
	// -ve mean min to receive
	// For a multihop the intermediate tokens should be 0
	// This is where slippage tolerance would be added
	const limits: string[] = [];
	const amountIn = swapType === SwapTypes.SwapExactIn ? swapAmount : returnAmount;
	const amountOut = swapType === SwapTypes.SwapExactIn ? returnAmount : swapAmount;

	tokenAddresses.forEach((token, i) => {
		if (token.toLowerCase() === tokenIn.toLowerCase()) limits[i] = amountIn.toString();
		else if (token.toLowerCase() === tokenOut.toLowerCase()) {
			[limits[i]] = amountOut
				.mul('990000000000000000') // 0.99
				.div('1000000000000000000')
				.mul(-1)
				.toString()
				.split('.');
		} else {
			limits[i] = '0';
		}
	});

	return limits;
}
