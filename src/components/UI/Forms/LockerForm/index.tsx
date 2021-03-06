import { MaxUint256 } from '@ethersproject/constants';
import { ChainId, formatBalance, fromBigNumber, toBigNumber } from '@koyofinance/core-sdk';
import SingleEntityConnectButton from 'components/CustomConnectButton/SingleEntityConnectButton';
import DatePickerFormik from 'components/Field/DatePickerFormik';
import FormApproveAsset from 'components/FormApproveAsset';
import { kyoContract, votingEscrowContract } from 'core/contracts';
import { BigNumber } from 'ethers';
import { Form, Formik } from 'formik';
import { useCreateVotingEscrowLock } from 'hooks/KYO/useCreateVotingEscrowLock';
import useGetLockTimeEscrow from 'hooks/KYO/useGetLockTimeEscrow';
import { useWithdrawLockedEscrow } from 'hooks/KYO/useWithdrawLockedEscrow';
import useTokenAllowance from 'hooks/generic/useTokenAllowance';
import useTokenBalance from 'hooks/generic/useTokenBalance';
import useGetLockedAmount from 'hooks/KYO/useGetLockedAmount';
import { useWeb3 } from 'hooks/useWeb3';
import React from 'react';
import { Case, Default, Switch } from 'react-if';
import ExtendLockTimeForm from './ExtendLockTimeForm';
import IncreaseLockedAmountForm from './IncreaseLockedAmountForm';
import LockTimeSetButton from './LockTimeSetButton';

