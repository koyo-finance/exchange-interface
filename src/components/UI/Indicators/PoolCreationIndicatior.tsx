import React from 'react';

export interface PoolCreationIndicatorProps {
	step: number;
}

const PoolCreationIndicatior: React.FC<PoolCreationIndicatorProps> = ({ step }) => {
	return (
		<div>
			<ul className="steps">
				<li className="step step-primary">Select Tokens</li>
				<li className="step step-primary">Choose Fee</li>
				<li className="step">Add initial liquidity</li>
				<li className="step">Confirm Pool</li>
			</ul>
		</div>
	);
};

export default PoolCreationIndicatior;
