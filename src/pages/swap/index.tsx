import { ChainId, fromBigNumber, toBigNumber } from '@koyofinance/core-sdk';
import { Pool, pools } from '@koyofinance/swap-sdk';
import { TokenInfo } from '@uniswap/token-lists';
import CoreCardConnectButton from 'components/UI/Cards/CoreCardConnectButton';
import FormApproveAsset from 'components/UI/Cards/FormApproveAsset';
import SwapCard from 'components/UI/Cards/Swap/SwapCard';
import GuideLink from 'components/UI/GuideLink';
import TokenModal from 'components/UI/Modals/TokenModal';
import { ROOT_WITH_PROTOCOL } from 'constants/links';
import { BigNumber } from 'ethers';
import useExchange from 'hooks/contracts/StableSwap/useExchange';
import useGetDY from 'hooks/contracts/StableSwap/useGetDY';
import useMultiTokenAllowance from 'hooks/contracts/useMultiTokenAllowance';
import { SwapLayout, SwapLayoutCard } from 'layouts/SwapLayout';
import { NextSeo } from 'next-seo';
import React, { useEffect, useState } from 'react';
import { BsFillGearFill } from 'react-icons/bs';
import { IoSwapVertical } from 'react-icons/io5';
import { Case, Default, Switch } from 'react-if';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'state/hooks';
import { selectAllTokensByChainId, selectPoolBySwapAndChainId } from 'state/reducers/lists';
import { selectAmount, selectTokenOne, selectTokenTwo, setAmount, setTokenOne, setTokenTwo } from 'state/reducers/selectedTokens';
import { ExtendedNextPage } from 'types/ExtendedNextPage';
import { TokenWithPoolInfo } from 'types/tokens';
import { useAccount, useSigner } from 'wagmi';

