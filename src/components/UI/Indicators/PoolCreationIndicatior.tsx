import React from 'react';

export interface PoolCreationIndicatorProps {
	step: number;
}

const PoolCreationIndicatior: React.FC<PoolCreationIndicatorProps> = ({ step }) => {
	return (
		<div>
			<ul className="steps steps-vertical">
				<li className={`step ${step >= 1 ? 'step-primary' : ''}`}>Select tokens</li>
				<li className={`step ${step >= 2 ? 'step-primary' : ''}`}>Set pool fees</li>
				<li className={`step ${step >= 3 ? 'step-primary' : ''}`}>Add initial liquidity</li>
				<li className={`step ${step >= 4 ? 'step-primary' : ''}`}>Confirm Pool</li>
			</ul>
		</div>
	);
};

export default PoolCreationIndicatior;
