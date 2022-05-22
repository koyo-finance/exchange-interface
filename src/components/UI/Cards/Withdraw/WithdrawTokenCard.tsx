import { ChainId } from '@koyofinance/core-sdk';
import { RawCoin } from '@koyofinance/swap-sdk';
import { TokenInfo } from '@uniswap/token-lists';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllTokensByChainId } from 'state/reducers/lists';
import { TokenWithPoolInfo } from 'types/TokenWithPoolInfo';

export interface WithdrawTokenCardProps {
	coin: RawCoin;
	setInputAmount: (e: React.ChangeEvent) => void;
}

const WithdrawTokenCard: React.FC<WithdrawTokenCardProps> = ({ coin, setInputAmount }) => {
	const TOKENS = useSelector(selectAllTokensByChainId(ChainId.BOBA));

	const [tokenAmount, setTokenAmount] = useState<number | string>(0);

	const inputAmountRef = useRef<HTMLInputElement>(null);

	const [{ logoURI: coinLogo }] = TOKENS.filter((token: TokenInfo | TokenWithPoolInfo) => token.symbol.toLowerCase() === coin.symbol.toLowerCase());

	const tokenAmountChangeHandler = (e: React.ChangeEvent) => {
		const inputAmount = inputAmountRef.current ? inputAmountRef.current?.value : 0;
		setTokenAmount(inputAmount);
		setInputAmount(e);
	};

	return (
		<div className="flex w-full flex-col gap-2 rounded-xl bg-darks-500 p-4">
			<div className="flex w-full flex-row justify-between ">
				<div className=" text-2xl text-darks-200">{coin.name}</div>
				<div className="flex transform-gpu cursor-pointer flex-row items-center gap-2 rounded-xl bg-darks-400 py-2 px-2 duration-100 hover:bg-darks-300">
					<div>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img src={coinLogo} alt={coin.name} className="w-8" />
					</div>
					<div>{coin.symbol.toUpperCase()}</div>
				</div>
			</div>
			<div className="flex w-full flex-row items-end justify-between">
				<input
					ref={inputAmountRef}
					type="number"
					name={coin.name}
					min={0}
					step={0.1}
					onChange={tokenAmountChangeHandler}
					defaultValue={0.0}
					value={tokenAmount.toLocaleString('fullwide', {
						minimumFractionDigits: 2,
						maximumFractionDigits: 5
					})}
					onBlur={() => setTokenAmount(Number(tokenAmount))}
					className=" w-10/12
				  border-0 border-b-2 border-darks-200 bg-darks-500 font-jtm text-4xl font-extralight text-white outline-none"
				/>
			</div>
		</div>
	);
};

export default WithdrawTokenCard;
