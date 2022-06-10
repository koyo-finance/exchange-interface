import { formatBalance, fromBigNumber } from '@koyofinance/core-sdk';
import { TokenInfo } from '@uniswap/token-lists';
import useTokenBalance from 'hooks/contracts/useTokenBalance';
import React, { useEffect, useRef, useState } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import { useAccount } from 'wagmi';

export interface SwapCardProps {
	tokenNum: number;
	token: TokenInfo;
	swapStatus: string;
	convertedAmount: number;
	openTokenModal: (tokenNum: number) => void;
	setInputAmount: (amount: number, tokenNum: number, settingConvertedAmount: boolean) => void;
	setActiveToken: (tokenNum: number) => void;
}

const SwapCard: React.FC<SwapCardProps> = ({ tokenNum, token, swapStatus, convertedAmount, openTokenModal, setInputAmount, setActiveToken }) => {
	const [error, setError] = useState('');

	const [tokenAmount, setTokenAmount] = useState(convertedAmount);
	const inputAmountRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const formattedAmount = Number(convertedAmount.toFixed(5));

		setTokenAmount(formattedAmount);

		if (tokenNum === 1) setInputAmount(formattedAmount, tokenNum, true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [convertedAmount]);

	const { data: account } = useAccount();
	const { data: tokenBalance = 0, refetch: refetchBalance } = useTokenBalance(account?.address, token.address);

	useEffect(() => {
		if (swapStatus === 'success') {
			setTokenAmount(0);
			setTimeout(() => {
				refetchBalance();
			}, 3000);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [swapStatus]);

	const changeTokenAmountHandler = (e: any) => {
		if (e.target.value > 1000000) {
			setError('Cannot swap that amount! Amount too large!');
			setTokenAmount(e.target.value);
			return;
		}
		const newAmount = Number(e.target.value);
		setActiveToken(tokenNum);
		setTokenAmount(e.target.value);
		setInputAmount(Number(newAmount.toFixed(5)), tokenNum, false);
		setError('');
	};

	const setMaxTokenAmount = () => {
		const maxAmount = Number(fromBigNumber(tokenBalance, token.decimals).toFixed(5));
		setActiveToken(tokenNum);
		setTokenAmount(maxAmount);
		setInputAmount(maxAmount, tokenNum, false);
		setError('');
	};

	const openModalHandler = () => {
		openTokenModal(tokenNum);
	};

	return (
		<div className=" flex w-full flex-col gap-2 rounded-xl bg-darks-500 p-4">
			{error !== '' && <div className=" w-full text-red-600">{error}</div>}
			<div className="flex w-full flex-row justify-between ">
				<div className=" text-2xl text-darks-200">{tokenNum === 1 ? 'You pay' : 'You receive'}</div>
				<div
					className="flex transform-gpu cursor-pointer flex-row items-center gap-2 rounded-xl bg-darks-400 py-2 px-2 duration-100 hover:bg-darks-300"
					onClick={openModalHandler}
				>
					<div>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img src={token.logoURI} alt={token.name} className="w-8" />
					</div>
					<div>{token.symbol}</div>
					<div>
						<RiArrowDownSLine />
					</div>
				</div>
			</div>
			<div className="flex w-full flex-row items-end justify-between">
				<div className="flex w-10/12 flex-row items-center border-0 border-b-2 border-darks-200">
					<input
						ref={inputAmountRef}
						type="number"
						name={`swap ${tokenNum === 1 ? 'from' : 'to'}`}
						max={1000000}
						onChange={changeTokenAmountHandler}
						value={tokenAmount > 0 ? tokenAmount : ''}
						placeholder={'0,00'}
						onBlur={() => setTokenAmount(Number(Number(tokenAmount).toFixed(5)))}
						className=" w-full
					   bg-darks-500 font-jtm text-3xl font-extralight text-white outline-none md:text-4xl"
					/>
					<button
						type="button"
						onClick={setMaxTokenAmount}
						className="mb-2 transform-gpu cursor-pointer rounded-xl border-2 border-lights-400 p-1 text-lights-400 duration-100 hover:bg-lights-400 hover:text-black"
					>
						MAX
					</button>
				</div>
				<div className="max-w-2/12 flex flex-row flex-wrap justify-center gap-2 text-left">
					<div>Balance:</div>
					<div>{formatBalance(tokenBalance, undefined, token.decimals)}</div>
				</div>
			</div>
		</div>
	);
};

export default SwapCard;