const SwapIndexPage: ExtendedNextPage = () => {
	const dispatch = useAppDispatch();

	const { data: account } = useAccount();
	const { data: signer } = useSigner();

	const [tokenModalOneIsOpen, setTokenModalIsOpen] = useState(false);
	const [activeToken, setActiveToken] = useState(1);
	const [tokenOneAmount, setTokenOneAmount] = useState(0);
	const [tokenTwoAmount, setTokenTwoAmount] = useState(0);
	const [invertedTokenOneAmount, setInvertedTokenOneAmount] = useState(0);

	const [tokenOneIndex, setTokenOneIndex] = useState(0);
	const [tokenTwoIndex, setTokenTwoIndex] = useState(1);

	const tokenOne = useSelector(selectTokenOne);
	const tokenTwo = useSelector(selectTokenTwo);
	const tokenAmount = useSelector(selectAmount);
	const pool = useSelector(selectPoolBySwapAndChainId(tokenTwo.poolAddress, ChainId.BOBA));
	const TOKENS = useSelector(selectAllTokensByChainId(ChainId.BOBA));

	const { data: calculatedAmountTokenOne = 0 } = useGetDY(
		tokenTwoIndex,
		tokenOneIndex,
		toBigNumber(tokenTwoAmount, tokenTwo.decimals),
		pool?.id || ''
	);

	const { data: calculatedAmountTokenTwo = 0 } = useGetDY(
		tokenOneIndex,
		tokenTwoIndex,
		toBigNumber(tokenOneAmount, tokenOne.decimals),
		pool?.id || ''
	);

	const allowances = useMultiTokenAllowance(
		account?.address,
		pool?.addresses?.swap,
		pool?.coins?.map((coin) => coin.address)
	);

	useEffect(() => {
		const convertedAmount = fromBigNumber(calculatedAmountTokenOne, tokenOne.decimals);
		if (convertedAmount === 0) {
			setInvertedTokenOneAmount(convertedAmount);
			return;
		}
		const calculatedAmountDiff = tokenTwoAmount - convertedAmount;
		const calculatedSumAmount = tokenTwoAmount + calculatedAmountDiff;
		setInvertedTokenOneAmount(calculatedSumAmount);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [calculatedAmountTokenOne, calculatedAmountTokenTwo]);

	useEffect(() => {
		setTokenOneIndex((pool?.coins || []).findIndex((token) => token.address === tokenOne.address));
		setTokenTwoIndex((pool?.coins || []).findIndex((token) => token.address === tokenTwo.address));
	}, [tokenOne, tokenTwo, pool]);

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
			const [selectedPool] = pools.filter((pool) => pool.id === tokenTwo.poolId);

			const tokenOneIsInSelectedPool = selectedPool.coins.findIndex((coin) => coin.address === token.address);

			if (tokenOneIsInSelectedPool === -1) {
				const filteredPools = pools.map((pool) => {
					const tokenIndex = pool.coins.findIndex((coin) => coin.address === token.address);
					if (tokenIndex === -1) return false;
					return pool;
				});

				const [poolWithSelectedToken] = filteredPools.filter((pool) => pool !== false);
				if (poolWithSelectedToken) {
					const filterTokenFromPool = (poolWithSelectedToken as Pool).coins.filter((coin) => coin.address !== token.address);
					const [selectSecondTokenFromPool] = TOKENS.filter((coin) => filterTokenFromPool[0].address === coin.address);

					const secondToken = {
						...selectSecondTokenFromPool,
						poolId: (poolWithSelectedToken as Pool).id,
						poolAddress: (poolWithSelectedToken as Pool).addresses.swap
					};

					setTokenOneIndex(((poolWithSelectedToken as Pool)?.coins || []).findIndex((token) => token.address === tokenOne.address));
					dispatch(setTokenTwo(secondToken));
				}
			}

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

		setTokenOneIndex((pool?.coins || []).findIndex((token) => token.address === tokenOne.address));
		setTokenTwoIndex((pool?.coins || []).findIndex((token) => token.address === tokenTwoFormatted.address));

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

	const { mutate: exchange, status: swapStatus } = useExchange(signer || undefined, tokenTwo.poolId);

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
						closeModal={closeTokenModalHandler}
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
							convertedAmount={invertedTokenOneAmount}
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
							convertedAmount={fromBigNumber(calculatedAmountTokenTwo, tokenTwo.decimals)}
							openTokenModal={openTokenModalHandler}
							setInputAmount={setTokenAmountHandler}
							setActiveToken={(tokenNum: number) => setActiveToken(tokenNum)}
						/>

						{(pool?.coins.findIndex((coin) => tokenOne.address === coin.address) || 0) > -1 && (
							<CoreCardConnectButton
								className="btn mt-2 w-full bg-lights-400 bg-opacity-100 text-black hover:bg-lights-200"
								invalidNetworkClassName="bg-red-600 text-white hover:bg-red-400"
							>
								<Switch>
									<Case
										condition={BigNumber.from(allowances[tokenOneIndex]?.data || 0).lt(
											toBigNumber(tokenAmount, pool?.coins[tokenOneIndex]?.decimals)
										)}
									>
										{pool && pool.coins.length !== 0 && tokenOneIndex !== -1 && (
											<FormApproveAsset
												asset={pool.coins[tokenOneIndex].address}
												spender={pool.addresses.swap}
												amount={100_000}
												decimals={pool.coins[tokenOneIndex].decimals}
												className="h-full w-full"
											>
												APPROVE - <span className="italic">{pool.coins[tokenOneIndex].name.toUpperCase()}</span>
											</FormApproveAsset>
										)}
									</Case>
									<Default>
										<button
											onClick={() =>
												exchange([
													tokenOneIndex,
													tokenTwoIndex,
													toBigNumber(tokenAmount, pool?.coins[tokenOneIndex]?.decimals),
													0,
													{ gasLimit: 600_000 }
												])
											}
											className="h-full w-full"
										>
											SWAP
										</button>
									</Default>
								</Switch>
							</CoreCardConnectButton>
						)}
						{!((pool?.coins.findIndex((coin) => tokenOne.address === coin.address) || 0) > -1) && (
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
