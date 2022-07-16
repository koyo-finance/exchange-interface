import { defaultAbiCoder } from '@ethersproject/abi';
import { JoinKind, JOIN_KIND_ABI_STRUCTURE } from '@koyofinance/exchange-sdk';
import { BigNumber, BigNumberish } from 'ethers';

export function joinInit(amountsIn: BigNumber[]) {
	return defaultAbiCoder.encode(JOIN_KIND_ABI_STRUCTURE[JoinKind.INIT], [
		JoinKind.INIT, //
		amountsIn
	]);
}

export function joinExactTokensInForKPTOut(amountsIn: BigNumber[], minimumKPT: BigNumber) {
	return defaultAbiCoder.encode(JOIN_KIND_ABI_STRUCTURE[JoinKind.EXACT_TOKENS_IN_FOR_BPT_OUT], [
		JoinKind.EXACT_TOKENS_IN_FOR_BPT_OUT, //
		amountsIn,
		minimumKPT
	]);
}

export function joinTokenInForExactKPTOut(kptAmountOut: BigNumber, enterTokenIndex: BigNumberish) {
	return defaultAbiCoder.encode(JOIN_KIND_ABI_STRUCTURE[JoinKind.TOKEN_IN_FOR_EXACT_BPT_OUT], [
		JoinKind.TOKEN_IN_FOR_EXACT_BPT_OUT, //
		kptAmountOut,
		enterTokenIndex
	]);
}

export function joinAllTokensInForExactKPTOut(kptAmountOut: BigNumber) {
	return defaultAbiCoder.encode(JOIN_KIND_ABI_STRUCTURE[JoinKind.ALL_TOKENS_IN_FOR_EXACT_BPT_OUT], [
		JoinKind.ALL_TOKENS_IN_FOR_EXACT_BPT_OUT, //
		kptAmountOut
	]);
}
