import React from 'react';

const InfoCard: React.FC<{ data: string; value: string }> = (props) => {
	return (
		<div className=" flex w-72 flex-col items-center justify-center gap-4 rounded-xl border-2 border-lights-400 bg-darks-500 p-6 font-semibold">
			<div className=" text-lg text-gray-400">{props.data}</div>
			<div className=" text-4xl text-white">{props.value}</div>
		</div>
	);
};

export default InfoCard;
