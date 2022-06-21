import { ChainId } from '@koyofinance/core-sdk';
import { TokenInfo } from '@uniswap/token-lists';
import { TokenFragment } from 'query/generated/graphql-codegen-generated';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllTokensByChainId } from 'state/reducers/lists';
import { TokenWithPoolInfo } from 'types/tokens';

export interface WithdrawCardTokenProps {
	coin: TokenFragment;
	status: string;
	setInputAmount: (name: string, value: number) => void;
}

const WithdrawCardToken: React.FC<WithdrawCardTokenProps> = ({ coin, status, setInputAmount }) => {
	const TOKENS = useSelector(selectAllTokensByChainId(ChainId.BOBA));

	const [tokenAmount, setTokenAmount] = useState<number | string>(0);

	const inputAmountRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (status === 'success') {
			setTokenAmount(0);
		}
	}, [status]);

	const [{ logoURI: coinLogo }] = TOKENS.filter((token: TokenInfo | TokenWithPoolInfo) => token.symbol.toLowerCase() === coin.symbol.toLowerCase());

	const tokenAmountChangeHandler = () => {
		const inputAmount = inputAmountRef.current ? Number(inputAmountRef.current?.value) : 0;
		setTokenAmount(inputAmount);
		setInputAmount(coin.name, Number(inputAmount.toFixed(5)));
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
			<div className="flex w-full flex-row items-end justify-between border-b-2 border-darks-200 pr-2">
				<input
					ref={inputAmountRef}
					type="number"
					name={coin.name}
					onChange={tokenAmountChangeHandler}
					placeholder={'0,00'}
					value={tokenAmount > 0 ? tokenAmount : ''}
					onBlur={() => setTokenAmount(Number(Number(tokenAmount).toFixed(5)))}
					className="w-full border-0 bg-darks-500 font-jtm text-3xl font-extralight text-white outline-none md:text-4xl"
				/>
				<div className=" mb-2 transform-gpu cursor-pointer rounded-xl border-2 border-lights-400 p-1 text-lights-400 duration-100 ease-out hover:bg-lights-400 hover:text-black active:scale-90 ">
					MAX
				</div>
			</div>
		</div>
	);
};

export default WithdrawCardToken;
