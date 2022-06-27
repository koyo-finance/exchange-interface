import React from 'react';
import { BsArrowLeft } from 'react-icons/bs';

export interface StepBackCardProps {
	setStep: (step: number) => void;
	step: number;
	previousStep: string;
}

const StepBackCard: React.FC<StepBackCardProps> = ({ setStep, step, previousStep }) => {
	return (
		<div
			className="mt-1 flex w-fit transform-gpu cursor-pointer flex-row items-center gap-1 text-lights-400 duration-100 hover:translate-x-1 hover:text-lights-300"
			onClick={() => setStep(step)}
		>
			<BsArrowLeft className=" text-xl font-bold" />
			<div>Back to {previousStep}</div>
		</div>
	);
};

export default StepBackCard;
