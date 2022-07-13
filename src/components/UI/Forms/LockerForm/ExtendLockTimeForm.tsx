import { ChainId } from '@koyofinance/core-sdk';
import SingleEntityConnectButton from 'components/CustomConnectButton/SingleEntityConnectButton';
import DatePickerFormik from 'components/Field/DatePickerFormik';
import { Form, Formik } from 'formik';
import { useExtendLockTimeEscrow } from 'hooks/KYO/useExtendLockTimeEscrow';
import { useWeb3 } from 'hooks/useWeb3';
import React from 'react';
import { useSigner } from 'wagmi';
import LockTimeSetButton from './LockTimeSetButton';

export interface ExtendLockTimeProps {
	currentLockTime: number;
}

const ExtendLockTimeForm: React.FC<ExtendLockTimeProps> = ({ currentLockTime }) => {
	const { data: signer } = useSigner();
	const signerDefaulted = signer || undefined;

	const { chainId } = useWeb3();

	const { mutate: kyoExtendLockTime } = useExtendLockTimeEscrow(signerDefaulted);

	const lockIncrements = [
		{ label: '2 weeks', modifier: 2 },
		{ label: '1 month', modifier: 4 },
		{ label: '3 months', modifier: 4 * 3 },
		{ label: '6 months', modifier: 4 * 6 },
		{ label: '9 months', modifier: 4 * 9 },
		{ label: '1 year', modifier: 4 * 12 }
	];

	const lockTimeConverted = new Date(currentLockTime);

	return (
		<>
			<Formik
				initialValues={{ duration: new Date() }}
				onSubmit={(values) => {
					return kyoExtendLockTime([Math.floor(values.duration.getTime() / 1000), { gasLimit: 700_000 }]);
				}}
			>
				{(props) => (
					<Form>
						<div className=" flex flex-col gap-6 lg:gap-8">
							<div className=" flex flex-col gap-6">
								<div className=" flex flex-col gap-4">
									<div className="text-lg md:text-xl">
										Current lock time:{' '}
										<div className=" font-semibold">
											{lockTimeConverted.toLocaleDateString(navigator.language, {
												day: '2-digit',
												month: '2-digit',
												year: 'numeric'
											})}
										</div>
									</div>
									<div className=" flex flex-row items-start gap-2 rounded-xl bg-gray-700 bg-opacity-60 p-2 text-gray-200">
										<div className="font-sans text-2xl">&#x24D8;</div>
										<div className="pt-1">Chosen lock duration must be longer than the current one already selected.</div>
									</div>
									<div className="flex flex-row flex-wrap items-start gap-2">
										<label htmlFor="duration" className=" text-lg  md:text-xl">
											Extend the lock duration:
										</label>
										<div className="inline-block">
											<DatePickerFormik
												name="duration"
												onChange={props.handleChange}
												value={props.values.duration}
												className="inline-block rounded-lg border border-white bg-transparent text-center"
												dateFormat="dd/MM/yyyy"
											/>
										</div>
									</div>
								</div>
								<div className=" flex flex-row flex-wrap gap-8">
									{lockIncrements.map((increment) => (
										<LockTimeSetButton onClick={(date) => props.setFieldValue('duration', date)} modifier={increment.modifier}>
											{increment.label}
										</LockTimeSetButton>
									))}
								</div>
							</div>
							<div className="">
								<SingleEntityConnectButton
									className="btn w-full bg-lights-400 bg-opacity-100 text-black hover:bg-lights-200"
									invalidNetworkClassName="bg-red-600 text-white hover:bg-red-400"
									unsupported={chainId !== ChainId.BOBA}
								>
									<button
										type="submit"
										className=" btn w-full bg-lights-400 bg-opacity-100 font-normal text-black hover:bg-lights-200"
									>
										EXTEND LOCK
									</button>
								</SingleEntityConnectButton>
							</div>
						</div>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default ExtendLockTimeForm;
