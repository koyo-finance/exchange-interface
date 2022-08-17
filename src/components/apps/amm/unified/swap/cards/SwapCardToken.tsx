import { formatBalance, fromBigNumber, toBigNumber, ZERO_ADDRESS } from '@koyofinance/core-sdk';
import { useGetQoute } from '@koyofinance/momiji-hooks';
import { SupportedChainsList, OrderKind } from '@koyofinance/momiji-sdk';
import { TokenInfo } from '@uniswap/token-lists';
import CurrencyIcon from 'components/CurrencyIcon/CurrencyIcon';
import { SwapTokenNumber } from 'constants/swaps';
import { providers } from 'ethers';
import { getAddress } from 'ethers/lib/utils';
import { Field, useFormikContext } from 'formik';
import useTokenBalance from 'hooks/generic/useTokenBalance';
import { useAmountScaled } from 'hooks/SOR/useAmountScaled';
import { useGetSwaps } from 'hooks/SOR/useGetSwaps';
import { DEFAULT_SWAP_OPTIONS, SwapOptions } from 'hooks/SOR/useRoutedSwap';
import { useWeb3 } from 'hooks/useWeb3';
import { SwapFormValues } from 'pages/swap';
import React, { useEffect, useState } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { selectTokenOne, selectTokenTwo } from 'state/reducers/selectedTokens';
import { selectMomijiUsage } from 'state/reducers/swap';
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
	const { accountAddress, defaultedProvider, chainId } = useWeb3();

	const [error, setError] = useState('');
	const tokenOne = useSelector(selectTokenOne);
	const tokenTwo = useSelector(selectTokenTwo);

	const { data: tokenBalance = 0, refetch: refetchBalance } = useTokenBalance(accountAddress, token.address);

	const momijiEnabled = useSelector(selectMomijiUsage);
	const [validTo, setValidTo] = useState(Math.floor(Date.now() / 1000) + 300);

	useEffect(() => {
		const interval = setInterval(() => setValidTo(Math.floor(Date.now() / 1000) + 300), 30000);
		return () => {
			clearInterval(interval);
		};
	}, []);

	const { data: swapInfo } = useGetSwaps(
		{
			...(DEFAULT_SWAP_OPTIONS as Required<Omit<SwapOptions, 'funds'>>),
			tokenIn: tokenOne.address,
			tokenOut: tokenTwo.address,
			amount: toBigNumber(values[SwapTokenNumber.IN] || 0, tokenOne.decimals),
			swapType: values.swapType,
			forceRefresh: false
		},
		!momijiEnabled
	);
	const {
		data: momijiOrderInfo,
		error: momijiOrderError,
		refetch: momijiRefetch
	} = useGetQoute(
		{
			appData: '0x487B02C558D729ABAF3ECF17881A4181E5BC2446429A0995142297E897B6EB37',
			kind: OrderKind.SELL,
			from: ZERO_ADDRESS,
			receiver: ZERO_ADDRESS,
			sellToken: getAddress(tokenOne.address),
			buyToken: getAddress(tokenTwo.address),
			sellAmountBeforeFee: toBigNumber(values[SwapTokenNumber.IN] || 0, tokenOne.decimals).toString(),
			partiallyFillable: false,
			validTo
		},
		{
			chainId: chainId as SupportedChainsList,
			provider: defaultedProvider as providers.JsonRpcProvider,
			enabled:
				momijiEnabled &&
				tokenOne.address.toLowerCase() !== ZERO_ADDRESS &&
				tokenTwo.address.toLowerCase() !== ZERO_ADDRESS &&
				Boolean(values[SwapTokenNumber.IN]),
			refetchInterval: 15 * 1e3,
			retry: false
		}
	);
	const swapAmounts = useAmountScaled(swapInfo, tokenOne, tokenTwo, values.swapType);

	useEffect(() => {
		if (momijiEnabled) void momijiRefetch();
	}, [momijiEnabled, momijiRefetch, values]);

	useEffect(() => {
		const flooredConvertedAmount = Math.floor(parseFloat(isIn ? swapAmounts.in : swapAmounts.out) * 10000) / 10000;

		if (!isIn && !momijiEnabled && flooredConvertedAmount !== values[tokenNum]) {
			setFieldValue(tokenNum as unknown as string, flooredConvertedAmount);
		}
		if (!isIn && momijiEnabled && momijiOrderInfo && !momijiOrderError) {
			const flooredQuote = Math.floor(fromBigNumber(momijiOrderInfo.quote.buyAmount, tokenTwo.decimals) * 10000) / 10000;

			setFieldValue(tokenNum as unknown as string, flooredQuote);
			setFieldValue('error', '');
		}
		if (!isIn && momijiEnabled && momijiOrderError) {
			setFieldValue(tokenNum as unknown as string, 0);
			setFieldValue('error', momijiOrderError.message);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [setFieldValue, isIn, tokenNum, values, swapAmounts.in, swapAmounts.out, momijiEnabled, momijiOrderInfo, momijiOrderError]);

	useEffect(() => setFieldValue('info', swapInfo), [setFieldValue, swapInfo]);
	useEffect(() => setFieldValue('quote', momijiOrderInfo), [setFieldValue, momijiOrderInfo]);

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
		<div className="flex w-full flex-col gap-2 rounded-xl bg-darks-500 px-4 py-3">
			{error !== '' && <div className=" w-full text-red-600">{error}</div>}
			<div className="flex w-full flex-row justify-between ">
				<div className=" text-lg text-darks-200 md:text-xl lg:text-2xl">{tokenNum === SwapTokenNumber.IN ? 'You pay' : 'You receive'}</div>
				<div
					className="flex transform-gpu cursor-pointer flex-row items-center gap-2 rounded-xl bg-darks-400 py-2 px-2 duration-100 hover:bg-darks-300"
					onClick={openModalHandler}
				>
					<div>
						<CurrencyIcon symbol={token.symbol} overrides={[token.logoURI || '']} className="h-8 w-8" />
					</div>
					<div>{token.symbol}</div>
					<div>
						<RiArrowDownSLine />
					</div>
				</div>
			</div>
			<div className="flex w-full flex-col items-end justify-between gap-2 sm:flex-row sm:gap-0">
				<div className=" flex w-full flex-row items-center gap-2 border-0 border-b-2 border-darks-200 md:w-3/4">
					<Field name={tokenNum} placeholder="0,00" component={SwapCardTokenInput} />
					<button
						type="button"
						onClick={setMaxTokenAmount}
						className="mb-2 transform-gpu cursor-pointer rounded-xl border-2 border-lights-400 p-1 text-lights-400 duration-100 hover:bg-lights-400 hover:text-black"
					>
						MAX
					</button>
				</div>
				<div className="flex w-full flex-row flex-wrap justify-center gap-2 text-left sm:w-1/4">
					<div>Balance:</div>
					<div>{formatBalance(tokenBalance, { minimumFractionDigits: 2, maximumFractionDigits: 4 }, token.decimals)}</div>
				</div>
			</div>
		</div>
	);
};

export default SwapCardToken;
