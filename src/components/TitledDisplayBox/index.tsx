import React from 'react';

export interface TitledDisplayBoxProps {
	text: string;
	value: string;
}

const TitledDisplayBox: React.FC<TitledDisplayBoxProps> = ({ text, value }) => {
	return (
		<div className="flex w-[65vw] flex-col items-center gap-2 rounded-xl border-2 border-lights-400 bg-black bg-opacity-40 py-4 px-4 md:w-auto md:min-w-fit md:px-8">
			<div className="text-md text-center text-gray-400 md:text-xl">{text}</div>
			<div className="text-2xl font-semibold md:text-4xl">{value}</div>
		</div>
	);
};

export default TitledDisplayBox;
