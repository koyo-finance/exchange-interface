import { fromBigNumber, toBigNumber } from '@koyofinance/core-sdk';
import DatePickerFormik from 'components/forms/fields/DatePickerFormik';
import CoreCardConnectButton from 'components/UI/Cards/CoreCardConnectButton';
import FormApproveAsset from 'components/UI/Cards/FormApproveAsset';
import { kyoContract, votingEscrowContract } from 'core/contracts';
import { BigNumber } from 'ethers';
import { Form, Formik } from 'formik';
import { useCreateVotingEscrowLock } from 'hooks/contracts/KYO/useCreateVotingEscrowLock';
import useTokenAllowance from 'hooks/contracts/useTokenAllowance';
import useTokenBalance from 'hooks/contracts/useTokenBalance';
import React from 'react';
import { Case, Default, Switch } from 'react-if';
import { useAccount, useSigner } from 'wagmi';
import LockTimeSetButton from './LockTimeSetButton';

const LockerForm: React.FC = () => {
	const { data: account } = useAccount();
	const accountAddress = account?.address;
	const { data: signer } = useSigner();
	const signerDefaulted = signer || undefined;

	const { mutate: kyoLock } = useCreateVotingEscrowLock(signerDefaulted);
	const { data: kyoBalance = 0 } = useTokenBalance(accountAddress, kyoContract.address);
	const { data: kyoAllowance = 0 } = useTokenAllowance(accountAddress, votingEscrowContract.address, kyoContract.address);

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
						<>
							<div>
								<label htmlFor="amount" className="text-xl font-bold">
									Input the amount of KYO you want to lock
								</label>
								<br />
								<div className="mt-4 inline-block w-fit rounded-lg border border-black px-6 py-4 font-inter">
									<input
										name="amount"
										onChange={props.handleChange}
										value={props.values.amount}
										type="number"
										className="bg-transparent"
									/>
									{/* eslint-disable-next-line no-alert */}
									<button
										type="button"
										className="border-r border-black pr-2 text-xs font-bold"
										onClick={() => props.setFieldValue('amount', fromBigNumber(kyoBalance))}
									>
										Max
									</button>
									<span className="pl-2">
										<span className="text-xs font-bold">KYO</span>
									</span>
								</div>
							</div>
							<div className="mt-12">
								<label htmlFor="duration" className="text-xl font-bold">
									Select the lock duration (cannot be unlocked)
								</label>
								<div className="inline-block pl-4">
									<DatePickerFormik
										name="duration"
										onChange={props.handleChange}
										value={props.values.duration}
										className="inline-block rounded-lg border border-black bg-transparent text-center"
										dateFormat="dd/MM/yyyy"
									/>
								</div>
								<div className="mt-4 flex gap-7">
									{lockIncrements.map((increment) => (
										<LockTimeSetButton onClick={(date) => props.setFieldValue('duration', date)} modifier={increment.modifier}>
											{increment.label}
										</LockTimeSetButton>
									))}
								</div>
							</div>
							<div className="mt-12">
								<CoreCardConnectButton
									className="btn mt-2 w-full bg-lights-400 bg-opacity-100 text-black hover:bg-lights-200"
									invalidNetworkClassName="bg-red-600 text-white hover:bg-red-400"
								>
									<Switch>
										<Case condition={BigNumber.from(kyoAllowance).lte(toBigNumber(props.values.amount || 0))}>
											<FormApproveAsset
												asset={kyoContract.address}
												spender={votingEscrowContract.address}
												amount={(props.values.amount || 0) + 10}
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
						</>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default LockerForm;
