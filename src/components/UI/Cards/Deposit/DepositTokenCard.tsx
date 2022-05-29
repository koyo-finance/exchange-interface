import { ChainId, formatBalance } from '@koyofinance/core-sdk';
import { RawCoin } from '@koyofinance/swap-sdk';
import { TokenInfo } from '@uniswap/token-lists';
import { BigNumberish } from 'ethers';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllTokensByChainId } from 'state/reducers/lists';
import { TokenWithPoolInfo } from 'types/tokens';

export interface DepositCardProps {
	coin: RawCoin;
	balance: BigNumberish;
	resetValues: boolean | undefined;
	setInputAmount: (e: React.ChangeEvent) => void;
}

const DepositTokenCard: React.FC<DepositCardProps> = (props) => {
	const TOKENS = useSelector(selectAllTokensByChainId(ChainId.BOBA));

	const [tokenAmount, setTokenAmount] = useState<number | string>(0);

	const inputAmountRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (props.resetValues) {
			setTokenAmount(0);
		}
	}, [props.resetValues]);

	const [{ logoURI: coinLogo }] = TOKENS.filter(
		(token: TokenInfo | TokenWithPoolInfo) => token.symbol.toLowerCase() === props.coin.symbol.toLowerCase()
	);

	const tokenAmountChangeHandler = (e: React.ChangeEvent) => {
		const inputAmount = inputAmountRef.current ? inputAmountRef.current?.value : 0;
		setTokenAmount(inputAmount);
		props.setInputAmount(e);
	};

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
					max={1000000}
					onChange={tokenAmountChangeHandler}
					placeholder={'0,00'}
					value={tokenAmount > 0 ? tokenAmount : ''}
					onBlur={() => setTokenAmount(Number(Number(tokenAmount).toFixed(5)))}
					className=" w-10/12
				  border-0 border-b-2 border-darks-200 bg-darks-500 font-jtm text-3xl font-extralight text-white outline-none md:text-4xl"
				/>
				<div className="max-w-2/12 flex flex-row flex-wrap justify-center gap-2 text-left md:pl-0 lg:flex-nowrap">
					<div>Balance:</div> <div>{formatBalance(props.balance, undefined, props.coin.decimals)}</div>
				</div>
			</div>
		</div>
	);
};

export default DepositTokenCard;
