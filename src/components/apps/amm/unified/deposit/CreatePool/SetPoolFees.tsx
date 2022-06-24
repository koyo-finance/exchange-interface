import DefaultError from 'components/UI/Errors/DefaultError';
import { isAddress } from 'ethers/lib/utils';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPoolFee, setFeeAddress, setPoolFees } from 'state/reducers/createPool';
import { useAccount } from 'wagmi';
import PoolFeeCard from '../cards/PoolFeeCard';

const feeSets: [fee: number, description: string][] = [
	[0.01, 'Best for very stable pools'],
	[0.05, 'Best for most stable pools'],
	[0.3, 'Best for most pools'],
	[1, 'Best for exotic pairs']
];

export interface SetPoolFeesProps {
	setStep: (step: number) => void;
}

const SetPoolFees: React.FC<SetPoolFeesProps> = ({ setStep }) => {
	const dispatch = useDispatch();
	const currentPoolFee = useSelector(selectPoolFee);

	const { data: account } = useAccount();
	const accountAddress = account?.address;
	const koyoManageAddress = '0xBA1BA1ba1BA1bA1bA1Ba1BA1ba1BA1bA1ba1ba1B';
	const zeroAddress = '0x0000000000000000000000000000000000000000';

	const [isFeesFixed, setIsFeesFixed] = useState(true);
	const [feeManager, setFeeManager] = useState(1);
	const [feeManagerAddress, setFeeManagerAddress] = useState(zeroAddress);
	const [error, setError] = useState('');

	const setChosenPoolFee = (value: number) => {
		dispatch(setPoolFees(value));
	};

	const checkEnteredAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
		const addressIsValid = isAddress(e.target.value);
		if (!addressIsValid) {
			setError('Invalid address!');
			return;
		}
		setError('');
	};

	const confirmPoolFeeHandler = () => {
		const addressIsValid = isAddress(feeManagerAddress);
		if (!addressIsValid) {
			setError('Invalid address!');
			return;
		}
		dispatch(setFeeAddress(feeManagerAddress));
		setStep(3);
	};

	return (
		<>
			<div className="flex w-full flex-col gap-3 rounded-xl bg-darks-500 p-2">
				{error !== '' && <DefaultError message={error} />}
				<div className="flex w-full flex-row items-center justify-between gap-2">
					{feeSets.map(([fee, description]) => (
						<PoolFeeCard value={fee} active={currentPoolFee === fee} comment={description} setPoolFee={setChosenPoolFee} />
					))}
				</div>
				<div className="w-full text-center text-xl text-white">Chosen Fee: {currentPoolFee}%</div>
				<fieldset className="flex flex-col gap-1">
					<div className="flex w-full flex-row items-center gap-2 pl-2">
						<input
							type="radio"
							name="fixedFees"
							checked={isFeesFixed}
							className=" radio radio-primary radio-sm checked:text-transparent "
							onClick={() => {
								setIsFeesFixed(true);
								setFeeManagerAddress(zeroAddress);
								setError('');
							}}
						/>
						<label htmlFor="fixedFees">Fix the fees to the chosen rate</label>
					</div>
					<div className="flex w-full flex-row items-center gap-2 pl-2">
						<input
							type="radio"
							name="dynamicFees"
							checked={!isFeesFixed}
							className=" radio radio-primary radio-sm "
							onClick={() => {
								setIsFeesFixed(false);
								setFeeManagerAddress(accountAddress || '');
								setError('');
							}}
						/>
						<label htmlFor="dynamicFees">Allow dynamic pool fees from the chosen address</label>
					</div>
					{!isFeesFixed && (
						<>
							<div className="mt-2 flex w-full flex-row items-center gap-2 pl-2">
								<input
									type="radio"
									name="myAddress"
									checked={feeManager === 1}
									className=" radio radio-primary radio-sm "
									onClick={() => {
										setFeeManager(1);
										setFeeManagerAddress(accountAddress || '');
										setError('');
									}}
								/>
								<label htmlFor="myAddress">
									My address:{' '}
									{`${accountAddress?.substring(0, 5)}...${accountAddress?.substring(
										accountAddress.length - 5,
										accountAddress.length
									)}`}
								</label>
							</div>
							<div className=" flex w-full flex-row items-center gap-2 pl-2">
								<input
									type="radio"
									name="koyoAddress"
									checked={feeManager === 2}
									className=" radio radio-primary radio-sm "
									onClick={() => {
										setFeeManager(2);
										setFeeManagerAddress(koyoManageAddress);
										setError('');
									}}
								/>
								<label htmlFor="koyoAddress">Let koyo manage the pool fees</label>
							</div>
							<div className="flex w-full flex-row items-center gap-2 pl-2">
								<input
									type="radio"
									name="costumAddress"
									checked={feeManager === 3}
									className=" radio radio-primary radio-sm "
									onClick={() => {
										setFeeManager(3);
										setFeeManagerAddress('');
									}}
								/>
								<label htmlFor="costumAddress">Allow dynamic pool fees from the chosen address</label>
							</div>
						</>
					)}
					{feeManager === 3 && (
						<div className="flex flex-col gap-3">
							<div className="mt-1 w-full rounded-xl bg-gray-500 bg-opacity-60 p-2 text-gray-300">
								You cannot change the address after you set it.
							</div>
							<input
								type="text"
								name="address"
								placeholder={`${accountAddress?.substring(0, 5)}...${accountAddress?.substring(
									accountAddress.length - 5,
									accountAddress.length
								)}`}
								onChange={(e) => {
									setFeeManagerAddress(e.target.value);
									setError('');
								}}
								onBlur={checkEnteredAddress}
								className="border-b-2 border-darks-300 bg-transparent px-2 text-white"
							/>
						</div>
					)}
				</fieldset>
			</div>
			<button className="btn mt-2 w-full bg-lights-400 bg-opacity-100 p-0 text-black hover:bg-lights-400" onClick={confirmPoolFeeHandler}>
				Confirm pool fees
			</button>
		</>
	);
};

export default SetPoolFees;
