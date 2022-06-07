import React from 'react';

export interface BalanceCardProps {
	text: string;
	value: string;
}

const BalanceCard: React.FC<BalanceCardProps> = ({ text, value }) => {
	return (
		<div className="flex w-[70vw] flex-col items-center gap-2 rounded-xl border-2 border-lights-400 bg-black bg-opacity-40 py-4 px-4 md:w-auto md:min-w-fit md:px-8">
			<div className="text-md text-center font-semibold text-gray-400 md:text-xl">{text}</div>
			<div className="text-2xl font-semibold text-white md:text-4xl">{value}</div>
		</div>
	);
};

export default BalanceCard;
