import { calculatePercentage, formatBalance } from '@koyofinance/core-sdk';
import ForceWithdrawModal from 'components/apps/dao/locker/modals/LockerForceWithdrawModal';
import GuideLink from 'components/GuideLink';
import TitledDisplayBox from 'components/TitledDisplayBox';
import LockerForm from 'components/UI/Forms/LockerForm';
import { ROOT_WITH_PROTOCOL } from 'constants/links';
import { kyoContract, votingEscrowContract } from 'core/contracts';
import useTokenBalance from 'hooks/generic/useTokenBalance';
import useTokenTotalSupply from 'hooks/generic/useTokenTotalSupply';
import { useWeb3 } from 'hooks/useWeb3';
import { SwapLayout } from 'layouts/SwapLayout';
import { NextSeo } from 'next-seo';
import React, { useState } from 'react';
import { ExtendedNextPage } from 'types/ExtendedNextPage';

const LockIndexPage: ExtendedNextPage = () => {
	const { accountAddress } = useWeb3();

	const [withdrawModalIsOpen, setWithdrawModalIsOpen] = useState(false);

	const { data: kyoBalance = 0 } = useTokenBalance(accountAddress, kyoContract.address);
	const { data: kyoEscrowed = 0 } = useTokenBalance(votingEscrowContract.address, kyoContract.address);
	const { data: veKyoBalance = 0 } = useTokenBalance(accountAddress, votingEscrowContract.address);
	const { data: kyoTotalSupply = 0 } = useTokenTotalSupply(kyoContract.address);
	const { data: veKyoTotalSupply = 0 } = useTokenTotalSupply(votingEscrowContract.address);

	const forceWithdrawModalOpenHandler = () => {
		setWithdrawModalIsOpen(true);
	};

	const forceWithdrawModalCloseHandler = () => {
		setWithdrawModalIsOpen(false);
	};

	return (
		<>
			<NextSeo
				title="Lock"
				canonical={`${ROOT_WITH_PROTOCOL}/lock`}
				description="Lock your KYO in the Kōyō Finance locker to receive emissions and a share of pool fees alongside participating in the governance votes."
			/>
			<div className="relative flex min-h-screen w-full items-center justify-center bg-darks-500 pt-10 pb-16 text-white lg:pb-24 lg:pt-16">
				{withdrawModalIsOpen && <ForceWithdrawModal closeForceWithdrawModal={forceWithdrawModalCloseHandler} />}
				<div className="flex w-full flex-col items-center gap-[7.5vh] px-4 pt-20 md:px-6 xl:px-32">
					<div className="flex w-auto flex-col items-center gap-10 text-center">
						<h1 className="text-4xl font-bold md:text-5xl">Kōyō locking</h1>
						<p className="w-full text-xl md:w-3/4 lg:w-1/2">
							Lock your <code>KYO</code> in the Kōyō Finance locker to receive emissions and a share of pool fees alongside
							participating in the governance votes.
						</p>
					</div>
					<div className="flex w-full flex-wrap items-center justify-center gap-[5vw]">
						<TitledDisplayBox text="My KYO Balance" value={formatBalance(kyoBalance)} />
						<TitledDisplayBox
							text="Share of veKYO power"
							value={`${calculatePercentage(veKyoTotalSupply, veKyoBalance).toLocaleString('fullwide', {
								maximumFractionDigits: 4
							})} %`}
						/>
						<TitledDisplayBox text="My veKYO balance" value={formatBalance(veKyoBalance)} />
					</div>
					<div className="w-full rounded-lg border-2 border-lights-400 bg-black bg-opacity-40 md:mt-6 lg:w-7/12">
						<div className="flex flex-col gap-4 px-4 py-4 lg:gap-6 lg:py-8 lg:px-12">
							<h2 className="text-2xl font-bold lg:text-3xl">Lock KYO tokens</h2>
							<LockerForm openForceWithdrawModal={forceWithdrawModalOpenHandler} />
						</div>
					</div>
					<div className="flex flex-col items-center gap-10 text-center">
						<h2 className="text-3xl font-bold">Total voting power</h2>
						{/* <p className="text-xl">General stats about the veKYO system</p> */}
						<div className="">
							<div className="flex w-full flex-row flex-wrap items-center justify-evenly gap-x-[5vw] gap-y-6">
								<TitledDisplayBox text="Total KYO vote-locked" value={formatBalance(kyoEscrowed)} />
								<TitledDisplayBox
									text="Percentage of KYO locked"
									value={`${calculatePercentage(kyoTotalSupply, kyoEscrowed).toLocaleString('fullwide', {
										maximumFractionDigits: 4
									})} %`}
								/>
								<TitledDisplayBox text="Total veKYO" value={formatBalance(veKyoTotalSupply, { maximumFractionDigits: 3 })} />
							</div>
						</div>
					</div>
				</div>
				<GuideLink type="Lock" text="Trouble locking?" link="https://docs.koyo.finance/protocol/guide/Locker/Lock" />
			</div>
		</>
	);
};

LockIndexPage.Layout = SwapLayout('lock');
export default LockIndexPage;
