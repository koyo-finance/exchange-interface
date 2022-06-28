import { BigNumber, BigNumberish } from 'ethers';
import { PoolType } from 'state/reducers/createPool';

export function switchPoolCreationParameters(
	poolType: PoolType,
	weights: BigNumberish[] = [],
	amplificationParameter: BigNumberish = BigNumber.from(0),
	swapFeePercentage: BigNumberish = BigNumber.from(0)
): [BigNumberish[], string[], BigNumberish] | [BigNumberish[], BigNumberish, boolean] | [BigNumberish, BigNumberish] {
	weights = weights.map((w) => BigNumber.from(w).mul(BigNumber.from(10).pow(16)));

	switch (poolType) {
		case PoolType.WEIGHTED: {
			return [weights, weights.map(() => '0x0000000000000000000000000000000000000000'), swapFeePercentage];
		}
		case PoolType.ORACLE_WEIGHTED: {
			return [weights, swapFeePercentage, true];
		}
		case PoolType.STABLE: {
			return [amplificationParameter, swapFeePercentage];
		}
	}
}
