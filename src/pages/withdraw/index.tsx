import { formatBalance, toBigNumber } from '@koyofinance/core-sdk';
import SingleEntityConnectButton from 'components/CustomConnectButton/SingleEntityConnectButton';
import GuideLink from 'components/GuideLink';
import WithdrawKPTCalculation from 'components/UI/Cards/Withdraw/WithdrawKPTCalculation';
import WithdrawTokenCard from 'components/UI/Cards/Withdraw/WithdrawTokenCard';
import PoolsModal from 'components/UI/Modals/PoolsModal';
import { ROOT_WITH_PROTOCOL } from 'constants/links';
import { EXCHANGE_SUBGRAPH_URL } from 'constants/subgraphs';
import { Form, Formik } from 'formik';
import useExitPool from 'hooks/contracts/exchange/useExitPool';
import useTokenBalance from 'hooks/contracts/useTokenBalance';
import { SwapLayout, SwapLayoutCard } from 'layouts/SwapLayout';
import { NextSeo } from 'next-seo';
import { LitePoolFragment, useGetPoolsQuery } from 'query/generated/graphql-codegen-generated';
import React, { useEffect, useState } from 'react';
import { BsFillGearFill } from 'react-icons/bs';
import { HiSwitchHorizontal } from 'react-icons/hi';
import { ExtendedNextPage } from 'types/ExtendedNextPage';
import { assetHelperBoba } from 'utils/assets';
import { exitKPTInForExactTokensOut } from 'utils/exchange/userData/exits';
import { useAccount, useSigner } from 'wagmi';

const WithdrawPage: ExtendedNextPage = () => {
	const { data: fetchedPools } = useGetPoolsQuery({ endpoint: EXCHANGE_SUBGRAPH_URL });
	const pools = fetchedPools?.allPools || [];

	const { data: account } = useAccount();
	const accountAddress = account?.address || '';
	const { data: signer } = useSigner();

	const [selectedPool, setSelectedPool] = useState<LitePoolFragment | undefined>(undefined);
	const [poolsModalIsOpen, setPoolsModalIsOpen] = useState(false);

	const { data: lpTokenBalance = 0, refetch: refetchLPBalance } = useTokenBalance(account?.address, selectedPool?.address);
	const { mutate: exitPool, status: exitStatus } = useExitPool(signer || undefined);

	useEffect(() => {
		if (exitStatus === 'success') refetchLPBalance();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [exitStatus]);

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
				title="Withdraw"
				canonical={`${ROOT_WITH_PROTOCOL}/withdraw`}
				description="Withdraw your assets from pools, where you have deposited your tokens."
			/>
			<div className=" relative flex min-h-screen w-full items-center justify-center bg-darks-500 px-8 pb-8 pt-24 lg:pt-20 ">
				{poolsModalIsOpen && <PoolsModal setPool={setPoolHandler} closeModal={closePoolsModalHandler} />}
				<SwapLayoutCard>
					<div
						className={
							selectedPool
								? 'w-[85vw] sm:w-[60vw] md:w-[80vw] lg:w-[70vw] xl:w-[55vw]'
								: 'w-[85vw] sm:w-[60vw] md:w-[50vw] lg:w-[35vw] xl:w-[30vw]'
						}
					>
						<div className="m-auto rounded-xl">
							<div className="flex flex-col gap-2">
								<div className="flex w-full flex-row items-center justify-between text-lg font-semibold text-white">
									<div>Remove Liquidity</div>
									<div>
										<BsFillGearFill />
									</div>
								</div>
								{!selectedPool && (
									<button
										className="text-md btn mt-2 w-full bg-lights-400 text-black hover:bg-lights-200 lg:text-xl"
										onClick={openPoolsModalHandler}
									>
										Choose liquidity pool&nbsp;<span className=" text-md lg:text-2xl">+</span>
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
								<div className="mt-4 w-full rounded-xl bg-darks-500 p-4">
									LP Token Balance: <span className="underline">{formatBalance(lpTokenBalance)}</span>
								</div>
							)}
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

											return exitPool([
												selectedPool.id,
												accountAddress,
												accountAddress,
												{
													assets: tokens,
													minAmountsOut: amounts,
													userData: exitKPTInForExactTokensOut(amounts, lpTokenBalance),
													toInternalBalance: false
												}
											]);
										}}
									>
										{(props) => (
											<Form>
												<div>
													<div className="mt-4 grid grid-cols-1 gap-8 md:grid-cols-2">
														{selectedPool.tokens?.map((coin) => (
															<div key={coin.id}>
																<WithdrawTokenCard
																	key={coin.id}
																	coin={coin}
																	status={exitStatus}
																	setInputAmount={props.setFieldValue}
																/>
															</div>
														))}
													</div>
													<div className="mt-4 w-full rounded-xl bg-darks-500 p-4">
														LP Tokens Burned:{' '}
														<span className="underline">
															<WithdrawKPTCalculation
																pool={selectedPool}
																account={accountAddress}
																values={props.values}
															/>
														</span>
													</div>
													<div className="mt-4">
														<SingleEntityConnectButton
															className="btn mt-2 w-full bg-lights-400 bg-opacity-100 font-sora text-black hover:bg-lights-200"
															invalidNetworkClassName="bg-red-600 text-white hover:bg-red-400"
														>
															<button type="submit" className="h-full w-full">
																WITHDRAW
															</button>
														</SingleEntityConnectButton>
													</div>
												</div>
											</Form>
										)}
									</Formik>
								</div>
							)}
						</div>
					</div>
				</SwapLayoutCard>
				<GuideLink type="Withdraw" text="Trouble withdrawing?" link="https://docs.koyo.finance/protocol/guide/exchange/withdraw" />
			</div>
		</>
	);
};

WithdrawPage.Layout = SwapLayout('withdraw');
export default WithdrawPage;
