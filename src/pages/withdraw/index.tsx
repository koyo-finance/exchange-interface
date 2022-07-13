import { formatBalance, toBigNumber } from '@koyofinance/core-sdk';
import WithdrawCardToken from 'components/apps/amm/unified/withdraw/cards/WithdrawCardToken';
import WithdrawCardTop from 'components/apps/amm/unified/withdraw/cards/WithdrawCardTop';
import WithdrawCardWithdrawButton from 'components/apps/amm/unified/withdraw/cards/WithdrawCardWithdrawButton';
import WithdrawKPTCalculation from 'components/apps/amm/unified/withdraw/WithdrawKPTCalculation';
import GuideLink from 'components/GuideLink';
import PoolsModal from 'components/UI/Modals/PoolsModal';
import { ROOT_WITH_PROTOCOL } from 'constants/links';
import { Form, Formik } from 'formik';
import useTokenBalance from 'hooks/generic/useTokenBalance';
import useExchangeSubgraphURL from 'hooks/useExchangeSubgraphURL';
import { useWeb3 } from 'hooks/useWeb3';
import useExitPool from 'hooks/vault/useExitPool';
import { SwapLayout, SwapLayoutCard } from 'layouts/SwapLayout';
import { NextSeo } from 'next-seo';
import { LitePoolFragment, useGetPoolsQuery } from 'query/generated/graphql-codegen-generated';
import React, { useEffect, useState } from 'react';
import { HiSwitchHorizontal } from 'react-icons/hi';
import { VscListSelection } from 'react-icons/vsc';
import { ExtendedNextPage } from 'types/ExtendedNextPage';
import { assetHelperBoba } from 'utils/assets';
import { exitKPTInForExactTokensOut } from 'utils/exchange/userData/exits';

const WithdrawPage: ExtendedNextPage = () => {
	const { accountAddress, signer } = useWeb3();
	const exchangeSubgraphURL = useExchangeSubgraphURL();

	const { data: fetchedPools } = useGetPoolsQuery({ endpoint: exchangeSubgraphURL });
	const pools = fetchedPools?.allPools || [];

	const [selectedPool, setSelectedPool] = useState<LitePoolFragment | undefined>(undefined);
	const [poolsModalIsOpen, setPoolsModalIsOpen] = useState(false);

	const { data: lpTokenBalance = 0, refetch: refetchLPBalance } = useTokenBalance(accountAddress, selectedPool?.address);
	const { mutate: exitPool, status: exitStatus } = useExitPool(signer);

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
								<WithdrawCardTop />
								{!selectedPool && (
									<button
										className="text-md btn mt-2 w-full bg-lights-400 text-black hover:bg-lights-200 lg:text-xl"
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
																<WithdrawCardToken
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
																status={exitStatus}
															/>
														</span>
													</div>
													<WithdrawCardWithdrawButton />
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
