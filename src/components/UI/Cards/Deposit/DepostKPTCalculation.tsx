import { formatBalance, toBigNumber } from '@koyofinance/core-sdk';
import { BigNumber } from 'ethers';
import useQueryJoinPool from 'hooks/contracts/exchange/useQueryJoinPool';
import useTokenTotalSupply from 'hooks/contracts/useTokenTotalSupply';
import { LitePoolFragment } from 'query/generated/graphql-codegen-generated';
import React from 'react';
import { assetHelperBoba } from 'utils/assets';
import { joinExactTokensInForKPTOut } from 'utils/exchange/userData/joins';

export interface DepostKPTCalculationProps {
	pool?: LitePoolFragment;
	values?: Record<string, number>;
	account?: string;
}

const DepostKPTCalculation: React.FC<DepostKPTCalculationProps> = ({ pool, account = '', values = {} }) => {
	// @ts-expect-error We know what we passed.
	const [tokens, amounts]: [tokens: string[], amounts: BigNumber[]] = assetHelperBoba.sortTokens(
		pool?.tokens?.map((token) => token.address) || [],
		pool?.tokens?.map((token) => toBigNumber(values[token.name] || 0, token.decimals)) || []
	);

	const { data: poolTotalSupply = BigNumber.from(0) } = useTokenTotalSupply(pool?.address);
	const { data: lpOutput = [BigNumber.from(0)] } = useQueryJoinPool([
		pool?.id || '',
		account,
		account,
		{
			assets: tokens,
			maxAmountsIn: amounts,
			userData: joinExactTokensInForKPTOut(amounts, BigNumber.from(0)),
			fromInternalBalance: false
		}
	]);

	if (BigNumber.from(poolTotalSupply).eq(0)) return <>?</>;

	return <>{formatBalance(lpOutput[0])}</>;
};

export default DepostKPTCalculation;
