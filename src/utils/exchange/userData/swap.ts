import { defaultAbiCoder } from '@ethersproject/abi';

export function swapData() {
	return defaultAbiCoder.encode(['uint256'], [0]);
}
