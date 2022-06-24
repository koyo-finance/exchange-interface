import React from 'react';
import { useSelector } from 'react-redux';
import { selectTokens, selectWeights } from 'state/reducers/createPool';
import AddInitialLiquidity from './AddInitialLiquidity';
import ChooseTokens from './ChooseTokens';
import SetPoolFees from './SetPoolFees';

export interface CreatePoolProps {
	step: number;
	setStep: (step: number) => void;
}

const CreatePool: React.FC<CreatePoolProps> = ({ step, setStep }) => {
	const selectedTokens = useSelector(selectTokens);
	const weights = useSelector(selectWeights);

	return (
		<div className="mt-2 flex h-auto w-full flex-col gap-4">
			{step === 1 && <ChooseTokens setStep={setStep} selectedTokens={selectedTokens} weights={weights} />}
			{step === 2 && <SetPoolFees setStep={setStep} />}
			{step === 3 && <AddInitialLiquidity setStep={setStep} />}
		</div>
	);
};

export default CreatePool;
