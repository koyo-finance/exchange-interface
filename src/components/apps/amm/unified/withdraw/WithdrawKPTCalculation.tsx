import { formatBalance, toBigNumber } from '@koyofinance/core-sdk';
import { BigNumber } from 'ethers';
import useQueryExitPool from 'hooks/vault/useQueryExitPool';
import useTokenBalance from 'hooks/generic/useTokenBalance';
import useTokenTotalSupply from 'hooks/generic/useTokenTotalSupply';
import { LitePoolFragment } from 'query/generated/graphql-codegen-generated';
import React, { useEffect } from 'react';
import { assetHelperBoba } from 'utils/assets';
import { exitKPTInForExactTokensOut } from 'utils/exchange/userData/exits';

export interface WithdrawKPTCalculationProps {
	pool?: LitePoolFragment;
	values?: Record<string, number>;
	account?: string;
	status?: string;
}

const WithdrawKPTCalculation: React.FC<WithdrawKPTCalculationProps> = ({ pool, account = '', values = {}, status }) => {
	// @ts-expect-error We know what we passed.
	const [tokens, amounts]: [tokens: string[], amounts: BigNumber[]] = assetHelperBoba.sortTokens(
		pool?.tokens?.map((token) => token.address) || [],
		pool?.tokens?.map((token) => toBigNumber(values[token.name] || 0, token.decimals)) || []
	);

	const { data: poolTotalSupply = BigNumber.from(0) } = useTokenTotalSupply(pool?.address);
	const { data: lpTokenBalance = 0 } = useTokenBalance(account, pool?.address);
	const { data: lpOutput = [BigNumber.from(0)], refetch: refetchQuery } = useQueryExitPool([
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

	useEffect(() => {
		if (status === 'success') refetchQuery();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [status]);

	if (BigNumber.from(poolTotalSupply).eq(0)) return <>?</>;

	return <>{formatBalance(lpOutput[0])}</>;
};

export default WithdrawKPTCalculation;
