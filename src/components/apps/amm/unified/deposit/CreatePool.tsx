import React from 'react';
import { useSelector } from 'react-redux';
import { selectTokens, selectWeights } from 'state/reducers/createPool';
import AddInitialLiquidity from './flows/CreatePool/AddInitialLiquidity';
import ChooseTokens from './flows/CreatePool/ChooseTokens';
import PoolConfirmation from './flows/CreatePool/PoolConfirmation';
import SetPoolFees from './flows/CreatePool/SetPoolFees';

export interface CreatePoolProps {
	step: number;
	setStep: (step: number) => void;
	cancelPoolCreation: (status: boolean) => void;
}

const CreatePool: React.FC<CreatePoolProps> = ({ step, setStep, cancelPoolCreation }) => {
	const selectedTokens = useSelector(selectTokens);
	const weights = useSelector(selectWeights);

	return (
		<div className="mt-2 flex h-auto w-full flex-col gap-4">
			{step === 1 && <ChooseTokens setStep={setStep} selectedTokens={selectedTokens} weights={weights} />}
			{step === 2 && <SetPoolFees setStep={setStep} />}
			{step === 3 && <AddInitialLiquidity setStep={setStep} />}
			{step === 4 && <PoolConfirmation setStep={setStep} cancelPoolCreation={cancelPoolCreation} />}
		</div>
	);
};

export default CreatePool;
