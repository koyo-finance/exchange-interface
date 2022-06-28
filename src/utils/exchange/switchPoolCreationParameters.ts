import { BigNumber, BigNumberish } from 'ethers';
import { PoolType } from 'state/reducers/createPool';

const scalingFactor = BigNumber.from(10).pow(16);

export function switchPoolCreationParameters(
	poolType: PoolType,
	weights: BigNumberish[] = [],
	amplificationParameter: BigNumberish = BigNumber.from(0),
	swapFeePercentage: BigNumberish = 0
): [BigNumberish[], string[], BigNumberish] | [BigNumberish[], BigNumberish, boolean] | [BigNumberish, BigNumberish] {
	weights = weights.map((w) => BigNumber.from(w).mul(scalingFactor));
	swapFeePercentage = BigNumber.from((swapFeePercentage as number) * 10000).mul(BigNumber.from(scalingFactor).div(10000));

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
