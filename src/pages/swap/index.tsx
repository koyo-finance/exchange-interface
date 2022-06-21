import { SwapTypes } from '@balancer-labs/sor';
import { toBigNumber } from '@koyofinance/core-sdk';
import { TokenInfo } from '@uniswap/token-lists';
import SingleEntityConnectButton from 'components/CustomConnectButton/SingleEntityConnectButton';
import GuideLink from 'components/GuideLink';
import SwapCard from 'components/UI/Cards/Swap/SwapCard';
import SwapTokenApproval from 'components/UI/Cards/Swap/SwapTokenApproval';
import TokenModal from 'components/UI/Modals/TokenModal';
import { ROOT_WITH_PROTOCOL } from 'constants/links';
import { useAmountScaled } from 'hooks/sor/useAmountScaled';
import { useGetSwaps } from 'hooks/sor/useGetSwaps';
import { DEFAULT_SWAP_OPTIONS, SwapOptions, useSwap } from 'hooks/useSwap';
import { SwapLayout, SwapLayoutCard } from 'layouts/SwapLayout';
import { NextSeo } from 'next-seo';
import React, { useState } from 'react';
import { BsFillGearFill } from 'react-icons/bs';
import { IoSwapVertical } from 'react-icons/io5';
import { Default, Switch } from 'react-if';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'state/hooks';
import { selectAmount, selectTokenOne, selectTokenTwo, setAmount, setTokenOne, setTokenTwo } from 'state/reducers/selectedTokens';
import { ExtendedNextPage } from 'types/ExtendedNextPage';
import { useAccount, useSigner } from 'wagmi';

const SwapIndexPage: ExtendedNextPage = () => {
	const swapType = SwapTypes.SwapExactIn;

	const dispatch = useAppDispatch();

	const { data: account } = useAccount();
	const accountAddress = account?.address || '';
	const { data: signer } = useSigner();

	const [tokenModalOneIsOpen, setTokenModalIsOpen] = useState(false);
	const [activeToken, setActiveToken] = useState(1);

	const tokenOne = useSelector(selectTokenOne);
	const tokenTwo = useSelector(selectTokenTwo);
	const tokenAmount = useSelector(selectAmount);

	const setTokenAmountHandler = (amount: number, tokenNum: number, _settingConvertedAmount: boolean) => {
		if (tokenNum === 1) dispatch(setAmount({ amount: amount && amount > 0 ? amount : 0 }));
	};

	const openTokenModalHandler = (tokenNum: number) => {
		setActiveToken(tokenNum);
		setTokenModalIsOpen(true);
	};

	const setTokenHandler = (token: TokenInfo, tokenNum: number) => {
		if (tokenNum === 1) {
			dispatch(setTokenOne(token));
		} else if (tokenNum === 2) {
			dispatch(setTokenTwo(token));
		}
	};

	const swapTokensHandler = () => {
		dispatch(setTokenOne(tokenTwo));
		dispatch(setTokenTwo(tokenOne));
	};

	const { data: swapInfo } = useGetSwaps({
		...(DEFAULT_SWAP_OPTIONS as Required<Omit<SwapOptions, 'funds'>>),
		tokenIn: tokenOne.address,
		tokenOut: tokenTwo.address,
		amount: toBigNumber(tokenAmount, tokenOne.decimals),
		swapType
	});
	const swapAmounts = useAmountScaled(swapInfo, tokenOne, tokenTwo, swapType);
	const { mutate: swap, status: swapStatus } = useSwap(signer || undefined);

	return (
		<>
			<NextSeo
				title="Swap"
				canonical={`${ROOT_WITH_PROTOCOL}/swap`}
				description="Swap your tokens between different pools. Kōyō Finance makes swapping tokens easier than ever before."
			/>
			<div className="relative flex min-h-screen w-full items-center justify-center bg-darks-500 pt-24 pb-6 md:pb-0 lg:pt-20">
				{tokenModalOneIsOpen && (
					<TokenModal
						tokenNum={activeToken}
						oppositeToken={activeToken === 2 ? tokenOne : tokenTwo}
						closeModal={() => setTokenModalIsOpen(false)}
						setToken={setTokenHandler}
					/>
				)}
				<SwapLayoutCard className="w-[95vw] sm:w-[75vw] md:w-[55vw] lg:w-[45vw] xl:w-[40vw] 2xl:w-[30vw]">
					<div className="flex w-full flex-col gap-1">
						<div className="mb-2 flex w-full flex-row items-center justify-between text-lg font-semibold text-white">
							<div>Swap</div>
							<div>
								<BsFillGearFill />
							</div>
						</div>
						<SwapCard
							tokenNum={1}
							token={tokenOne}
							swapStatus={swapStatus}
							convertedAmount={parseFloat(swapAmounts.in)}
							openTokenModal={openTokenModalHandler}
							setInputAmount={setTokenAmountHandler}
							setActiveToken={(tokenNum: number) => setActiveToken(tokenNum)}
						/>
						<div
							className=" mx-auto h-8 w-auto transform-gpu cursor-pointer text-3xl text-white duration-150 hover:text-lights-400"
							onClick={swapTokensHandler}
						>
							<IoSwapVertical />
						</div>
						<SwapCard
							tokenNum={2}
							token={tokenTwo}
							swapStatus={swapStatus}
							convertedAmount={parseFloat(swapAmounts.out)}
							openTokenModal={openTokenModalHandler}
							setInputAmount={setTokenAmountHandler}
							setActiveToken={(tokenNum: number) => setActiveToken(tokenNum)}
						/>

						{swapInfo && swapInfo.swaps.length > 0 && (
							<SingleEntityConnectButton
								className="btn mt-2 w-full bg-lights-400 bg-opacity-100 text-black hover:bg-lights-200"
								invalidNetworkClassName="bg-red-600 text-white hover:bg-red-400"
							>
								<Switch>
									<SwapTokenApproval />
									<Default>
										<button
											onClick={() =>
												swap({
													options: {
														tokenIn: tokenOne.address,
														tokenOut: tokenTwo.address,
														amount: toBigNumber(tokenAmount, tokenOne.decimals),
														swapType,
														funds: {
															sender: accountAddress,
															fromInternalBalance: false,
															recipient: accountAddress,
															toInternalBalance: false
														}
													}
												})
											}
											className="h-full w-full"
										>
											SWAP
										</button>
									</Default>
								</Switch>
							</SingleEntityConnectButton>
						)}
						{swapInfo && swapInfo.swaps.length === 0 && (
							<button className="mt-2 w-full rounded-lg bg-gray-600 bg-opacity-100 p-3 text-center text-black">
								Cannot swap - Invalid path
							</button>
						)}
					</div>
				</SwapLayoutCard>
				<GuideLink type="Swap" text="Trouble swapping?" link="https://docs.koyo.finance/protocol/guide/exchange/swap" />
			</div>
		</>
	);
};

SwapIndexPage.Layout = SwapLayout('swap');
export default SwapIndexPage;
