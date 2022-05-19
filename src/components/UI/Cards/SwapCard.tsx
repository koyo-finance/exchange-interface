import { formatBalance } from '@koyofinance/core-sdk';
import { TokenInfo } from '@uniswap/token-lists';
import useTokenBalance from 'hooks/contracts/useTokenBalance';
import React, { useEffect, useState } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import { useAccount } from 'wagmi';

export interface SwapCardProps {
	swapType: string;
	tokenNum: number;
	token: TokenInfo;
	convertedAmount: number;
	openTokenModal: (tokenNum: number) => void;
	setInputAmount: (amount: number) => void;
	setActiveToken: (tokenNum: number) => void;
}

const SwapCard: React.FC<SwapCardProps> = (props) => {
	const [tokenAmount, setTokenAmount] = useState(props.convertedAmount);

	useEffect(() => {
		setTokenAmount(props.convertedAmount);
	}, [props.convertedAmount]);

	const { data: account } = useAccount();
	const { data: tokenBalance = 0 } = useTokenBalance(account?.address, props.token.address);

	const changeTokenAmountHandler = (e: any) => {
		props.setActiveToken(props.tokenNum);
		setTokenAmount(e.target.value);
		props.setInputAmount(Number(e.target.value));
	};

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
						<img src={props.token.logoURI} alt={props.token.name} className="w-8" />
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
					onChange={changeTokenAmountHandler}
					value={tokenAmount.toLocaleString('fullwide', {
						minimumFractionDigits: 2,
						maximumFractionDigits: 5
					})}
					className=" w-2/3
				  border-0 border-b-2 border-darks-200 bg-darks-500 font-jtm text-4xl font-extralight text-white outline-none"
				/>
				{/* {props.tokenNum === 2 && (
					<div
						className="w-2/3
				 truncate border-0 bg-darks-500 font-jtm text-4xl font-extralight text-white outline-none"
					>
						{props.convertedAmount.toLocaleString('default', {
							minimumFractionDigits: 2,
							maximumFractionDigits: 5
						})}
					</div>
				)} */}
				<div>Balance: {formatBalance(tokenBalance, undefined, props.token.decimals)}</div>
			</div>
		</div>
	);
};

export default SwapCard;
