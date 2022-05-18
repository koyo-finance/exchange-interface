import { ChainId, fromBigNumber, toBigNumber } from '@koyofinance/core-sdk';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { TokenInfo } from '@uniswap/token-lists';
import SwapCard from 'components/UI/Cards/SwapCard';
import TokenModal from 'components/UI/Modals/TokenModal';
import useGetDY from 'hooks/contracts/StableSwap/useGetDY';
import { SwapLayout, SwapLayoutCard } from 'layouts/SwapLayout';
import React, { useEffect, useState } from 'react';
import { BsFillGearFill } from 'react-icons/bs';
import { IoSwapVertical } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'state/hooks';
import { fetchPoolLists, fetchTokenLists, selectPoolBySwapAndChainId } from 'state/reducers/lists';
import { selectAmount, selectTokenOne, selectTokenTwo, setAmount, setTokenOne, setTokenTwo } from 'state/reducers/selectedTokens';
import { ExtendedNextPage } from 'types/ExtendedNextPage';
import { useAccount } from 'wagmi';

const SwapIndexPage: ExtendedNextPage = () => {
	const dispatch = useAppDispatch();

	const [tokenModalOneIsOpen, setTokenModalIsOpen] = useState(false);
	const [activeToken, setActiveToken] = useState(1);

	const { data: account } = useAccount();

	useEffect(() => {
		dispatch(fetchPoolLists());
		dispatch(fetchTokenLists());

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const tokenOne = useSelector(selectTokenOne);
	const tokenTwo = useSelector(selectTokenTwo);
	const inputAmount = useSelector(selectAmount);
	const pool = useSelector(selectPoolBySwapAndChainId(tokenTwo.poolAddress, ChainId.BOBA));

	const openTokenModalHandler = (tokenNum: number) => {
		setActiveToken(tokenNum);
		setTokenModalIsOpen(true);
	};

	const closeTokenModalHandler = () => {
		setTokenModalIsOpen(false);
	};

	const setTokenHandler = (token: TokenInfo, tokenNum: number) => {
		if (tokenNum === 1) {
			dispatch(setTokenOne(token));
			return;
		}
		const tokenTwoFormatted = { tokenData: token, poolAddress: '0x9f0a572be1fcfe96e94c0a730c5f4bc2993fe3f6' };
		dispatch(setTokenTwo(tokenTwoFormatted));
	};

	const swapTokensHandler = () => {
		const tokenOneTransformed = tokenTwo.tokenData;
		const tokenTwoTransformed = {
			tokenData: tokenOne,
			poolAddress: '0x9f0a572be1fcfe96e94c0a730c5f4bc2993fe3f6'
		};
		dispatch(setTokenOne(tokenOneTransformed));
		dispatch(setTokenTwo(tokenTwoTransformed));
	};

	const { data: calculatedAmount = 0 } = useGetDY(
		(pool?.coins || []).findIndex((token) => token.address.toLowerCase() === tokenOne.address.toLowerCase()),
		(pool?.coins || []).findIndex((token) => token.address.toLowerCase() === tokenTwo.tokenData.address.toLowerCase()),
		toBigNumber(inputAmount, tokenOne.decimals),
		pool?.id || ''
	);

	return (
		<div className=" flex h-screen w-full items-center justify-center">
			{tokenModalOneIsOpen && (
				<TokenModal
					tokenNum={activeToken}
					oppositeToken={activeToken === 2 ? tokenOne : tokenTwo.tokenData}
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
					swapType="from"
					tokenNum={1}
					token={tokenOne}
					convertedAmount={0}
					openTokenModal={openTokenModalHandler}
					setInputAmount={(amount: number) => dispatch(setAmount({ amount }))}
				/>
				<div className=" flex h-6 w-full cursor-pointer items-center justify-center text-3xl text-white" onClick={swapTokensHandler}>
					<IoSwapVertical />
				</div>
				<SwapCard
					swapType="to"
					tokenNum={2}
					token={tokenTwo.tokenData}
					convertedAmount={fromBigNumber(calculatedAmount, tokenTwo.tokenData.decimals)}
					openTokenModal={openTokenModalHandler}
					setInputAmount={(amount: number) => dispatch(setAmount({ amount }))}
				/>
				{account && <button className="btn mt-2 w-full bg-lights-400 text-black hover:bg-lights-200">SWAP</button>}
				{!account && (
					<button className="btn mt-2 flex w-full items-center justify-center bg-lights-400 hover:bg-lights-400">
						<ConnectButton />
					</button>
				)}
			</SwapLayoutCard>
		</div>
	);
};

SwapIndexPage.Layout = SwapLayout('swap');
export default SwapIndexPage;
