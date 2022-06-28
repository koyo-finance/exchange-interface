import { SwapInfo, SwapTypes } from '@balancer-labs/sor';
import { formatFixed } from '@ethersproject/bignumber';
import { TokenInfo } from '@uniswap/token-lists';

export function useAmountScaled(
	swapInfo?: SwapInfo,
	tokenIn?: TokenInfo,
	tokenOut?: TokenInfo,
	swapType: SwapTypes = SwapTypes.SwapExactIn
): { in: string; out: string } {
	if (!swapInfo || !tokenIn || !tokenOut) return { in: '0', out: '0' };

	const amtInScaled =
		swapType === SwapTypes.SwapExactIn
			? formatFixed(swapInfo.swapAmount, tokenIn.decimals)
			: formatFixed(swapInfo.returnAmount, tokenIn.decimals);
	const amtOutScaled =
		swapType === SwapTypes.SwapExactIn
			? formatFixed(swapInfo.returnAmount, tokenOut.decimals)
			: formatFixed(swapInfo.swapAmount, tokenOut.decimals);

	return { in: amtInScaled, out: amtOutScaled };
}
