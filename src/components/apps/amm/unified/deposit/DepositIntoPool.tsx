import { formatBalance, toBigNumber } from '@koyofinance/core-sdk';
import SingleEntityConnectButton from 'components/CustomConnectButton/SingleEntityConnectButton';
import DepositCardToken from 'components/apps/amm/unified/deposit/cards/DepositCardToken';
import DepositKPTCalculation from 'components/apps/amm/unified/deposit/DepositKPTCalculation';
import FormApproveAsset from 'components/FormApproveAsset';
import { vaultContract } from 'core/contracts';
import { BigNumber } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';
import { Form, Formik } from 'formik';
import useJoinPool from 'hooks/contracts/exchange/useJoinPool';
import useMultiTokenAllowance from 'hooks/contracts/useMultiTokenAllowance';
import useMultiTokenBalances from 'hooks/contracts/useMultiTokenBalances';
import useTokenBalance from 'hooks/contracts/useTokenBalance';
import useTokenTotalSupply from 'hooks/contracts/useTokenTotalSupply';
import { LitePoolFragment, TokenFragment } from 'query/generated/graphql-codegen-generated';
import React, { useEffect, useState } from 'react';
import { Case, Default, Switch } from 'react-if';
import { assetHelperBoba } from 'utils/assets';
import { joinExactTokensInForKPTOut, joinInit } from 'utils/exchange/userData/joins';
import { useAccount, useSigner } from 'wagmi';

export interface DepositIntoPoolProps {
	selectedPool: LitePoolFragment;
}

const DepositIntoPool: React.FC<DepositIntoPoolProps> = ({ selectedPool }) => {
	const { data: account } = useAccount();
	const accountAddress = account?.address || '';
	const { data: signer } = useSigner();

	const [resetInputs, setResetInputs] = useState(false);

	const allowances = useMultiTokenAllowance(
		account?.address,
		vaultContract.address,
		selectedPool?.tokens?.map((coin) => coin.address)
	);

	const balances = useMultiTokenBalances(
		account?.address,
		selectedPool?.tokens?.map((coin) => coin.address)
	);

	const { data: poolTotalSupply = BigNumber.from(0) } = useTokenTotalSupply(selectedPool?.address);

	const { data: lpTokenBalance = BigNumber.from(0) } = useTokenBalance(account?.address, selectedPool?.address);
	const { mutate: addLiqudity, status: deposited } = useJoinPool(signer || undefined);

	useEffect(() => {
		if (deposited === 'success') {
			setResetInputs(true);
			return;
		}
		setResetInputs(false);
	}, [deposited]);

	return (
		<div className={selectedPool ? 'block' : 'hidden'}>
			<Formik
				// @ts-expect-error Huh
				initialValues={Object.fromEntries(selectedPool.tokens?.map((token: TokenFragment) => [token.name, 0]))}
				onSubmit={(values) => {
					// @ts-expect-error We know what we passed.
					const [tokens, amounts]: [tokens: string[], amounts: BigNumber[]] = assetHelperBoba.sortTokens(
						selectedPool.tokens?.map((token) => token.address) || [],
						selectedPool.tokens?.map((token) => toBigNumber(values[token.name], token.decimals)) || []
					);

					return addLiqudity([
						selectedPool.id,
						accountAddress,
						accountAddress,
						{
							assets: tokens,
							maxAmountsIn: amounts,
							userData: BigNumber.from(poolTotalSupply).gt(0) ? joinExactTokensInForKPTOut(amounts, toBigNumber(0)) : joinInit(amounts),
							fromInternalBalance: false
						}
					]);
				}}
			>
				{(props) => (
					<Form>
						<div>
							<div className="mt-4 grid grid-cols-1 gap-8 md:grid-cols-2">
								{selectedPool.tokens?.map((coin: TokenFragment, i) => (
									<div key={coin.address}>
										<DepositCardToken
											key={coin.id}
											coin={coin}
											balance={balances[i].data || 0}
											resetValues={resetInputs}
											setInputAmount={props.setFieldValue}
										/>
									</div>
								))}
							</div>
							<div className="mt-4 flex flex-col justify-between rounded-xl bg-darks-500 p-4 md:flex-row">
								<div>
									LP tokens recieved:{' '}
									<span className="underline">
										<DepositKPTCalculation pool={selectedPool} values={props.values} account={accountAddress} />
									</span>
								</div>
								<div>
									LP token balance: <span className="underline">{formatBalance(lpTokenBalance)}</span>
								</div>
							</div>
							<div className="mt-2">
								<SingleEntityConnectButton
									className=" btn mt-2 w-full bg-lights-400 bg-opacity-100 p-0 text-black hover:bg-lights-400"
									invalidNetworkClassName="bg-red-600 text-white hover:bg-red-400"
								>
									<Switch>
										{selectedPool.tokens?.map((coin, i) => (
											<Case
												condition={BigNumber.from(allowances[i].data || 0).lt(
													parseUnits((props.values[coin.name] || 0).toString(), coin.decimals)
												)}
												key={coin.id}
											>
												<FormApproveAsset
													asset={coin.address}
													spender={vaultContract.address}
													amount={100_000}
													decimals={coin.decimals}
													className="h-full w-full"
												>
													APPROVE - <span className="italic">{coin.name.toUpperCase()}</span>
												</FormApproveAsset>
											</Case>
										))}

										<Default>
											<button type="submit" className="h-full w-full">
												DEPOSIT
											</button>
										</Default>
									</Switch>
								</SingleEntityConnectButton>
							</div>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default DepositIntoPool;
