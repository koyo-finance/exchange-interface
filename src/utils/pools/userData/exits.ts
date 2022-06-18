import { defaultAbiCoder } from '@ethersproject/abi';
import { EXIT_KIND_ABI_STRUCTURE } from 'constants/vault';
import { ExitKind } from 'enums/ExitKind';
import { BigNumber, BigNumberish } from 'ethers';

export function exitExactKPTInForOneTokenOut(kptAmountIn: BigNumber, exitTokenIndex: BigNumberish) {
	return defaultAbiCoder.encode(EXIT_KIND_ABI_STRUCTURE[ExitKind.EXACT_BPT_IN_FOR_ONE_TOKEN_OUT], [
		ExitKind.EXACT_BPT_IN_FOR_ONE_TOKEN_OUT, //
		kptAmountIn,
		exitTokenIndex
	]);
}

export function exitExactKPTInForTokensOut(kptAmountIn: BigNumber) {
	return defaultAbiCoder.encode(EXIT_KIND_ABI_STRUCTURE[ExitKind.EXACT_BPT_IN_FOR_TOKENS_OUT], [
		ExitKind.EXACT_BPT_IN_FOR_TOKENS_OUT, //
		kptAmountIn
	]);
}

export function exitKPTInForExactTokensOut(amountsOut: BigNumber[], maxKPTAmountIn: BigNumberish) {
	return defaultAbiCoder.encode(EXIT_KIND_ABI_STRUCTURE[ExitKind.BPT_IN_FOR_EXACT_TOKENS_OUT], [
		ExitKind.BPT_IN_FOR_EXACT_TOKENS_OUT, //
		amountsOut,
		maxKPTAmountIn
	]);
}
