import React from 'react';

const steps: [step: number, name: string][] = [
	[1, 'Select tokens'],
	[2, 'Set pool fees'],
	[3, 'Add initial liquidity'],
	[4, 'Confirm Pool']
];

export interface PoolCreationIndicatorProps {
	step: number;
}

const PoolCreationIndicatior: React.FC<PoolCreationIndicatorProps> = ({ step }) => {
	return (
		<div>
			<ul className="steps steps-vertical">
				{steps.map(([step_, name]) => (
					<li className={`step ${step >= step_ ? 'step-primary' : ''}`}>{name}</li>
				))}
			</ul>
		</div>
	);
};

export default PoolCreationIndicatior;