const LockerForm: React.FC<{ openForceWithdrawModal: () => void }> = ({ openForceWithdrawModal }) => {
	const { accountAddress, signer, chainId } = useWeb3();

	const { data: kyoBalance = 0 } = useTokenBalance(accountAddress, kyoContract.address);
	const { data: kyoAllowance = 0 } = useTokenAllowance(accountAddress, votingEscrowContract.address, kyoContract.address);
	const { data: lockTime } = useGetLockTimeEscrow(accountAddress);
	const kyoLocked = useGetLockedAmount(accountAddress);

	const { mutate: kyoLock } = useCreateVotingEscrowLock(signer);
	const { mutate: kyoWithdraw } = useWithdrawLockedEscrow(signer);

	const lockTimeConverted = (lockTime as BigNumber)?.toNumber() * 1000;

	const lockIncrements = [
		{ label: '2 weeks', modifier: 2 },
		{ label: '1 month', modifier: 4 },
		{ label: '3 months', modifier: 4 * 3 },
		{ label: '6 months', modifier: 4 * 6 },
		{ label: '9 months', modifier: 4 * 9 },
		{ label: '1 year', modifier: 4 * 12 }
	];

	return (
		<>
			{!lockTimeConverted && (
				<Formik
					initialValues={{ amount: 0, duration: new Date() }}
					onSubmit={(values) => {
						return kyoLock([
							toBigNumber(values.amount), //
							Math.floor(values.duration.getTime() / 1000),
							{ gasLimit: 700_000 }
						]);
					}}
				>
					{(props) => (
						<Form>
							<div className=" flex flex-col gap-6 lg:gap-8">
								<div className=" flex flex-col gap-6">
									<label htmlFor="amount" className="text-lg font-bold md:text-xl">
										Input the amount of KYO you want to lock
									</label>
									<div className="flex w-full flex-row rounded-lg border border-white p-3 font-inter md:w-fit md:py-3 md:px-5 ">
										<input
											name="amount"
											onChange={props.handleChange}
											value={props.values.amount || undefined}
											type="number"
											placeholder="0,00"
											className="w-2/3 border-0 bg-transparent text-lg outline-none md:w-auto"
										/>
										{/* eslint-disable-next-line no-alert */}
										<div className="flex w-1/3 justify-center gap-2 md:w-fit">
											<button
												type="button"
												className="border-r border-white pr-2 text-xs font-bold"
												onClick={() => props.setFieldValue('amount', fromBigNumber(kyoBalance))}
											>
												Max
											</button>
											<span className="">
												<span className="text-xs font-bold">KYO</span>
											</span>
										</div>
									</div>
								</div>
								<div className=" flex flex-col gap-6">
									<div>
										<label htmlFor="duration" className=" text-lg font-bold md:text-xl">
											Select the lock duration
										</label>
										<div className="inline-block pl-4">
											<DatePickerFormik
												name="duration"
												onChange={props.handleChange}
												value={props.values.duration}
												className="inline-block rounded-lg border border-white bg-transparent text-center"
												dateFormat="dd/MM/yyyy"
											/>
										</div>
									</div>
									<div className=" flex flex-row flex-wrap gap-8">
										{lockIncrements.map((increment) => (
											<LockTimeSetButton
												onClick={(date) => props.setFieldValue('duration', date)}
												modifier={increment.modifier}
											>
												{increment.label}
											</LockTimeSetButton>
										))}
									</div>
									<div className=" rounded-xl bg-gray-700 bg-opacity-60 p-2 text-gray-200">
										Beware that locked KYO tokens cannot be unlocked, until the locking period passes. If you want to withdraw
										your KYO tokens before the end of the lock period, you will be able to withdraw only 20% of your locked
										tokens. You'll lose other 80% of locked tokens as a penalty.
									</div>
								</div>
								<div className="">
									<SingleEntityConnectButton
										className="btn w-full bg-lights-400 bg-opacity-100 text-black hover:bg-lights-200"
										invalidNetworkClassName="bg-red-600 text-white hover:bg-red-400"
										unsupported={chainId !== ChainId.BOBA}
									>
										<Switch>
											<Case condition={BigNumber.from(kyoAllowance).lte(toBigNumber(props.values.amount || 0))}>
												<FormApproveAsset
													asset={kyoContract.address}
													spender={votingEscrowContract.address}
													amount={MaxUint256}
													className="h-full w-full"
												>
													APPROVE - <span className="italic">KYO</span>
												</FormApproveAsset>
											</Case>
											<Default>
												<button type="submit" className="h-full w-full">
													LOCK
												</button>
											</Default>
										</Switch>
									</SingleEntityConnectButton>
								</div>
							</div>
						</Form>
					)}
				</Formik>
			)}

			{lockTimeConverted > 0 && (
				<>
					<div className="flex w-full flex-row flex-wrap items-center justify-between text-xl font-semibold">
						<div className="">Your current locker:</div>

						<div className=" text-lights-400">
							{formatBalance(kyoLocked)} KYO locked until{' '}
							{new Date(lockTimeConverted).toLocaleDateString(navigator.language, {
								day: 'numeric',
								month: 'short',
								year: 'numeric'
							})}
						</div>
					</div>

					{lockTimeConverted > Date.now() && fromBigNumber(kyoLocked) > 0 && (
						<>
							<IncreaseLockedAmountForm kyoAllowance={kyoAllowance} kyoBalance={kyoBalance} />
							<hr className=" border-1 rounded-xl" />
							<ExtendLockTimeForm currentLockTime={lockTimeConverted} />
							<hr className=" border-1 rounded-xl" />
							<SingleEntityConnectButton
								className="btn w-full border-2 border-red-600 bg-darks-500 bg-opacity-100 text-red-600 hover:bg-red-600 hover:text-white"
								invalidNetworkClassName="bg-red-600 text-black group hover:bg-red-400"
								unsupported={chainId !== ChainId.BOBA}
							>
								<button className="w-full" onClick={() => openForceWithdrawModal()}>
									FORCE WITHDRAW
								</button>
							</SingleEntityConnectButton>
						</>
					)}
				</>
			)}

			{lockTimeConverted <= Date.now() && fromBigNumber(kyoLocked) > 0 && (
				<SingleEntityConnectButton
					className="btn w-full bg-lights-400 bg-opacity-100 text-black hover:bg-lights-200"
					invalidNetworkClassName="bg-red-600 text-white hover:bg-red-400"
					unsupported={chainId !== ChainId.BOBA}
				>
					<button
						className="btn w-full bg-lights-400 bg-opacity-100 text-black hover:bg-lights-200"
						onClick={() => kyoWithdraw([{ gasLimit: 700_000 }])}
					>
						Withdraw KYO
					</button>
				</SingleEntityConnectButton>
			)}
		</>
	);
};

export default LockerForm;
