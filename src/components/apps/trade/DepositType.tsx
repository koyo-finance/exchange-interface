import React from 'react';
import { AiOutlineStock } from 'react-icons/ai';
import { MdSwapHoriz } from 'react-icons/md';

export interface DepositTypeProps {
	depositType: string;
	setDepositType: (depositType: string) => void;
}

const DepositType: React.FC<DepositTypeProps> = ({ depositType, setDepositType }) => {
	return (
		<div className="flex w-full cursor-pointer flex-row items-center justify-center rounded-xl bg-darks-300 bg-opacity-50 text-xl font-semibold text-white">
			<div
				className={`flex w-1/2 transform-gpu items-center justify-center rounded-l-xl py-2  duration-100 hover:bg-darks-300 ${
					depositType === 'long' ? 'bg-darks-300' : 'hover:bg-opacity-50'
				} `}
				onClick={() => setDepositType('long')}
			>
				<AiOutlineStock />
				&nbsp;Long
			</div>
			<div
				className={`flex w-1/2 transform-gpu items-center justify-center  py-2  duration-100  hover:bg-darks-300 ${
					depositType === 'short' ? 'bg-darks-300' : 'hover:bg-opacity-50'
				} `}
				onClick={() => setDepositType('short')}
			>
				<AiOutlineStock className=" scale-x-[-1] transform text-xl" />
				&nbsp;Short
			</div>
			<div
				className={`flex w-1/2 transform-gpu items-center justify-center rounded-r-xl py-2  duration-100  hover:bg-darks-300 ${
					depositType === 'swap' ? 'bg-darks-300' : 'hover:bg-opacity-50'
				} `}
				onClick={() => setDepositType('swap')}
			>
				<MdSwapHoriz className="text-xl" />
				&nbsp;Swap
			</div>
		</div>
	);
};

export default DepositType;
