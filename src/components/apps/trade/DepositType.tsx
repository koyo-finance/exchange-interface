import React from 'react';

export interface DepositTypeProps {
	typeIsLong: boolean;
	setDepositType: (depositType: boolean) => void;
}

const DepositType: React.FC<DepositTypeProps> = ({ typeIsLong, setDepositType }) => {
	return (
		<div className="flex w-full cursor-pointer flex-row items-center justify-center rounded-xl bg-darks-300 bg-opacity-50 text-xl font-semibold text-white">
			<div
				className={`flex w-1/2 transform-gpu items-center justify-center rounded-l-xl py-2  duration-100 hover:bg-darks-300 ${
					typeIsLong ? 'bg-darks-300' : 'hover:bg-opacity-50'
				} `}
				onClick={() => setDepositType(true)}
			>
				Long
			</div>
			<div
				className={`flex w-1/2 transform-gpu items-center justify-center rounded-r-xl py-2  duration-100  hover:bg-darks-300 ${
					typeIsLong ? 'hover:bg-opacity-50' : 'bg-darks-300'
				} `}
				onClick={() => setDepositType(false)}
			>
				Short
			</div>
		</div>
	);
};

export default DepositType;
