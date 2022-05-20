import { ChainId } from '@koyofinance/core-sdk';
import { RawCoin } from '@koyofinance/swap-sdk';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllTokensByChainId } from 'state/reducers/lists';

export interface SwapCardProps {
	coin: RawCoin;
	setInputAmount: (e: React.ChangeEvent) => void;
}

const DepositTokenCard: React.FC<SwapCardProps> = (props) => {
	const TOKENS = useSelector(selectAllTokensByChainId(ChainId.BOBA));

	const inputAmountRef = useRef<HTMLInputElement>(null);
	const [defaultValue, setDefaultValue] = useState(0);

	useEffect(() => {}, [props.coin]);

	const [{ logoURI: coinLogo }] = TOKENS.filter((token) => token.symbol.toLowerCase() === props.coin.symbol.toLowerCase());

	return (
		<div className=" flex w-full flex-col gap-2 rounded-xl bg-darks-500 p-4">
			<div className="flex w-full flex-row justify-between ">
				<div className=" text-2xl text-darks-200">{props.coin.name}</div>
				<div className="flex transform-gpu cursor-pointer flex-row items-center gap-2 rounded-xl bg-darks-400 py-2 px-2 duration-100 hover:bg-darks-300">
					<div>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img src={coinLogo} alt={props.coin.name} className="w-8" />
					</div>
					<div>{props.coin.symbol.toUpperCase()}</div>
				</div>
			</div>
			<div className="flex w-full flex-row items-end justify-between">
				<input
					ref={inputAmountRef}
					type="number"
					name={props.coin.name}
					min={0}
					step={0.1}
					onChange={props.setInputAmount}
					value={defaultValue}
					onLoad={() => setDefaultValue(0)}
					defaultValue={inputAmountRef.current?.value}
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
				{/* <div>Balance: {formatBalance(tokenBalance, undefined, props.token.decimals)}</div> */}
			</div>
		</div>
	);
};

export default DepositTokenCard;
