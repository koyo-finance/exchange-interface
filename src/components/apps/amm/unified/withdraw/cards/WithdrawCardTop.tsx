import React from 'react';
import { BsFillGearFill } from 'react-icons/bs';

const WithdrawCardTop: React.FC = () => {
	return (
		<div className="flex w-full flex-row items-center justify-between text-lg font-semibold text-white">
			<div>Remove Liquidity</div>
			<div>
				<BsFillGearFill />
			</div>
		</div>
	);
};

export default WithdrawCardTop;
