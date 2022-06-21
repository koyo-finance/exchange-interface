import { formatBalance, toBigNumber } from '@koyofinance/core-sdk';
import { BigNumber } from 'ethers';
import useQueryExitPool from 'hooks/contracts/exchange/useQueryExitPool';
import useTokenBalance from 'hooks/contracts/useTokenBalance';
import useTokenTotalSupply from 'hooks/contracts/useTokenTotalSupply';
import { LitePoolFragment } from 'query/generated/graphql-codegen-generated';
import React from 'react';
import { assetHelperBoba } from 'utils/assets';
import { exitKPTInForExactTokensOut } from 'utils/exchange/userData/exits';

export interface DepostKPTCalculationProps {
	pool?: LitePoolFragment;
	values?: Record<string, number>;
	account?: string;
}

const WithdrawKPTCalculation: React.FC<DepostKPTCalculationProps> = ({ pool, account = '', values = {} }) => {
	// @ts-expect-error We know what we passed.
	const [tokens, amounts]: [tokens: string[], amounts: BigNumber[]] = assetHelperBoba.sortTokens(
		pool?.tokens?.map((token) => token.address) || [],
		pool?.tokens?.map((token) => toBigNumber(values[token.name] || 0, token.decimals)) || []
	);

	const { data: poolTotalSupply = BigNumber.from(0) } = useTokenTotalSupply(pool?.address);
	const { data: lpTokenBalance = 0 } = useTokenBalance(account, pool?.address);
	const { data: lpOutput = [BigNumber.from(0)] } = useQueryExitPool([
		pool?.id || '',
		account,
		account,
		{
			assets: tokens,
			minAmountsOut: amounts,
			userData: exitKPTInForExactTokensOut(amounts, lpTokenBalance),
			toInternalBalance: false
		}
	]);

	if (BigNumber.from(poolTotalSupply).eq(0)) return <>?</>;

	return <>{formatBalance(lpOutput[0])}</>;
};

export default WithdrawKPTCalculation;
