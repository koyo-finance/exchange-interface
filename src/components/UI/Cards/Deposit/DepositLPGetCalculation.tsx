import { formatBalance, toBigNumber } from '@koyofinance/core-sdk';
import useCalculateTokenAmount from 'hooks/contracts/StableSwap/useCalculateTokenAmount';
import React from 'react';

export interface DepositGetCalculationProps {
	poolId: string;
	amounts: number[];
	decimals: number[];
}

const DepositLPGetCalculation: React.FC<DepositGetCalculationProps> = ({ poolId, amounts, decimals }) => {
	const { data: tokenAmount = 0, error } = useCalculateTokenAmount(
		amounts.map((amount, i) => toBigNumber(amount, decimals[i])),
		true,
		poolId
	);

	if (error) throw new Error(`Error: ${error}`);

	return <>{formatBalance(tokenAmount)}</>;
};

export default DepositLPGetCalculation;
