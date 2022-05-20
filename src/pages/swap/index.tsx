import { ChainId, fromBigNumber, toBigNumber } from '@koyofinance/core-sdk';
import { Pool, pools, RawCoin } from '@koyofinance/swap-sdk';
import { TokenInfo } from '@uniswap/token-lists';
import CoreCardConnectButton from 'components/UI/Cards/CoreCardConnectButton';
import FormApproveAsset from 'components/UI/Cards/FormApproveAsset';
import SwapCard from 'components/UI/Cards/SwapCard';
import TokenModal from 'components/UI/Modals/TokenModal';
import { BigNumber } from 'ethers';
import useExchange from 'hooks/contracts/StableSwap/useExchange';
import useGetDY from 'hooks/contracts/StableSwap/useGetDY';
import useMultiTokenAllowance from 'hooks/contracts/useMultiTokenAllowance';
import { SwapLayout, SwapLayoutCard } from 'layouts/SwapLayout';
import React, { useEffect, useState } from 'react';
import { BsFillGearFill } from 'react-icons/bs';
import { IoSwapVertical } from 'react-icons/io5';
import { Case, Default, Switch } from 'react-if';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'state/hooks';
import { selectAllTokensByChainId, selectPoolBySwapAndChainId } from 'state/reducers/lists';
import { selectAmount, selectTokenOne, selectTokenTwo, setAmount, setTokenOne, setTokenTwo } from 'state/reducers/selectedTokens';
import { ExtendedNextPage } from 'types/ExtendedNextPage';
import { TokenWithPoolInfo } from 'types/TokenWithPoolInfo';
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
	}, [calculatedAmountTokenOne]);

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
				console.log(poolWithSelectedToken);
				const filterTokenFromPool = (poolWithSelectedToken as Pool).coins.filter((coin) => coin.address !== token.address);
				const [selectSecondTokenFromPool] = TOKENS.filter((coin) => filterTokenFromPool[0].address === coin.address);

				const secondToken = {
					...selectSecondTokenFromPool,
					poolId: (poolWithSelectedToken as Pool).id,
					poolAddress: (poolWithSelectedToken as Pool).addresses.swap
				};

				console.log(secondToken);

				setTokenOneIndex(((poolWithSelectedToken as Pool)?.coins || []).findIndex((token) => token.address === tokenOne.address));

				dispatch(setTokenTwo(secondToken));
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

	const { mutate: exchange } = useExchange(signer || undefined, tokenTwo.poolId);

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
			<SwapLayoutCard className="w-[90vw] sm:w-[75vw] md:w-[55vw] lg:w-[45vw] xl:w-[35vw]">
				<div className="w-full">
					<div className="mb-2 flex w-full flex-row items-center justify-between text-lg font-semibold text-white">
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
					<div className=" flex h-8 w-full cursor-pointer items-center justify-center text-3xl text-white" onClick={swapTokensHandler}>
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
										amount={tokenAmount + 1}
										decimals={pool.coins[tokenOneIndex].decimals}
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
								>
									SWAP
								</button>
							</Default>
						</Switch>
					</CoreCardConnectButton>
				</div>
			</SwapLayoutCard>
		</div>
	);
};

SwapIndexPage.Layout = SwapLayout('swap');
export default SwapIndexPage;
