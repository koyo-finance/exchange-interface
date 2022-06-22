import { TokenInfo } from '@uniswap/token-lists';
import React from 'react';

export interface ChooseTokensProps {
	setStep: (step: number) => void;
	selectedTokens: TokenInfo[];
	setTokens: (tokens: TokenInfo[]) => void;
	weights: number[];
	setWeights: (weights: number[]) => void;
}

const ChooseTokens: React.FC<ChooseTokensProps> = ({ setStep }) => {
	return (
		<>
			<div className="flex w-full flex-row items-center justify-between pr-16">
				<div>Token</div>
				<div>Weight</div>
			</div>
			<div className="w-full bg-darks-500">
				<div></div>
				<div></div>
				<div></div>
			</div>
			<button className="btn mt-2 w-full bg-lights-400 bg-opacity-100 p-0 text-lg text-black hover:bg-lights-400" onClick={() => setStep(2)}>
				Confirm Tokens
			</button>
		</>
	);
};

export default ChooseTokens;
