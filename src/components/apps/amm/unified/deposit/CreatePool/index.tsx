import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTokens, selectWeights } from 'state/reducers/createPool';
import ChooseTokens from './ChooseTokens';
import SetPoolFees from './SetPoolFees';

export interface CreatePoolProps {
	step: number;
	setStep: (step: number) => void;
}

const CreatePool: React.FC<CreatePoolProps> = ({ step, setStep }) => {
	const initialTokens = useSelector(selectTokens);
	const initialWeights = useSelector(selectWeights);

	const [selectedTokens, setSelectedTokens] = useState(initialTokens);
	const [weights, setWeights] = useState(initialWeights);

	return (
		<div className="flex h-auto w-full flex-col gap-4">
			{step === 1 && (
				<ChooseTokens
					setStep={setStep}
					selectedTokens={selectedTokens}
					setTokens={setSelectedTokens}
					weights={weights}
					setWeights={setWeights}
				/>
			)}
			{step === 2 && <SetPoolFees setStep={setStep} />}
		</div>
	);
};

export default CreatePool;
