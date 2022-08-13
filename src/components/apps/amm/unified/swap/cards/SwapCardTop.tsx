import React from 'react';
import ToggleSwapMode from '../momiji/ToggleSwapMode';

const SwapCardTop: React.FC = () => {
	return (
		<div className="mb-2 flex w-full flex-row items-center justify-between text-lg font-semibold text-white">
			<div>Swap</div>
			<div>
				<ToggleSwapMode />
			</div>
		</div>
	);
};

export default SwapCardTop;
