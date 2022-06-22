import GuideLink from 'components/GuideLink';
import PoolsModal from 'components/UI/Modals/PoolsModal';
import { ROOT_WITH_PROTOCOL } from 'constants/links';
import { EXCHANGE_SUBGRAPH_URL } from 'constants/subgraphs';
import { SwapLayout, SwapLayoutCard } from 'layouts/SwapLayout';
import { NextSeo } from 'next-seo';
import { LitePoolFragment, useGetPoolsQuery } from 'query/generated/graphql-codegen-generated';
import React, { useState } from 'react';
import { BsArrow90DegLeft, BsPlus } from 'react-icons/bs';
import { HiSwitchHorizontal } from 'react-icons/hi';
import { VscListSelection } from 'react-icons/vsc';
import { ExtendedNextPage } from 'types/ExtendedNextPage';
import DepositIntoPool from 'components/apps/amm/unified/deposit/DepositIntoPool';
import PoolCreationIndicatior from 'components/UI/Indicators/PoolCreationIndicatior';
import CreatePool from 'components/apps/amm/unified/deposit/CreatePool';

const DepositPage: ExtendedNextPage = () => {
	const { data: fetchedPools } = useGetPoolsQuery({ endpoint: EXCHANGE_SUBGRAPH_URL });
	const pools = fetchedPools?.allPools || [];

	const [selectedPool, setSelectedPool] = useState<LitePoolFragment | undefined>(undefined);
	const [poolsModalIsOpen, setPoolsModalIsOpen] = useState(false);
	const [poolCreationActive, setPoolCreationActive] = useState(false);
	const [poolCreationStep, setPoolCreationStep] = useState<number>(1);

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
			<div className=" relative flex min-h-screen w-full flex-row-reverse items-center justify-center gap-10 bg-darks-500 px-8 pb-8 pt-24 md:px-0 lg:pt-20 ">
				{poolsModalIsOpen && <PoolsModal setPool={setPoolHandler} closeModal={closePoolsModalHandler} />}
				{poolCreationActive && <PoolCreationIndicatior step={poolCreationStep} />}
				<SwapLayoutCard className="w-fit">
					<div
						className={
							selectedPool
								? 'w-[85vw] sm:w-[60vw] md:w-[80vw] lg:w-[70vw] xl:w-[55vw]'
								: 'w-[85vw] sm:w-[60vw] md:w-[50vw] lg:w-[35vw] xl:w-[30vw]'
						}
					>
						<div className="mx-auto rounded-xl">
							<div className="flex flex-col gap-2">
								<div className="flex w-auto cursor-pointer flex-row items-center justify-between text-lg font-semibold text-white">
									<div>{poolCreationActive ? 'Create Liquidity Pool' : 'Add Liquidity'}</div>
									{(poolCreationActive || selectedPool) && (
										<div
											className="transform-gpuflex-row flex items-center gap-2 duration-100 hover:text-lights-400"
											onClick={() => {
												setPoolCreationActive(false);
												setSelectedPool(undefined);
											}}
										>
											<div>Go Back</div>
											<div className=" text-xl">
												<BsArrow90DegLeft />
											</div>
										</div>
									)}
								</div>

								{!selectedPool && !poolCreationActive && (
									<>
										<button
											className="text-md btn mt-2 w-full bg-lights-400 text-black hover:bg-lights-200 lg:text-lg"
											onClick={openPoolsModalHandler}
										>
											Choose liquidity pool&nbsp;
											<span className=" text-md lg:text-2xl">
												<VscListSelection />
											</span>
										</button>
										<button
											className="text-md btn mt-2 w-full bg-lights-400 text-black hover:bg-lights-200 lg:text-lg"
											onClick={() => {
												setPoolCreationActive(true);
												setPoolCreationStep(1);
											}}
										>
											Create liquidity pool&nbsp;
											<span className=" text-md lg:text-2xl">
												<BsPlus />
											</span>
										</button>
									</>
								)}
								{selectedPool && (
									<>
										<div className="rounded-xl bg-gray-500 bg-opacity-50 p-2 text-gray-300">
											When you add liquidity, you will receive pool tokens representing your position. These tokens
											automatically earn fees proportional to your share of the pool, and can be redeemed at any time.
										</div>
										<div
											className="mt-2 flex w-full cursor-pointer flex-row items-center justify-center gap-2 text-center text-lg text-lights-400 hover:text-lights-200"
											onClick={openPoolsModalHandler}
										>
											<div>Switch liquidity Pool</div>
											<div className=" text-2xl">
												<HiSwitchHorizontal />
											</div>
										</div>
									</>
								)}
							</div>
							{selectedPool && <DepositIntoPool selectedPool={selectedPool} />}
							{poolCreationActive && <CreatePool step={poolCreationStep} setStep={setPoolCreationStep} />}
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
