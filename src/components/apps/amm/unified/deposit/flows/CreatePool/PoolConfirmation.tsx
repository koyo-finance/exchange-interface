import React from 'react';
import { BsArrowLeft } from 'react-icons/bs';

export interface PoolConfirmationProps {
	setStep: (step: number) => void;
}

const PoolConfirmation: React.FC<PoolConfirmationProps> = ({ setStep }) => {
	return (
		<div
			className="mt-1 flex w-full transform-gpu cursor-pointer flex-row items-center gap-1 text-lights-400 duration-100 hover:translate-x-1 hover:text-lights-300"
			onClick={() => setStep(3)}
		>
			<BsArrowLeft className=" text-xl font-bold" />
			<div>Back to initital liquidity</div>
		</div>
	);
};

export default PoolConfirmation;
