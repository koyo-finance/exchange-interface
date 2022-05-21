import { formatBalance } from '@koyofinance/core-sdk';
import { TokenInfo } from '@uniswap/token-lists';
import useTokenBalance from 'hooks/contracts/useTokenBalance';
import React, { useEffect, useRef, useState } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import { useAccount } from 'wagmi';

export interface SwapCardProps {
	tokenNum: number;
	token: TokenInfo;
	convertedAmount: number;
	openTokenModal: (tokenNum: number) => void;
	setInputAmount: (amount: number, tokenNum: number, settingConvertedAmount: boolean) => void;
	setActiveToken: (tokenNum: number) => void;
}

const SwapCard: React.FC<SwapCardProps> = (props) => {
	const [tokenAmount, setTokenAmount] = useState(props.convertedAmount);
	const inputAmountRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		setTokenAmount(props.convertedAmount);

		if (props.tokenNum === 1) props.setInputAmount(props.convertedAmount, props.tokenNum, true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.convertedAmount]);

	const { data: account } = useAccount();
	const { data: tokenBalance = 0 } = useTokenBalance(account?.address, props.token.address);

	const changeTokenAmountHandler = (e: any) => {
		props.setActiveToken(props.tokenNum);
		setTokenAmount(e.target.value);
		props.setInputAmount(Number(e.target.value), props.tokenNum, false);
	};

	const openModalHandler = () => {
		props.openTokenModal(props.tokenNum);
	};

	return (
		<div className=" flex w-full flex-col gap-2 rounded-xl bg-darks-500 p-4">
			<div className="flex w-full flex-row justify-between ">
				<div className=" text-2xl text-darks-200">{props.tokenNum === 1 ? 'You pay' : 'You recieve'}</div>
				<div
					className="flex transform-gpu cursor-pointer flex-row items-center gap-2 rounded-xl bg-darks-400 py-2 px-2 duration-100 hover:bg-darks-300"
					onClick={openModalHandler}
				>
					<div>
						{/* eslint-disable-next-line @next/next/no-img-element */}
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
					ref={inputAmountRef}
					type="number"
					name={`swap ${props.tokenNum === 1 ? 'from' : 'to'}`}
					min={0}
					step={0.1}
					onChange={changeTokenAmountHandler}
					defaultValue={tokenAmount.toLocaleString('default', {
						minimumFractionDigits: 2,
						maximumFractionDigits: 5
					})}
					value={tokenAmount.toLocaleString('default', {
						minimumFractionDigits: 2,
						maximumFractionDigits: 5
					})}
					onBlur={() => setTokenAmount(Number(tokenAmount))}
					className=" w-9/12
				  border-0 border-b-2 border-darks-200 bg-darks-500 font-jtm text-4xl font-extralight text-white outline-none"
				/>
				<div className="max-w-2/12 flex flex-row flex-wrap justify-center gap-2 text-left">
					<div>Balance:</div>
					<div>{formatBalance(tokenBalance, undefined, props.token.decimals)}</div>
				</div>
			</div>
		</div>
	);
};

export default SwapCard;
