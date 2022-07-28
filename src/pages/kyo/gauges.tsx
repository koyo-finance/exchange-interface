import { ChainId, formatBalance, fromBigNumber } from '@koyofinance/core-sdk';
import GaugePowerPercentageUsed from 'components/apps/dao/voting/GaugePowerPercentageUsed';
import GaugeModal from 'components/apps/dao/voting/modals/GaugeModal';
import SingleEntityConnectButton from 'components/CustomConnectButton/SingleEntityConnectButton';
import GuideLink from 'components/GuideLink';
import TitledDisplayBox from 'components/TitledDisplayBox';
import { ANALYTICS_LINK, ROOT_WITH_PROTOCOL } from 'constants/links';
import { GAUGES_SUBGRAPH_URL } from 'constants/subgraphs';
import { votingEscrowContract } from 'core/contracts';
import { BigNumber } from 'ethers';
import useTokenBalance from 'hooks/generic/useTokenBalance';
import { useDistributeGaugeEmissions } from 'hooks/KYO/gauges/useDistributeGaugeEmissions';
import useGetVoteUserPower from 'hooks/KYO/gauges/useGetVoteUserPower';
import useMultiCheckClaimableTokens from 'hooks/KYO/gauges/useMultiCheckClaimableTokens';
import { useVoteForGaugeWeights } from 'hooks/KYO/gauges/useVoteForGaugeWeights';
import { useWeb3 } from 'hooks/useWeb3';
import { SwapLayout } from 'layouts/SwapLayout';
import { NextSeo } from 'next-seo';
import { useGetAllGaugesQuery } from 'query/generated/graphql-codegen-generated';
import React, { useState } from 'react';
import Countdown from 'react-countdown';
import { BsInfoCircle } from 'react-icons/bs';
import { HiSwitchHorizontal } from 'react-icons/hi';
import { ExtendedNextPage } from 'types/ExtendedNextPage';

