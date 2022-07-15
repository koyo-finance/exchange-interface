import { MaxUint256 } from '@ethersproject/constants';
import { formatBalance, toBigNumber } from '@koyofinance/core-sdk';
import DepositCardToken from 'components/apps/amm/unified/deposit/cards/DepositCardToken';
import DepositKPTCalculation from 'components/apps/amm/unified/deposit/DepositKPTCalculation';
import SingleEntityConnectButton from 'components/CustomConnectButton/SingleEntityConnectButton';
import FormApproveAsset from 'components/FormApproveAsset';
import { BigNumber } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';
import { Form, Formik } from 'formik';
import useJoinPool from 'hooks/vault/useJoinPool';
import useMultiTokenAllowance from 'hooks/generic/useMultiTokenAllowance';
import useMultiTokenBalances from 'hooks/generic/useMultiTokenBalances';
import useTokenBalance from 'hooks/generic/useTokenBalance';
import useTokenTotalSupply from 'hooks/generic/useTokenTotalSupply';
import { useWeb3 } from 'hooks/useWeb3';
import { LitePoolFragment, TokenFragment } from 'query/generated/graphql-codegen-generated';
import React, { useEffect, useState } from 'react';
import { Case, Default, Switch } from 'react-if';
import { assetHelperBoba } from 'utils/assets';
import { joinExactTokensInForKPTOut, joinInit } from 'utils/exchange/userData/joins';
import useVaultContract from 'hooks/contracts/useVaultContract';

export interface DepositIntoPoolProps {
	selectedPool: LitePoolFragment;
}

const DepositIntoPool: React.FC<DepositIntoPoolProps> = ({ selectedPool }) => {
	const { accountAddress, signer } = useWeb3();
	const vaultContract = useVaultContract();

	const [resetInputs, setResetInputs] = useState(false);

	const allowances = useMultiTokenAllowance(
		accountAddress,
		vaultContract.address,
		selectedPool?.tokens?.map((coin) => coin.address)
	);

	const balances = useMultiTokenBalances(
		accountAddress,
		selectedPool?.tokens?.map((coin) => coin.address)
	);

	const { data: poolTotalSupply = BigNumber.from(0) } = useTokenTotalSupply(selectedPool?.address);

	const { data: lpTokenBalance = BigNumber.from(0) } = useTokenBalance(accountAddress, selectedPool?.address);
	const { mutate: addLiqudity, status: deposited } = useJoinPool(signer);

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
													amount={MaxUint256}
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
