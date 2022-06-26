import { formatBalance, fromBigNumber, toBigNumber } from '@koyofinance/core-sdk';
import { TokenInfo } from '@uniswap/token-lists';
import SymbolCurrencyIcon from 'components/CurrencyIcon/SymbolCurrencyIcon';
import { SwapTokenNumber } from 'constants/swaps';
import { Field, useFormikContext } from 'formik';
import useTokenBalance from 'hooks/contracts/useTokenBalance';
import { useAmountScaled } from 'hooks/sor/useAmountScaled';
import { useGetSwaps } from 'hooks/sor/useGetSwaps';
import { DEFAULT_SWAP_OPTIONS, SwapOptions } from 'hooks/useSwap';
import { SwapFormValues } from 'pages/swap';
import React, { useEffect, useState } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { selectTokenOne, selectTokenTwo } from 'state/reducers/selectedTokens';
import { useAccount } from 'wagmi';
import SwapCardTokenInput from './SwapCardTokenInput';

export type TokenNumRelativeCallback = (tokenNum: number) => void;

export interface SwapCardTokenProps {
	tokenNum: SwapTokenNumber;
	token: TokenInfo;
	swapStatus: string;
	isIn: boolean;
	openTokenModal: TokenNumRelativeCallback;
	setActiveToken: TokenNumRelativeCallback;
}

const SwapCardToken: React.FC<SwapCardTokenProps> = ({ tokenNum, token, swapStatus, isIn, openTokenModal, setActiveToken }) => {
	const { setFieldValue, values } = useFormikContext<SwapFormValues>();
	const [error, setError] = useState('');

	const { data: account } = useAccount();
	const { data: tokenBalance = 0, refetch: refetchBalance } = useTokenBalance(account?.address, token.address);

	const tokenOne = useSelector(selectTokenOne);
	const tokenTwo = useSelector(selectTokenTwo);

	const { data: swapInfo } = useGetSwaps({
		...(DEFAULT_SWAP_OPTIONS as Required<Omit<SwapOptions, 'funds'>>),
		tokenIn: tokenOne.address,
		tokenOut: tokenTwo.address,
		amount: toBigNumber(values[SwapTokenNumber.IN] || 0, tokenOne.decimals),
		swapType: values.swapType,
		forceRefresh: false
	});
	const swapAmounts = useAmountScaled(swapInfo, tokenOne, tokenTwo, values.swapType);

	useEffect(() => {
		const flooredConvertedAmount = Math.floor(parseFloat(isIn ? swapAmounts.in : swapAmounts.out) * 10000) / 10000;

		if (!isIn && flooredConvertedAmount !== values[tokenNum]) {
			setFieldValue(tokenNum as unknown as string, flooredConvertedAmount);
		}
	}, [setFieldValue, isIn, tokenNum, values, swapAmounts.in, swapAmounts.out]);

	useEffect(() => setFieldValue('info', swapInfo), [setFieldValue, swapInfo]);

	useEffect(() => {
		if (swapStatus === 'success') {
			setFieldValue(tokenNum as unknown as string, 0);
			setTimeout(() => {
				refetchBalance();
			}, 3000);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [swapStatus, setFieldValue]);

	const setMaxTokenAmount = () => {
		const maxAmount = Number(fromBigNumber(tokenBalance, token.decimals));
		const flooredAmount = Math.floor(maxAmount * 10000) / 10000;

		setActiveToken(tokenNum);
		setFieldValue(tokenNum as unknown as string, flooredAmount);
		setError('');
	};

	const openModalHandler = () => {
		openTokenModal(tokenNum);
	};

	return (
		<div className="flex w-full flex-col gap-2 rounded-xl bg-darks-500 p-4">
			{error !== '' && <div className=" w-full text-red-600">{error}</div>}
			<div className="flex w-full flex-row justify-between ">
				<div className=" text-2xl text-darks-200">{tokenNum === SwapTokenNumber.IN ? 'You pay' : 'You receive'}</div>
				<div
					className="flex transform-gpu cursor-pointer flex-row items-center gap-2 rounded-xl bg-darks-400 py-2 px-2 duration-100 hover:bg-darks-300"
					onClick={openModalHandler}
				>
					<div>
						<SymbolCurrencyIcon symbol={token.symbol} className="h-8 w-8" />
					</div>
					<div>{token.symbol}</div>
					<div>
						<RiArrowDownSLine />
					</div>
				</div>
			</div>
			<div className="flex w-full flex-row items-end justify-between">
				<div className="flex w-10/12 flex-row items-center border-0 border-b-2 border-darks-200">
					<Field name={tokenNum} placeholder="0,00" component={SwapCardTokenInput} />
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

export default SwapCardToken;
