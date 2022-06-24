import React from 'react';

export interface PoolFeeCardProps {
	value: number;
	comment: string;
	setPoolFee: (fee: number) => void;
}

const PoolFeeCard: React.FC<PoolFeeCardProps> = ({ value, comment, setPoolFee }) => {
	return (
		<div className=" transform-gpu cursor-pointer rounded-xl bg-gray-600 bg-opacity-60 p-2 duration-100 hover:bg-gray-500 active:scale-90" onClick={() => setPoolFee(value)}>
			<div className="text-xl text-white">{value}%</div>
			<div className=" text-xs">{comment}</div>
		</div>
	);
};

export default PoolFeeCard;
