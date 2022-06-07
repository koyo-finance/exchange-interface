import { ChainId, formatBalance, fromBigNumber } from '@koyofinance/core-sdk';
import { AugmentedPool, Pool } from '@koyofinance/swap-sdk';
import CoreCardConnectButton from 'components/UI/Cards/CoreCardConnectButton';
import DepositLPGetCalculation from 'components/UI/Cards/Deposit/DepositLPGetCalculation';
import DepositPoolAPYCard from 'components/UI/Cards/Deposit/DepositPoolAPYCard';
import DepositTokenCard from 'components/UI/Cards/Deposit/DepositTokenCard';
import FormApproveAsset from 'components/UI/Cards/FormApproveAsset';
import GuideLink from 'components/UI/GuideLink';
import PoolsModal from 'components/UI/Modals/PoolsModal';
import { ROOT_WITH_PROTOCOL } from 'constants/links';
import { BigNumber, BigNumberish } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';
import { Form, Formik } from 'formik';
import useAddLiquidity from 'hooks/contracts/StableSwap/useAddLiquidity';
import useMultiTokenAllowance from 'hooks/contracts/useMultiTokenAllowance';
import useMultiTokenBalances from 'hooks/contracts/useMultiTokenBalances';
import useTokenAllowance from 'hooks/contracts/useTokenAllowance';
import useTokenBalance from 'hooks/contracts/useTokenBalance';
import { SwapLayout, SwapLayoutCard } from 'layouts/SwapLayout';
import { NextSeo } from 'next-seo';
import React, { useEffect, useState } from 'react';
import { BsFillGearFill } from 'react-icons/bs';
import { HiSwitchHorizontal } from 'react-icons/hi';
import { Case, Default, Switch } from 'react-if';
import { useSelector } from 'react-redux';
import { selectAllPoolsByChainId } from 'state/reducers/lists';
import { ExtendedNextPage } from 'types/ExtendedNextPage';
import { useAccount, useSigner } from 'wagmi';

const DepositPage: ExtendedNextPage = () => {
	const pools = useSelector(selectAllPoolsByChainId(ChainId.BOBA));

	const { data: account } = useAccount();
	const { data: signer } = useSigner();

	const [selectedPool, setSelectedPool] = useState<AugmentedPool | undefined>(undefined);
	const [poolsModalIsOpen, setPoolsModalIsOpen] = useState(false);
	const [resetInputs, setResetInputs] = useState(false);

	const allowances = useMultiTokenAllowance(
		account?.address,
		selectedPool?.addresses.swap,
		selectedPool?.coins?.map((coin) => coin.address)
	);

	const { data: LPtokenAllowance } = useTokenAllowance(
		account?.address,
		'0x24f47A11AEE5d1bF96C18dDA7bB0c0Ef248A8e71',
		'0xDAb3Fc342A242AdD09504bea790f9b026Aa1e709'
	);

	const balances = useMultiTokenBalances(
		account?.address,
		selectedPool?.coins?.map((coin) => coin.address)
	);

	const { mutate: addLiqudity, status: deposited } = useAddLiquidity(signer || undefined, selectedPool?.id || '');

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

	const setPoolHandler = (poolId: string) => {
		const [selectedPoolFilter] = pools.filter((pool: Pool) => {
			return pool.id.toLowerCase().includes(poolId.toLowerCase());
		});
		setSelectedPool(selectedPoolFilter);
	};

	const { data: lpTokenBalance = 0 } = useTokenBalance(account?.address, selectedPool?.addresses.lpToken);

	return (
		<>
			<NextSeo
				title="Deposit"
				canonical={`${ROOT_WITH_PROTOCOL}/swap`}
				description="Deposit your assets into the desired pools and get LP tokens that represent your position in the pools, to earn fees."
			/>
			<div className=" relative flex min-h-screen w-full items-center justify-center bg-darks-500 px-8 pb-8 pt-24 md:px-0 md:pb-0 lg:pt-20">
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
							<div>LP token balance:{formatBalance(lpTokenBalance)}</div>

							{selectedPool && (
								<div className={selectedPool ? 'block' : 'hidden'}>
									<Formik
										initialValues={Object.fromEntries(selectedPool.coins.map((coin) => [coin.name, 0]))}
										onSubmit={(values) => {
											return addLiqudity([
												// @ts-expect-error Huh
												Object.entries(values)
													.slice(0, selectedPool.coins.length)
													.map((coins) => coins[1] || 0)
													.map((amount, i) => parseUnits(amount.toString(), selectedPool.coins[i].decimals)),
												0,
												{ gasLimit: 600_000 }
											]);
										}}
									>
										{(props) => (
											<Form>
												<div>
													<div className="mt-4 grid grid-cols-1 gap-8 md:grid-cols-2">
														{selectedPool.coins.map((coin, i) => (
															<div key={coin.id}>
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
													<div className="mt-4 rounded-xl bg-darks-500 p-4">
														LP tokens recieved:{' '}
														<span className="underline">
															<DepositLPGetCalculation
																poolId={selectedPool.id}
																amounts={Object.values(props.values).map((amount) => amount || 0)}
																decimals={selectedPool.coins.map((coin) => coin.decimals)}
															/>
														</span>
													</div>
													<div className="mt-2">
														<CoreCardConnectButton
															className="w-full"
															invalidNetworkClassName="bg-red-600 text-white hover:bg-red-400"
														>
															<div className="flex flex-row gap-1">
																<div className="btn mt-2 w-1/2 bg-lights-400 bg-opacity-100 font-sora text-black hover:bg-lights-200">
																	<Switch>
																		{selectedPool.coins.map((coin, i) => (
																			<Case
																				condition={BigNumber.from(allowances[i].data || 0).lt(
																					parseUnits(
																						(props.values[coin.name] || 0).toString(),
																						coin.decimals
																					)
																				)}
																				key={coin.id}
																			>
																				<FormApproveAsset
																					asset={coin.address}
																					spender={selectedPool.addresses.swap}
																					amount={100_000}
																					decimals={coin.decimals}
																					className="h-full w-full"
																				>
																					APPROVE -{' '}
																					<span className="italic">{coin.name.toUpperCase()}</span>
																				</FormApproveAsset>
																			</Case>
																		))}

																		<Default>
																			<button type="submit" className="h-full w-full">
																				DEPOSIT
																			</button>
																		</Default>
																	</Switch>
																</div>
																<div className="btn mt-2 w-1/2 bg-lights-400 bg-opacity-100 font-sora text-black hover:bg-lights-200">
																	<Switch>
																		<Case
																			condition={fromBigNumber(LPtokenAllowance as BigNumberish) > 0}
																			key="LPtokens"
																		>
																			<FormApproveAsset
																				asset={'0xDAb3Fc342A242AdD09504bea790f9b026Aa1e709'}
																				spender={'0x24f47A11AEE5d1bF96C18dDA7bB0c0Ef248A8e71'}
																				amount={100_000}
																				decimals={18}
																				className="h-full w-full"
																			>
																				APPROVE - <span className="italic">4koyo LP</span>
																			</FormApproveAsset>
																		</Case>
																		<Default>
																			<button className="h-full w-full">STAKE LP TOKENS</button>
																		</Default>
																	</Switch>
																</div>
															</div>
														</CoreCardConnectButton>
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
