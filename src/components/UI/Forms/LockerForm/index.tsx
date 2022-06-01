import { formatBalance, fromBigNumber, toBigNumber } from '@koyofinance/core-sdk';
import DatePickerFormik from 'components/forms/fields/DatePickerFormik';
import CoreCardConnectButton from 'components/UI/Cards/CoreCardConnectButton';
import FormApproveAsset from 'components/UI/Cards/FormApproveAsset';
import { kyoContract, votingEscrowContract } from 'core/contracts';
import { BigNumber } from 'ethers';
import { Form, Formik } from 'formik';
import { useCreateVotingEscrowLock } from 'hooks/contracts/KYO/useCreateVotingEscrowLock';
import useGetLockTimeEscrow from 'hooks/contracts/KYO/useGetLockTimeEscrow';
import { useWithdrawLockedEscrow } from 'hooks/contracts/KYO/useWithdrawLockedEscrow';
import useGetLockedAmount from 'hooks/useGetLockedAmount';
import useTokenAllowance from 'hooks/contracts/useTokenAllowance';
import useTokenBalance from 'hooks/contracts/useTokenBalance';
import React from 'react';
import { Case, Default, Switch } from 'react-if';
import { useAccount, useSigner } from 'wagmi';
import ExtendLockTimeForm from './ExtendLockTimeForm';
import IncreaseLockedAmountForm from './IncreaseLockedAmountForm';
import LockTimeSetButton from './LockTimeSetButton';

const LockerForm: React.FC<{ openForceWithdrawModal: () => void }> = ({ openForceWithdrawModal }) => {
	const { data: account } = useAccount();
	const accountAddress = account?.address;
	const { data: signer } = useSigner();
	const signerDefaulted = signer || undefined;

	const { data: kyoBalance = 0 } = useTokenBalance(accountAddress, kyoContract.address);
	const { data: kyoAllowance = 0 } = useTokenAllowance(accountAddress, votingEscrowContract.address, kyoContract.address);
	const { data: lockTime } = useGetLockTimeEscrow(accountAddress);
	const kyoLocked = useGetLockedAmount(accountAddress);
	const { data: veKyoBalance = 0 } = useTokenBalance(accountAddress, votingEscrowContract.address);
	const { mutate: kyoLock } = useCreateVotingEscrowLock(signerDefaulted);
	const { mutate: kyoWithdraw } = useWithdrawLockedEscrow(signerDefaulted);

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
			{/* eslint-disable-next-line no-alert */}
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
											value={props.values.amount}
											type="number"
											className="w-2/3 bg-transparent text-lg md:w-auto"
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
									<CoreCardConnectButton
										className="btn w-full bg-lights-400 bg-opacity-100 text-black hover:bg-lights-200"
										invalidNetworkClassName="bg-red-600 text-white hover:bg-red-400"
									>
										<Switch>
											<Case condition={BigNumber.from(kyoAllowance).lte(toBigNumber(props.values.amount || 0))}>
												<FormApproveAsset
													asset={kyoContract.address}
													spender={votingEscrowContract.address}
													amount={10_000_000}
													decimals={18}
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
									</CoreCardConnectButton>
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

					<IncreaseLockedAmountForm kyoAllowance={kyoAllowance} kyoBalance={kyoBalance} />
					<hr className=" border-1 rounded-xl" />
					<ExtendLockTimeForm currentLockTime={lockTimeConverted} />
					<hr className=" border-1 rounded-xl" />
					<button
						className="btn w-full border-2  border-red-600 bg-darks-500 bg-opacity-100 text-red-600 hover:bg-red-600 hover:text-white"
						onClick={() => openForceWithdrawModal()}
					>
						FORCE WITHDRAW
					</button>
				</>
			)}

			{lockTimeConverted <= new Date().getMilliseconds() && fromBigNumber(veKyoBalance) > 0 && (
				<button onClick={() => kyoWithdraw([{ gasLimit: 700_000 }])}>Withdraw KYO</button>
			)}
		</>
	);
};

export default LockerForm;