const GaugesPage: ExtendedNextPage = () => {
	const { accountAddress, signer, chainId } = useWeb3();

	const week = 604800;
	const currentTime = Date.now() / 1000;

	const { data: allGaugesQueryData } = useGetAllGaugesQuery({
		endpoint: GAUGES_SUBGRAPH_URL
	});
	const gaugeList = (allGaugesQueryData?.allGauges || []) //
		.map((gauge) => ({ address: gauge.address, killed: gauge.killed, name: gauge.symbol.replace('-gauge', '') }));

	const [selectedGauge, setSelectedGauge] = useState('');
	const [gaugeListModalIsOpen, setGaugeListModalIsOpen] = useState(false);
	const [voteAmount, setVoteAmount] = useState(0);
	const [calculatedveKYOAmount, setCalculatedveKYOAmount] = useState(0);
	const [error, setError] = useState('');

	const { data: veKYOBalance = 0 } = useTokenBalance(accountAddress, votingEscrowContract.address);
	const claimableGauges = useMultiCheckClaimableTokens(
		accountAddress,
		gaugeList.map((g) => g.address)
	);
	const { data: votePower = BigNumber.from(0) } = useGetVoteUserPower(accountAddress);

	const { mutate: submitVote } = useVoteForGaugeWeights(signer);
	const { mutate: claimEmissions } = useDistributeGaugeEmissions(signer);

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
		submitVote([selectedGauge, transformedVoteAmount, { gasLimit: 700_000 }]);
	};

	const setGaugeHanlder = (gauge: string) => {
		setSelectedGauge(gauge);
	};

	return (
		<>
			<NextSeo
				title="Gauges"
				canonical={`${ROOT_WITH_PROTOCOL}/kyo/gauges`}
				description="Use your voting power to boost your gauges with veKYO (locked KYO)."
			/>
			<div className="flex min-h-screen w-full flex-col items-center gap-[5vh] bg-darks-500 px-4 pb-8 pt-24 md:px-0 lg:pt-20">
				{gaugeListModalIsOpen && (
					<GaugeModal
						setGauge={setGaugeHanlder}
						closeModal={() => {
							setGaugeListModalIsOpen(false);
						}}
					/>
				)}
				<div className="mt-8 flex w-full flex-col items-center justify-center gap-8 text-center text-white">
					<h1 className=" text-4xl font-bold md:text-5xl">Gauge voting</h1>
					<div className="w-full font-normal md:w-3/4 md:text-xl md:font-semibold lg:w-1/2">
						Use your voting power to boost your gauges with veKYO (locked KYO).
					</div>
				</div>
				<div className="flex flex-row flex-wrap justify-center gap-[10vw]">
					<TitledDisplayBox
						text="veKYO VOTING POWER"
						value={formatBalance(veKYOBalance, {
							maximumFractionDigits: 3
						})}
					/>
					<TitledDisplayBox text="VOTING POWER USED" value={`${votePower.div(100).toString()}%`} />
				</div>
				<div className="mx-auto flex w-full flex-col gap-3 rounded-xl border-2 border-lights-400 bg-black bg-opacity-50 p-3 md:w-3/4 md:gap-4 md:p-4 lg:w-2/3 xl:w-1/2">
					{votePower.toNumber() > 0 && (
						<div>
							{/* Table */}
							<div className=" flex w-full flex-col rounded-lg border-2 border-darks-200">
								{/* Header */}
								<div className=" hidden w-full flex-col justify-between p-2 text-center font-semibold text-white sm:flex sm:flex-row">
									<div className="w-full text-center sm:w-1/4 sm:text-left">Your gauge</div>
									<div className="w-full sm:w-1/4 ">Voting power</div>
									<div className="w-full sm:w-1/4">Claim</div>
									<div className="w-full sm:w-1/4">Reset</div>
								</div>
								{/* Rows */}
								{gaugeList.map((gauge, i) => (
									<div
										key={i}
										className={`flex w-full flex-col items-center justify-between gap-2 ${
											gauge.killed ? 'font-bold text-red-600' : 'text-white'
										} border-darks-200 p-2 text-center  sm:flex-row sm:gap-0 sm:border-t-2`}
									>
										<div className="w-full truncate text-center sm:w-1/4 sm:text-left">{gauge.name}</div>
										<div className="w-full text-xl sm:w-1/4">
											<GaugePowerPercentageUsed account={accountAddress} gauge={gauge.address} />
										</div>
										<div className="w-full px-1 sm:w-1/4">
											<button
												className="btn w-full bg-lights-400 bg-opacity-100 text-black hover:bg-lights-200"
												onClick={() => claimEmissions([gauge.address, { gasLimit: 700_000 }])}
											>
												{Number(fromBigNumber(claimableGauges[i].data || 0)).toLocaleString(navigator.language, {
													minimumFractionDigits: 2,
													maximumFractionDigits: 2
												})}{' '}
												KYO
											</button>
										</div>
										<div className="w-full px-1 sm:w-1/4">
											<button
												className="btn w-full border-2  border-red-600 bg-transparent text-red-600 hover:bg-red-600 hover:text-white"
												onClick={() => submitVote([gauge.address, 0, { gasLimit: 700_000 }])}
											>
												RESET
											</button>
										</div>
									</div>
								))}
							</div>
						</div>
					)}
					{!selectedGauge && (
						<button
							className="btn w-full bg-lights-400 bg-opacity-100 text-black hover:bg-lights-200 "
							onClick={() => {
								setGaugeListModalIsOpen(true);
							}}
						>
							SELECT GAUGE +
						</button>
					)}
					{selectedGauge && (
						<>
							<div
								className="btn flex w-full cursor-pointer flex-row items-center justify-center gap-2 border-2 border-lights-400 bg-transparent text-center text-lg text-lights-400 hover:bg-lights-400 hover:text-black"
								onClick={() => {
									setGaugeListModalIsOpen(true);
								}}
							>
								<div>Switch gauge</div>
								<div className=" text-2xl">
									<HiSwitchHorizontal />
								</div>
							</div>
							<div className="w-full text-center text-lg font-semibold text-white">
								Chosen gauge: {gaugeList.find((g) => g.address === selectedGauge)?.name || '?'}
							</div>
						</>
					)}
					{error !== '' && <div className="w-full text-xl text-red-600 ">{error}</div>}
					<div className="w-full text-center text-xl">
						Voting period ends in <Countdown date={Math.floor((currentTime + week) / week) * week * 1000} className=" font-semibold" />
					</div>
					<div className="flex w-full flex-row flex-wrap items-center justify-between gap-2 text-xl text-white">
						<div className="text-lg md:text-xl">
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
					<div className="w-full rounded-xl bg-darks-500 p-2 text-gray-300">
						{calculatedveKYOAmount.toLocaleString(navigator.language, {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2
						})}{' '}
						({voteAmount}%) of your voting power will be given to the selected gauge.
					</div>
					<div className="flex w-full flex-row items-start justify-start gap-1 rounded-xl bg-gray-600 p-2 text-gray-300 sm:items-center">
						<BsInfoCircle className=" text-2xl md:text-xl" />
						<span>
							Beware that you can vote only <b>once</b> every 7 days for a specific gauges.
						</span>
					</div>
					{selectedGauge && (
						<SingleEntityConnectButton
							className="btn bg-lights-400 px-0 text-black hover:bg-lights-200"
							invalidNetworkClassName="bg-red-600 text-white hover:bg-red-400"
							unsupported={chainId !== ChainId.BOBA}
						>
							<button className="z-20 h-full w-full" onClick={submitVoteHandler}>
								SUBMIT VOTE - {gaugeList[gaugeList.findIndex((gauge) => gauge.address === selectedGauge)].name}
							</button>
						</SingleEntityConnectButton>
					)}

					{!selectedGauge && (
						<SingleEntityConnectButton
							className="btn bg-gray-600 px-0 text-black hover:bg-gray-600"
							invalidNetworkClassName="bg-red-600 text-white hover:bg-red-400"
							unsupported={chainId !== ChainId.BOBA}
						>
							<button className="z-20 h-full w-full">GAUGE NOT SELECTED</button>
						</SingleEntityConnectButton>
					)}
				</div>
				<div className="w-full rounded-xl border-2 border-lights-400 bg-black bg-opacity-40 px-2 py-4 text-center md:px-8 lg:w-2/3 xl:w-1/2">
					<a
						className="w-full text-sm font-semibold text-gray-400 underline decoration-dotted md:text-lg lg:text-xl"
						href={`${ANALYTICS_LINK}/#/gauges`}
						target="_blank"
						rel="noreferrer"
					>
						For more information check out the analytics page.
					</a>
				</div>
			</div>
			<GuideLink type="Vote" text="Trouble voting?" link="https://docs.koyo.finance/protocol/guide/KYO/vote" />
		</>
	);
};

GaugesPage.Layout = SwapLayout('gauge-vote');
export default GaugesPage;
