import { formatBalance } from '@koyofinance/core-sdk';
import useTokenBalance from 'hooks/contracts/useTokenBalance';
import React from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import { useAccount } from 'wagmi';

export interface SwapCardProps {
	swapType: string;
	tokenNum: number;
	token: {
		name: string;
		symbol: string;
		icon: string;
		address: string;
	};
	openTokenModal: (tokenNum: number) => void;
}

const SwapCard: React.FC<SwapCardProps> = (props) => {
	const { data: account } = useAccount();

	const { data: tokenBalance = 0 } = useTokenBalance(account?.address, props.token.address);
	console.log(tokenBalance);

	const openModalHandler = () => {
		props.openTokenModal(props.tokenNum);
	};

	return (
		<div className=" flex w-full flex-col gap-2 rounded-xl bg-darks-500 p-4">
			<div className="flex w-full flex-row justify-between ">
				<div className=" text-2xl text-darks-200">{props.swapType === 'from' ? 'You pay' : 'You recieve'}</div>
				<div
					className="flex transform-gpu cursor-pointer flex-row items-center gap-2 rounded-xl bg-darks-400 py-2 px-2 duration-100 hover:bg-darks-300"
					onClick={openModalHandler}
				>
					<div>
						<img src={props.token.icon} alt={props.token.name} />
					</div>
					<div>{props.token.symbol}</div>
					<div>
						<RiArrowDownSLine />
					</div>
				</div>
			</div>
			<div className="flex w-full flex-row items-end justify-between">
				<input
					type="number"
					name={`swap ${props.swapType}`}
					min={0}
					step={0.1}
					className=" w-2/3
				 border-0 border-b-2 border-darks-200 bg-darks-500 font-jtm text-4xl font-extralight text-white outline-none "
				/>
				<div>Balance: {formatBalance(tokenBalance)}</div>
			</div>
		</div>
	);
};

export default SwapCard;
