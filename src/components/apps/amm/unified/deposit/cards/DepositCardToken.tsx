import { formatBalance, fromBigNumber } from '@koyofinance/core-sdk';
import SymbolCurrencyIcon from 'components/CurrencyIcon/CurrencyIcon';
import { BigNumberish } from 'ethers';
import { TokenFragment } from 'query/generated/graphql-codegen-generated';
import React, { useEffect, useRef, useState } from 'react';

export interface DepositCardTokenProps {
	coin: TokenFragment;
	balance: BigNumberish;
	resetValues: boolean | undefined;
	setInputAmount: (name: string, value: number) => void;
}

const DepositCardToken: React.FC<DepositCardTokenProps> = ({ coin, balance, resetValues, setInputAmount }) => {
	const [tokenAmount, setTokenAmount] = useState<number | undefined>(undefined);

	const inputAmountRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (resetValues) {
			setTokenAmount(0);
			setInputAmount(coin.name, 0);
		}
	}, [resetValues, coin.name, setInputAmount]);

	const tokenAmountChangeHandler = () => {
		const inputAmount = inputAmountRef.current ? Number(inputAmountRef.current?.value) : 0;
		if (inputAmount === 0) {
			setInputAmount(coin.name, 0);
			setTokenAmount(undefined);
			return;
		}
		setTokenAmount(Number(inputAmount));
		setInputAmount(coin.name, Number(inputAmount.toFixed(5)));
	};

	const setMaxTokenAmount = () => {
		const maxAmount = Number(fromBigNumber(balance, coin.decimals).toFixed(5));
		const flooredAmount = Math.floor(maxAmount * 10000) / 10000;
		setInputAmount(coin.name, flooredAmount);
		setTokenAmount(flooredAmount);
	};

	return (
		<div className=" flex w-full flex-col gap-2 rounded-xl bg-darks-500 p-4">
			<div className="flex w-full flex-row justify-between ">
				<div className=" text-2xl text-darks-200">{coin.name}</div>
				<div className="flex transform-gpu cursor-pointer flex-row items-center gap-2 rounded-xl bg-darks-400 py-2 px-2 duration-100 hover:bg-darks-300">
					<div>
						<SymbolCurrencyIcon symbol={coin.symbol} className="h-8 w-8" />
					</div>
					<div>{coin.symbol.toUpperCase()}</div>
				</div>
			</div>
			<div className="flex w-full flex-row items-end justify-between gap-1">
				<div className=" flex w-10/12 flex-row border-0 border-b-2 border-darks-200">
					<input
						ref={inputAmountRef}
						type="number"
						name={coin.name}
						max={1000000}
						step={0.00001}
						onChange={tokenAmountChangeHandler}
						placeholder={'0,00'}
						value={tokenAmount}
						onBlur={() => setTokenAmount(Number(tokenAmount?.toFixed(4)))}
						className="w-4/5 bg-darks-500 font-jtm text-3xl font-extralight text-white outline-none md:text-4xl"
					/>
					<button
						type="button"
						onClick={setMaxTokenAmount}
						className="mb-2 transform-gpu cursor-pointer rounded-xl border-2 border-lights-400 p-1 text-lights-400 duration-100 hover:bg-lights-400 hover:text-black"
					>
						MAX
					</button>
				</div>
				<div className="flex h-auto w-3/12 flex-row flex-wrap items-center justify-center gap-2 text-left md:pl-0">
					<div>Balance:</div> <div>{formatBalance(balance, { minimumFractionDigits: 2, maximumFractionDigits: 4 }, coin.decimals)}</div>
				</div>
			</div>
		</div>
	);
};

export default DepositCardToken;
