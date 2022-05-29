import { ChainId, formatBalance } from '@koyofinance/core-sdk';
import { AugmentedPool, Pool } from '@koyofinance/swap-sdk';
import CoreCardConnectButton from 'components/UI/Cards/CoreCardConnectButton';
import WithdrawLPBurnCalculation from 'components/UI/Cards/Withdraw/WithdrawLPBurnCalculation';
import WithdrawTokenCard from 'components/UI/Cards/Withdraw/WithdrawTokenCard';
import GuideLink from 'components/UI/GuideLink';
import PoolsModal from 'components/UI/Modals/PoolsModal';
import { ROOT_WITH_PROTOCOL } from 'constants/links';
import { parseUnits } from 'ethers/lib/utils';
import { Form, Formik } from 'formik';
import useGetVirtualPrice from 'hooks/contracts/StableSwap/useGetVirtualPrice';
import useRemoveLiquidityImbalance from 'hooks/contracts/StableSwap/useRemoveLiquidityImbalance';
import useTokenBalance from 'hooks/contracts/useTokenBalance';
import { SwapLayout, SwapLayoutCard } from 'layouts/SwapLayout';
import { NextSeo } from 'next-seo';
import React, { useEffect, useState } from 'react';
import { BsFillGearFill } from 'react-icons/bs';
import { HiSwitchHorizontal } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { selectAllPoolsByChainId } from 'state/reducers/lists';
import { ExtendedNextPage } from 'types/ExtendedNextPage';
import { useAccount, useSigner } from 'wagmi';

const WithdrawPage: ExtendedNextPage = () => {
	const pools = useSelector(selectAllPoolsByChainId(ChainId.BOBA));

	const { data: account } = useAccount();
	const { data: signer } = useSigner();

	const [selectedPool, setSelectedPool] = useState<AugmentedPool | undefined>(undefined);
	const [poolsModalIsOpen, setPoolsModalIsOpen] = useState(false);

	const { data: lpTokenBalance = 0, refetch: refetchLPBalance } = useTokenBalance(account?.address, selectedPool?.addresses.lpToken);
	const { data: virtualPrice = 0 } = useGetVirtualPrice(selectedPool?.id || '');
	const { mutate: removeLiquidityImbalance, status: withdrawStatus } = useRemoveLiquidityImbalance(signer || undefined, selectedPool?.id || '');

	useEffect(() => {
		if (withdrawStatus === 'success') refetchLPBalance();
	}, [withdrawStatus]);

	const openPoolsModalHandler = () => {
		setPoolsModalIsOpen(true);
	};

	const closePoolsModalHandler = () => {
		setPoolsModalIsOpen(false);
	};

	const setPoolHandler = (poolId: string) => {
		const [selectedPoolFilter] = pools.filter((pool: Pool) => {
			return pool.id.toLowerCase().includes(poolId.toLowerCase());
		});
		setSelectedPool(selectedPoolFilter);
	};

	return (
		<>
			<NextSeo title="Withdraw" canonical={`${ROOT_WITH_PROTOCOL}/withdraw`} />
			<div className=" relative flex min-h-screen w-full items-center justify-center bg-darks-500 px-8 pb-6 pt-24 lg:pt-20 ">
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
										initialValues={Object.fromEntries(selectedPool.coins.map((coin) => [coin.name, 0]))}
										onSubmit={(values) => {
											return removeLiquidityImbalance([
												// @ts-expect-error Huh
												Object.entries(values)
													.slice(0, selectedPool.coins.length)
													.map((coins) => coins[1] || 0)
													.map((amount, i) => parseUnits(amount.toString(), selectedPool.coins[i].decimals)),
												lpTokenBalance,
												{ gasLimit: 1_000_000 }
											]);
										}}
									>
										{(props) => (
											<Form>
												<div>
													<div className="mt-4 grid grid-cols-1 gap-8 md:grid-cols-2">
														{selectedPool.coins.map((coin) => (
															<div key={coin.id}>
																<WithdrawTokenCard
																	key={coin.id}
																	coin={coin}
																	status={withdrawStatus}
																	setInputAmount={props.handleChange}
																/>
															</div>
														))}
													</div>
													<div className="mt-4 w-full rounded-xl bg-darks-500 p-4">
														LP Tokens Burned:{' '}
														<span className="underline">
															<WithdrawLPBurnCalculation
																poolId={selectedPool.id}
																amounts={Object.values(props.values).map((amount) => amount || 0)}
																decimals={selectedPool.coins.map((coin) => coin.decimals)}
															/>
														</span>
													</div>
													<div className="mt-4">
														<CoreCardConnectButton
															className="btn mt-2 w-full bg-lights-400 bg-opacity-100 font-sora text-black hover:bg-lights-200"
															invalidNetworkClassName="bg-red-600 text-white hover:bg-red-400"
														>
															<button type="submit" className="h-full w-full">
																WITHDRAW
															</button>
														</CoreCardConnectButton>
													</div>
												</div>
											</Form>
										)}
									</Formik>
								</div>
							)}

							{selectedPool && (
								<div className="mt-4 w-full rounded-xl bg-gray-500 bg-opacity-50 p-4 text-gray-300">
									Virtual Price: <span className="underline">{formatBalance(virtualPrice)}</span>
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
