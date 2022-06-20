import { formatBalance, toBigNumber } from '@koyofinance/core-sdk';
import SingleEntityConnectButton from 'components/CustomConnectButton/SingleEntityConnectButton';
import GuideLink from 'components/GuideLink';
import DepositPoolAPYCard from 'components/UI/Cards/Deposit/DepositPoolAPYCard';
import DepositTokenCard from 'components/UI/Cards/Deposit/DepositTokenCard';
import DepostKPTCalculation from 'components/UI/Cards/Deposit/DepostKPTCalculation';
import FormApproveAsset from 'components/UI/Cards/FormApproveAsset';
import PoolsModal from 'components/UI/Modals/PoolsModal';
import { ROOT_WITH_PROTOCOL } from 'constants/links';
import { EXCHANGE_SUBGRAPH_URL } from 'constants/subgraphs';
import { vaultContract } from 'core/contracts';
import { BigNumber } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';
import { Form, Formik } from 'formik';
import useJoinPool from 'hooks/contracts/exchange/useJoinPool';
import useMultiTokenAllowance from 'hooks/contracts/useMultiTokenAllowance';
import useMultiTokenBalances from 'hooks/contracts/useMultiTokenBalances';
import useTokenBalance from 'hooks/contracts/useTokenBalance';
import useTokenTotalSupply from 'hooks/contracts/useTokenTotalSupply';
import { SwapLayout, SwapLayoutCard } from 'layouts/SwapLayout';
import { NextSeo } from 'next-seo';
import { LitePoolFragment, TokenFragment, useGetPoolsQuery } from 'query/generated/graphql-codegen-generated';
import React, { useEffect, useState } from 'react';
import { BsFillGearFill } from 'react-icons/bs';
import { HiSwitchHorizontal } from 'react-icons/hi';
import { VscListSelection } from 'react-icons/vsc';
import { Case, Default, Switch } from 'react-if';
import { ExtendedNextPage } from 'types/ExtendedNextPage';
import { assetHelperBoba } from 'utils/assets';
import { joinExactTokensInForKPTOut, joinInit } from 'utils/exchange/userData/joins';
import { useAccount, useSigner } from 'wagmi';

const DepositPage: ExtendedNextPage = () => {
	const { data: fetchedPools } = useGetPoolsQuery({ endpoint: EXCHANGE_SUBGRAPH_URL });
	const pools = fetchedPools?.allPools || [];

	const { data: account } = useAccount();
	const accountAddress = account?.address || '';
	const { data: signer } = useSigner();

	const [selectedPool, setSelectedPool] = useState<LitePoolFragment | undefined>(undefined);
	const [poolsModalIsOpen, setPoolsModalIsOpen] = useState(false);
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

	const openPoolsModalHandler = () => {
		setPoolsModalIsOpen(true);
	};

	const closePoolsModalHandler = () => {
		setPoolsModalIsOpen(false);
	};

	const setPoolHandler = (poolAddress: string) => {
		const [selectedPoolFilter] = pools.filter((pool: LitePoolFragment) => {
			return pool.address.toLowerCase().includes(poolAddress.toLowerCase());
		});
		setSelectedPool(selectedPoolFilter);
	};

	return (
		<>
			<NextSeo
				title="Deposit"
				canonical={`${ROOT_WITH_PROTOCOL}/deposit`}
				description="Deposit your assets into the desired pools and get LP tokens that represent your position in the pools, to earn fees."
			/>
			<div className=" relative flex min-h-screen w-full items-center justify-center bg-darks-500 px-8 pb-8 pt-24 md:px-0 lg:pt-20 ">
				{poolsModalIsOpen && <PoolsModal setPool={setPoolHandler} closeModal={closePoolsModalHandler} />}
				<SwapLayoutCard>
					<div
						className={
							selectedPool
								? 'w-[85vw] sm:w-[60vw] md:w-[80vw] lg:w-[70vw] xl:w-[55vw]'
								: 'w-[85vw] sm:w-[60vw] md:w-[50vw] lg:w-[35vw] xl:w-[30vw]'
						}
					>
						<div className="mx-auto rounded-xl">
							<div className="flex flex-col gap-2">
								<div className="flex w-full flex-row items-center justify-between text-lg font-semibold text-white">
									<div>Add Liquidity</div>
									<div>
										<BsFillGearFill />
									</div>
								</div>
								<div className="rounded-xl bg-gray-500 bg-opacity-50 p-2 text-gray-300">
									When you add liquidity, you will receive pool tokens representing your position. These tokens automatically earn
									fees proportional to your share of the pool, and can be redeemed at any time.
								</div>
								{!selectedPool && (
									<button
										className="text-md btn mt-2 w-full bg-lights-400 text-black hover:bg-lights-200 lg:text-lg"
										onClick={openPoolsModalHandler}
									>
										Choose liquidity pool&nbsp;
										<span className=" text-md lg:text-2xl">
											<VscListSelection />
										</span>
									</button>
								)}
								{selectedPool && (
									<div
										className="mt-2 flex w-full cursor-pointer flex-row items-center justify-center gap-2 text-center text-lg text-lights-400 hover:text-lights-200"
										onClick={openPoolsModalHandler}
									>
										<div>Switch liquidity Pool</div>
										<div className=" text-2xl">
											<HiSwitchHorizontal />
										</div>
									</div>
								)}
							</div>

							{selectedPool && (
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
													userData: BigNumber.from(poolTotalSupply).gt(0)
														? joinExactTokensInForKPTOut(amounts, toBigNumber(0))
														: joinInit(amounts),
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
																<DepositTokenCard
																	key={coin.id}
																	coin={coin}
																	balance={balances[i].data || 0}
																	resetValues={resetInputs}
																	setInputAmount={props.setFieldValue}
																/>
															</div>
														))}
													</div>
													<div className="mt-4 flex flex-row justify-between rounded-xl bg-darks-500 p-4">
														<div>
															LP tokens recieved:{' '}
															<span className="underline">
																<DepostKPTCalculation
																	pool={selectedPool}
																	values={props.values}
																	account={accountAddress}
																/>
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
							)}

							{selectedPool && (
								<DepositPoolAPYCard
									poolId={selectedPool.id}
									className="mt-4 w-full rounded-xl bg-gray-500 bg-opacity-50 p-4 text-gray-300"
								/>
							)}
						</div>
					</div>
				</SwapLayoutCard>
				<GuideLink type="Deposit" text="Trouble depositing?" link="https://docs.koyo.finance/protocol/guide/exchange/deposit" />
			</div>
		</>
	);
};

DepositPage.Layout = SwapLayout('deposit');
export default DepositPage;
