import { ChainId, fromBigNumber, toBigNumber } from '@koyofinance/core-sdk';
import { TokenInfo } from '@uniswap/token-lists';
import CoreCardConnectButton from 'components/UI/Cards/CoreCardConnectButton';
import SwapCard from 'components/UI/Cards/SwapCard';
import TokenModal from 'components/UI/Modals/TokenModal';
import useGetDY from 'hooks/contracts/StableSwap/useGetDY';
import { SwapLayout, SwapLayoutCard } from 'layouts/SwapLayout';
import React, { useEffect, useState } from 'react';
import { BsFillGearFill } from 'react-icons/bs';
import { IoSwapVertical } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'state/hooks';
import { selectPoolBySwapAndChainId } from 'state/reducers/lists';
import { selectTokenOne, selectTokenTwo, setAmount, setTokenOne, setTokenTwo } from 'state/reducers/selectedTokens';
import { ExtendedNextPage } from 'types/ExtendedNextPage';
import { TokenWithPoolInfo } from 'types/TokenWithPoolInfo';

const SwapIndexPage: ExtendedNextPage = () => {
	const dispatch = useAppDispatch();

	const [tokenModalOneIsOpen, setTokenModalIsOpen] = useState(false);
	const [activeToken, setActiveToken] = useState(1);
	const [tokenOneAmount, setTokenOneAmount] = useState(0);
	const [tokenTwoAmount, setTokenTwoAmount] = useState(0);
	const [invertedTokenOneAmount, setInvertedTokenOneAmount] = useState(0);

	const tokenOne = useSelector(selectTokenOne);
	const tokenTwo = useSelector(selectTokenTwo);
	// const inputAmount = useSelector(selectAmount);
	const pool = useSelector(selectPoolBySwapAndChainId(tokenTwo.poolAddress, ChainId.BOBA));

	const { data: calculatedAmountTokenOne = 0 } = useGetDY(
		(pool?.coins || []).findIndex((token) => token.address === tokenTwo.address),
		(pool?.coins || []).findIndex((token) => token.address === tokenOne.address),
		toBigNumber(tokenTwoAmount, tokenOne.decimals),
		pool?.id || ''
	);

	const { data: calculatedAmountTokenTwo = 0 } = useGetDY(
		(pool?.coins || []).findIndex((token) => token.address === tokenOne.address),
		(pool?.coins || []).findIndex((token) => token.address === tokenTwo.address),
		toBigNumber(tokenOneAmount, tokenOne.decimals),
		pool?.id || ''
	);

	useEffect(() => {
		const convertedAmount = fromBigNumber(calculatedAmountTokenOne, tokenOne.decimals);
		if (convertedAmount === 0) {
			setInvertedTokenOneAmount(convertedAmount);
			return;
		}
		console.log(convertedAmount);
		const calculatedAmountDiff = tokenTwoAmount - convertedAmount;
		const calculatedSumAmount = tokenTwoAmount + calculatedAmountDiff;
		setInvertedTokenOneAmount(calculatedSumAmount);
	}, [calculatedAmountTokenOne]);

	const setTokenAmountHandler = (amount: number, tokenNum: number, settingConvertedAmount: boolean) => {
		if (tokenNum === 1) {
			if (!settingConvertedAmount) setTokenOneAmount(amount);
			dispatch(setAmount({ amount }));
			return;
		}
		setTokenTwoAmount(amount);
	};

	const openTokenModalHandler = (tokenNum: number) => {
		setActiveToken(tokenNum);
		setTokenModalIsOpen(true);
	};

	const closeTokenModalHandler = () => {
		setTokenModalIsOpen(false);
	};

	const setTokenHandler = (token: TokenInfo | TokenWithPoolInfo, tokenNum: number) => {
		if (tokenNum === 1) {
			dispatch(setTokenOne(token));
			return;
		}

		const tokenTwoFormatted: TokenWithPoolInfo = {
			address: token.address,
			chainId: token.chainId,
			decimals: token.decimals,
			logoURI: token.logoURI,
			name: token.name,
			symbol: token.symbol,
			poolId: (token as TokenWithPoolInfo)?.poolId || '',
			poolAddress: (token as TokenWithPoolInfo)?.poolAddress || ''
		};
		dispatch(setTokenTwo(tokenTwoFormatted));
	};

	const swapTokensHandler = () => {
		const tokenTwoTransformed: TokenWithPoolInfo = {
			address: tokenOne.address,
			chainId: tokenOne.chainId,
			decimals: tokenOne.decimals,
			logoURI: tokenOne.logoURI,
			name: tokenOne.name,
			symbol: tokenOne.symbol,
			poolId: tokenTwo.poolId,
			poolAddress: tokenTwo.poolAddress
		};

		const tokenOneTransformed = {
			address: tokenTwo.address,
			chainId: tokenTwo.chainId,
			decimals: tokenTwo.decimals,
			logoURI: tokenTwo.logoURI,
			name: tokenTwo.name,
			symbol: tokenTwo.symbol
		};

		dispatch(setTokenOne(tokenOneTransformed));
		dispatch(setTokenTwo(tokenTwoTransformed));
	};

	return (
		<div className=" flex h-screen w-full items-center justify-center">
			{tokenModalOneIsOpen && (
				<TokenModal
					tokenNum={activeToken}
					oppositeToken={activeToken === 2 ? tokenOne : tokenTwo}
					closeModal={closeTokenModalHandler}
					setToken={setTokenHandler}
				/>
			)}
			<SwapLayoutCard>
				<div className="flex w-full flex-row items-center justify-between text-lg font-semibold text-white">
					<div>Swap</div>
					<div>
						<BsFillGearFill />
					</div>
				</div>
				<SwapCard
					tokenNum={1}
					token={tokenOne}
					convertedAmount={invertedTokenOneAmount}
					openTokenModal={openTokenModalHandler}
					setInputAmount={setTokenAmountHandler}
					setActiveToken={(tokenNum: number) => setActiveToken(tokenNum)}
				/>
				<div className=" flex h-6 w-full cursor-pointer items-center justify-center text-3xl text-white" onClick={swapTokensHandler}>
					<IoSwapVertical />
				</div>
				<SwapCard
					tokenNum={2}
					token={tokenTwo}
					convertedAmount={fromBigNumber(calculatedAmountTokenTwo, tokenTwo.decimals)}
					openTokenModal={openTokenModalHandler}
					setInputAmount={setTokenAmountHandler}
					setActiveToken={(tokenNum: number) => setActiveToken(tokenNum)}
				/>
				{/* {account && }
				{!account && (
					<div className="btn mt-2 flex w-full items-center justify-center bg-lights-400 hover:bg-lights-400">
						<ConnectButton />
					</div>
				)} */}
				<CoreCardConnectButton
					className="btn mt-2 w-full bg-lights-400 text-black hover:bg-lights-200"
					invalidNetworkClassName="bg-red-600 text-white hover:bg-red-400"
				>
					<button>SWAP</button>
				</CoreCardConnectButton>
			</SwapLayoutCard>
		</div>
	);
};

SwapIndexPage.Layout = SwapLayout('swap');
export default SwapIndexPage;
