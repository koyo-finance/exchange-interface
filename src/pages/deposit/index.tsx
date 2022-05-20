import { BsFillGearFill } from 'react-icons/bs';
import { ChainId } from '@koyofinance/core-sdk';
import { AugmentedPool } from '@koyofinance/swap-sdk';
import { BigNumber } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';
import { Form, Formik } from 'formik';
import useAddLiquidity from 'hooks/contracts/StableSwap/useAddLiquidity';
import useMultiTokenAllowance from 'hooks/contracts/useMultiTokenAllowance';
import { SwapLayout, SwapLayoutCard } from 'layouts/SwapLayout';
import React, { useState } from 'react';
import { Case, Default, Switch } from 'react-if';
import { useSelector } from 'react-redux';
import { selectAllPoolsByChainId } from 'state/reducers/lists';
import { ExtendedNextPage } from 'types/ExtendedNextPage';
import { useAccount, useSigner } from 'wagmi';
import { HiSwitchHorizontal } from 'react-icons/hi';
import PoolsModal from 'components/UI/Modals/PoolsModal';
import DepositTokenCard from 'components/UI/Cards/DepositTokenCard';
import CoreCardConnectButton from 'components/UI/Cards/CoreCardConnectButton';
import useMultiTokenBalances from 'hooks/contracts/useMultiTokenBalances';

const DepositPage: ExtendedNextPage = () => {
	const pools = useSelector(selectAllPoolsByChainId(ChainId.BOBA));

	const { data: account } = useAccount();
	const { data: signer } = useSigner();

	const [selectedPool, setSelectedPool] = useState<AugmentedPool | undefined>(undefined);
	const [poolsModalIsOpen, setPoolsModalIsOpen] = useState(false);

	const allowances = useMultiTokenAllowance(
		account?.address,
		selectedPool?.addresses.swap,
		selectedPool?.coins?.map((coin) => coin.address)
	);

	const balances = useMultiTokenBalances(
		account?.address,
		selectedPool?.coins?.map((coin) => coin.address)
	);

	console.log(balances);

	const { mutate: addLiqudity } = useAddLiquidity(signer || undefined, selectedPool?.id || '');

	const openPoolsModalHandler = () => {
		setPoolsModalIsOpen(true);
	};

	const closePoolsModalHandler = () => {
		setPoolsModalIsOpen(false);
	};

	const setPoolHandler = (poolId: string) => {
		const [selectedPoolFilter] = pools.filter((pool) => {
			return pool.id.toLowerCase().includes(poolId.toLowerCase());
		});
		setSelectedPool(selectedPoolFilter);
	};

	return (
		<div className="flex h-screen w-full items-center justify-center">
			{/* <Combobox
								value={selectedPool?.name}
								onFocus={(name) => setSelectedPool(pools.find((pool) => pool.name === name))}
								onChange={(name) => setSelectedPool(pools.find((pool) => pool.name === name))}
							>
								<Combobox.Input onChange={(event) => setQuery(event.target.value)} className="rounded-xl p-2 px-4" />
								<Combobox.Options className="absolute z-10 mt-1 text-center">
									{filteredPools.map((pool) => (
										<Combobox.Option key={pool.id} value={pool.name}>
											{pool.name}
										</Combobox.Option>
									))}
								</Combobox.Options>
							</Combobox> */}
			{poolsModalIsOpen && <PoolsModal setPool={setPoolHandler} closeModal={closePoolsModalHandler} />}
			<SwapLayoutCard>
				<div className={`xl: w-[90vw] sm:w-[75vw] md:w-[50vw] lg:w-[40vw] xl:${selectedPool ? 'w-[50vw]' : 'w-[30vw]'}`}>
					<div className="m-auto rounded-xl">
						<div className="flex flex-col gap-2">
							<div className="flex w-full flex-row items-center justify-between text-lg font-semibold text-white">
								<div>Add Liquidity</div>
								<div>
									<BsFillGearFill />
								</div>
							</div>
							<div className=" rounded-xl bg-gray-500 bg-opacity-50 p-2 text-gray-300">
								When you add liquidity, you will receive pool tokens representing your position. These tokens automatically earn fees
								proportional to your share of the pool, and can be redeemed at any time.
							</div>
							{!selectedPool && (
								<button
									className="btn mt-2 w-full bg-lights-400 text-lg text-black hover:bg-lights-200"
									onClick={openPoolsModalHandler}
								>
									Choose liquidity pool&nbsp;<span className=" text-2xl">+</span>
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
							<>
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
												<div className="mt-4 grid grid-cols-2 gap-8">
													{selectedPool.coins.map((coin, i) => (
														<div key={coin.name}>
															<DepositTokenCard
																coin={coin}
																balance={balances[i].data}
																setInputAmount={props.handleChange}
															/>
														</div>
													))}
												</div>
												<div className="mt-4">
													<CoreCardConnectButton
														className="btn mt-2 w-full bg-lights-400 bg-opacity-100 text-black hover:bg-lights-200"
														invalidNetworkClassName="bg-red-600 text-white hover:bg-red-400"
													>
														<Switch>
															{selectedPool.coins.map((coin, i) => (
																<Case
																	condition={BigNumber.from(allowances[i].data || 0).lt(
																		parseUnits((props.values[coin.name] || 0).toString(), coin.decimals)
																	)}
																></Case>
															))}
															<Default>
																<button
																	type="submit"
																	className="btn border border-white bg-lights-300 font-sora text-sm lowercase text-white"
																>
																	confirm
																</button>
															</Default>
														</Switch>
													</CoreCardConnectButton>
												</div>
											</div>
										</Form>
									)}
								</Formik>
							</>
						)}
					</div>
				</div>
			</SwapLayoutCard>
		</div>
	);
};

DepositPage.Layout = SwapLayout('swap');
export default DepositPage;
