import { formatBalance, fromBigNumber } from '@koyofinance/core-sdk';
import BalanceCard from 'components/UI/Cards/Gauges/BalanceCard';
import { ROOT_WITH_PROTOCOL } from 'constants/links';
import { votingEscrowContract } from 'core/contracts';
import useTokenBalance from 'hooks/contracts/useTokenBalance';
import { SwapLayout } from 'layouts/SwapLayout';
import { NextSeo } from 'next-seo';
import React, { useState } from 'react';
import { ExtendedNextPage } from 'types/ExtendedNextPage';
import { useAccount, useSigner } from 'wagmi';
import useCheckClaimableTokens from 'hooks/contracts/KYO/gauges/useMultiCheckClaimableTokens';
import { useVoteForGaugeWeights } from 'hooks/contracts/KYO/gauges/useVoteForGaugeWeights';
import { useDistributeGaugeEmissions } from 'hooks/contracts/KYO/gauges/useDistributeGaugeEmissions';
import CoreCardConnectButton from 'components/UI/Cards/CoreCardConnectButton';

const GaugesPage: ExtendedNextPage = () => {
	const FourKoyoGaugeAddress = '0x24f47A11AEE5d1bF96C18dDA7bB0c0Ef248A8e71';

	// const [selectedGauge, setSelectedGauge] = useState(false);
	// const [gaugeListModalIsOpen, setGaugeListModalIsOpen] = useState(false);
	const [voteAmount, setVoteAmount] = useState(0);
	const [calculatedveKYOAmount, setCalculatedveKYOAmount] = useState(0);
	const [error, setError] = useState('');

	const { data: signer } = useSigner();
	const { data: account } = useAccount();
	const accountAddress = account?.address;

	const { data: veKYOBalance = 0 } = useTokenBalance(accountAddress, votingEscrowContract.address);
	const claimableGauges = useCheckClaimableTokens(accountAddress, [FourKoyoGaugeAddress]);

	const { mutate: submitVote } = useVoteForGaugeWeights(signer || undefined);
	const { mutate: claimEmissions } = useDistributeGaugeEmissions(signer || undefined);

	const changeAmountHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (Number(e.target.value) > 100) {
			setError('Cannot set percentage higher than 100%');
			setVoteAmount(100);
			setCalculatedveKYOAmount(fromBigNumber(veKYOBalance));
			return;
		}
		setVoteAmount(Number(e.target.value));
		const veKYOAmount = (fromBigNumber(veKYOBalance) / 100) * Number(e.target.value);
		setCalculatedveKYOAmount(veKYOAmount);
		setError('');
	};

	const submitVoteHandler = () => {
		const transformedVoteAmount = voteAmount * 100;
		submitVote([FourKoyoGaugeAddress, transformedVoteAmount, { gasLimit: 700_000 }]);
	};

	return (
		<>
			<NextSeo
				title="Gauges"
				canonical={`${ROOT_WITH_PROTOCOL}/kyo/gauges`}
				description="Deposit your assets into the desired pools and get LP tokens that represent your position in the pools, to earn fees."
			/>
			<div className=" flex min-h-screen w-full flex-col items-center gap-[5vh] bg-darks-500 px-8 pb-8 pt-24 md:px-0 lg:pt-20 ">
				<div className="mt-8 flex w-full flex-col items-center justify-center gap-8 text-center text-white">
					<h1 className=" text-4xl font-bold md:text-5xl">Gauge voting</h1>
					<div className="w-full font-normal md:w-3/4 md:text-xl md:font-semibold lg:w-1/2">
						You can vote for gauge weight with your veKYO (locked KYO), to delegate it to our pools.
					</div>
				</div>
				<div className=" flex flex-row flex-wrap justify-center gap-[10vw]">
					<BalanceCard
						text="veKYO VOTING POWER"
						value={formatBalance(veKYOBalance, {
							maximumFractionDigits: 3
						})}
					/>
					<BalanceCard text="VOTING POWER USED" value="?" />
				</div>
				<div className="mx-auto flex  w-1/2 flex-col gap-4 rounded-xl border-2 border-lights-400 bg-black bg-opacity-50 p-4">
					<div>
						{/* Table */}
						<div className=" flex w-full flex-col rounded-xl border-2 border-darks-200">
							{/* Header */}
							<div className="flex w-full flex-row justify-between p-2 text-center font-semibold text-white">
								<div className="w-1/4 text-left">Your gauge</div>
								<div className="w-1/4 ">Voting power</div>
								<div className="w-1/4">Claim</div>
								<div className="w-1/4">Reset</div>
							</div>
							{claimableGauges.map((gauge) => (
								<div className="flex w-full flex-row items-center justify-between border-t-2 border-darks-200 p-2 text-center text-white">
									<div className="w-1/4 truncate text-left">4koyo (DAI + USDC + USDT+ FRAX)</div>
									<div className="w-1/4 text-xl">?</div>
									<div className="w-1/4 px-1">
										<button
											className="btn w-full bg-lights-400 bg-opacity-100 text-black hover:bg-lights-200"
											onClick={() => claimEmissions([FourKoyoGaugeAddress, { gasLimit: 700_000 }])}
										>
											{fromBigNumber(gauge.data || 0)}
										</button>
									</div>
									<div className="w-1/4 px-1">
										<button
											className="btn w-full border-2  border-red-600 bg-transparent text-red-600 hover:bg-red-600 hover:text-white"
											onClick={() => {}}
										>
											RESET
										</button>
									</div>
								</div>
							))}
						</div>
					</div>
					{/* {!selectedGauge && <button className="btn disabled w-full bg-gray-600 bg-opacity-100 text-black">SELECT GAUGE +</button>}
					{selectedGauge && (
						<div className="mt-2 flex w-full cursor-pointer flex-row items-center justify-center gap-2 text-center text-lg text-lights-400 hover:text-lights-200">
							<div>Switch liquidity Pool</div>
							<div className=" text-2xl">
								<HiSwitchHorizontal />
							</div>
						</div>
					)} */}
					{error !== '' && <div className="w-full text-xl text-red-600">{error}</div>}
					<div className="flex w-full flex-row flex-wrap items-center justify-between gap-2 text-xl text-white">
						<div>
							<label htmlFor="power">Select voting power (%):</label>
						</div>
						<div className="flex w-full flex-row justify-between border-b-2 border-darks-300 ">
							<input
								type="number"
								className="mr-1 w-full bg-transparent outline-none"
								max={100}
								value={voteAmount ? voteAmount : ''}
								onChange={changeAmountHandler}
								placeholder="0 %"
							/>
							<button
								className=" mb-2 transform-gpu cursor-pointer rounded-xl border-2 border-lights-400 p-1 text-base text-lights-400 duration-100 hover:bg-lights-400 hover:text-black"
								onClick={() => {
									setVoteAmount(100);
									setCalculatedveKYOAmount(fromBigNumber(veKYOBalance));
								}}
							>
								MAX
							</button>
						</div>
					</div>
					<div className="w-full rounded-xl bg-darks-500 p-2">
						{calculatedveKYOAmount.toLocaleString(navigator.language, {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2
						})}{' '}
						({voteAmount}%) of your voting power will be given to the selected gauge.
					</div>
					<CoreCardConnectButton
						className="btn bg-lights-400 px-0 text-black hover:bg-lights-200"
						invalidNetworkClassName="bg-red-600 text-white hover:bg-red-400"
					>
						<button className="z-20 h-full w-full" onClick={submitVoteHandler}>
							SUBMIT VOTE
						</button>
					</CoreCardConnectButton>
				</div>
			</div>
		</>
	);
};

GaugesPage.Layout = SwapLayout('gauge-vote');
export default GaugesPage;
