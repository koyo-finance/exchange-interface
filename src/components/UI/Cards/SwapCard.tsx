import React from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';

export interface SwapCardProps {
	swapType: string;
}

const SwapCard: React.FC<SwapCardProps> = (props) => {
	return (
		<div className=" flex w-full flex-col gap-2 rounded-xl bg-darks-500 p-4">
			<div className="flex w-full flex-row justify-between ">
				<div className=" text-2xl text-darks-200">{props.swapType === 'from' ? 'You pay' : 'You recieve'}</div>
				<div className="flex flex-row items-center gap-2 rounded-xl bg-darks-400 py-2 px-2">
					<div>B</div>
					<div>BTC</div>
					<div>
						<RiArrowDownSLine />
					</div>
				</div>
			</div>
			<div className="flex w-full flex-row items-end justify-between">
				<div className=" font-jtm text-4xl font-extralight text-white">10.04376</div>
				<div>Balance: 12</div>
			</div>
		</div>
	);
};

export default SwapCard;
