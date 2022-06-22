import React from 'react';

export interface SetPoolFeesProps {
	setStep: (step: number) => void;
}

const SetPoolFees: React.FC<SetPoolFeesProps> = ({ setStep }) => {
	return (
		<>
			<button className="btn mt-2 w-full bg-lights-400 bg-opacity-100 p-0 text-black hover:bg-lights-400" onClick={() => setStep(3)}></button>
		</>
	);
};

export default SetPoolFees;
