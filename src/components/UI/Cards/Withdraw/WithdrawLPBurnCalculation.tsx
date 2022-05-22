import { formatBalance, toBigNumber } from '@koyofinance/core-sdk';
import useCalculateTokenAmount from 'hooks/contracts/StableSwap/useCalculateTokenAmount';
import React from 'react';

export interface WithdrawLPBurnCalculationProps {
	poolId: string;
	amounts: number[];
	decimals: number[];
}

const WithdrawLPBurnCalculation: React.FC<WithdrawLPBurnCalculationProps> = ({ poolId, amounts, decimals }) => {
	const { data: tokenAmount = 0, error } = useCalculateTokenAmount(
		amounts.map((amount, i) => toBigNumber(amount, decimals[i])),
		false,
		poolId
	);

	console.log(error);

	return <>{formatBalance(tokenAmount)}</>;
};

export default WithdrawLPBurnCalculation;
