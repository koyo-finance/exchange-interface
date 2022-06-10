import { formatBalance, toBigNumber } from '@koyofinance/core-sdk';
import { StableSwap, useGetCalculateTokenAmount } from '@koyofinance/swap-sdk';
import { bobaReadonlyProvider } from 'hooks/useProviders';
import React from 'react';

export interface DepositGetCalculationProps {
	poolAddress: string;
	amounts: number[];
	decimals: number[];
}

const DepositLPGetCalculation: React.FC<DepositGetCalculationProps> = ({ poolAddress, amounts, decimals }) => {
	const { data: tokenAmount = 0, error } = useGetCalculateTokenAmount(
		StableSwap.FourPool,
		amounts.map((amount, i) => toBigNumber(amount, decimals[i])),
		true,
		bobaReadonlyProvider,
		poolAddress
	);

	if (error) throw new Error(`Error: ${error}`);

	return <>{formatBalance(tokenAmount)}</>;
};

export default DepositLPGetCalculation;
