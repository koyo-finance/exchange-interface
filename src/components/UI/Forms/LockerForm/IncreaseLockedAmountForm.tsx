import { MaxUint256 } from '@ethersproject/constants';
import { fromBigNumber, toBigNumber } from '@koyofinance/core-sdk';
import SingleEntityConnectButton from 'components/CustomConnectButton/SingleEntityConnectButton';
import FormApproveAsset from 'components/FormApproveAsset';
import { kyoContract, votingEscrowContract } from 'core/contracts';
import { BigNumber, BigNumberish } from 'ethers';
import { Form, Formik } from 'formik';
import { useIncreaseAmountEscrow } from 'hooks/contracts/KYO/useIncreaseAmountEscrow';
import { useWeb3 } from 'hooks/useWeb3';
import React from 'react';
import { Case, Default, Switch } from 'react-if';

export interface IncreaseLockedAmountFormProps {
	kyoAllowance: BigNumberish;
	kyoBalance: BigNumberish;
}

const IncreaseLockedAmountForm: React.FC<IncreaseLockedAmountFormProps> = ({ kyoAllowance, kyoBalance }) => {
	const { signer } = useWeb3();

	const { mutate: kyoIncreaseAmount } = useIncreaseAmountEscrow(signer);

	return (
		<>
			<Formik
				initialValues={{ amount: 0 }}
				onSubmit={(values) => {
					return kyoIncreaseAmount([toBigNumber(values.amount)]);
				}}
			>
				{(props) => (
					<Form>
						<div className=" flex flex-col gap-6 lg:gap-8">
							<div className=" flex flex-col gap-6">
								<label htmlFor="amount" className="text-lg md:text-xl">
									Input the amount of KYO you want to add to your locker
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
							<div className="">
								<SingleEntityConnectButton
									className="btn w-full bg-lights-400 bg-opacity-100 text-black hover:bg-lights-200"
									invalidNetworkClassName="bg-red-600 text-white hover:bg-red-400"
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
												ADD AMOUNT
											</button>
										</Default>
									</Switch>
								</SingleEntityConnectButton>
							</div>
						</div>
					</Form>
				)}
			</Formik>
			{/* <button
				className="btn w-full bg-lights-400 bg-opacity-100 text-black hover:bg-lights-200"
				onClick={() => increaseAllowance([accountAddress as string, toBigNumber(10000000), { gasLimit: 700_000 }])}
			>
				Increase Allowance
			</button> */}
		</>
	);
};

export default IncreaseLockedAmountForm;
