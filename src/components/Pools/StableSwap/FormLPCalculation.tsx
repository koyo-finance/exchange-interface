import { Pool } from 'constants/pools';
import { formatEther, parseUnits } from 'ethers/lib/utils';
import useCalculateTokenAmount from 'hooks/contracts/StableSwap/useCalculateTokenAmount';
import React from 'react';

export interface FormDepositLPCalculationProps {
	pool: Pool;
	amounts: number[];
	deposit?: boolean;
}

const FormLPCalculation: React.FC<FormDepositLPCalculationProps> = ({ pool, amounts, deposit }) => {
	const { data: tokenAmount = 0, error } = useCalculateTokenAmount(
		amounts.map((amount, i) => parseUnits(amount.toString(), pool.coins[i].decimals)),
		deposit || true,
		pool.deploy.name
	);

	console.log(error);

	return <>{formatEther(tokenAmount)}</>;
};

export default FormLPCalculation;
