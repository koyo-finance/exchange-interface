import React from 'react';
import { BsFillGearFill } from 'react-icons/bs';

const SwapCardTop: React.FC = () => {
	return (
		<div className="mb-2 flex w-full flex-row items-center justify-between text-lg font-semibold text-white">
			<div>Swap</div>
			<div>
				<BsFillGearFill />
			</div>
		</div>
	);
};

export default SwapCardTop;
