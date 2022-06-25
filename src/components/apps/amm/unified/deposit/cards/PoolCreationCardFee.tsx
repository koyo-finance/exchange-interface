import React from 'react';

export interface PoolCreationCardFeeProps {
	value: number;
	comment: string;
	setPoolFee: (fee: number) => void;
	active?: boolean;
}

const PoolCreationCardFee: React.FC<PoolCreationCardFeeProps> = ({ value, comment, setPoolFee, active }) => {
	return (
		<button
			className={`transform-gpu cursor-pointer rounded-xl border-2 bg-gray-600 bg-opacity-60 p-2 duration-100 hover:bg-gray-500 active:scale-90 ${
				active ? 'border-darks-300' : 'border-transparent'
			}`}
			onClick={() => setPoolFee(value)}
		>
			<div className="text-xl text-white">{value}%</div>
			<div className=" text-xs">{comment}</div>
		</button>
	);
};

export default PoolCreationCardFee;
