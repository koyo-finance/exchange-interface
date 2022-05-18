import { ConnectButton } from '@rainbow-me/rainbowkit';
import { TokenInfo } from '@uniswap/token-lists';
import SwapCard from 'components/UI/Cards/SwapCard';
import TokenModal from 'components/UI/Modals/TokenModal';
import { SwapLayout, SwapLayoutCard } from 'layouts/SwapLayout';
import React, { useEffect, useState } from 'react';
import { BsFillGearFill } from 'react-icons/bs';
import { IoSwapVertical } from 'react-icons/io5';
import { useAppDispatch } from 'state/hooks';
import { fetchTokenLists } from 'state/reducers/lists';
import { ExtendedNextPage } from 'types/ExtendedNextPage';
import { useAccount } from 'wagmi';

const SwapIndexPage: ExtendedNextPage = () => {
	const dispatch = useAppDispatch();
	const [tokenModalOneIsOpen, setTokenModalIsOpen] = useState(false);
	const [tokenOne, setTokenOne] = useState<TokenInfo>({
		name: 'Dai',
		address: '0xf74195Bb8a5cf652411867c5C2C5b8C2a402be35',
		symbol: 'DAI',
		decimals: 18,
		chainId: 288,
		logoURI: 'https://tassets.koyo.finance/logos/DAI/512x512.png'
	});
	const [tokenTwo, setTokenTwo] = useState<TokenInfo>({
		name: 'Frax',
		address: '0x7562F525106F5d54E891e005867Bf489B5988CD9',
		symbol: 'FRAX',
		decimals: 18,
		chainId: 288,
		logoURI: 'https://tassets.koyo.finance/logos/FRAX/512x512.png'
	});

	const [activeToken, setActiveToken] = useState(1);
	// const [isInital, setIsInitial] = useState(false);

	useEffect(() => {
		dispatch(fetchTokenLists());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const { data: account } = useAccount();

	const openTokenModalHandler = (tokenNum: number) => {
		setActiveToken(tokenNum);
		setTokenModalIsOpen(true);
	};

	const closeTokenModalHandler = () => {
		setTokenModalIsOpen(false);
	};

	const setTokenHandler = (token: TokenInfo, tokenNum: number) => {
		if (tokenNum === 1) {
			setTokenOne(token);
			return;
		}
		setTokenTwo(token);
	};

	const swapTokensHandler = () => {
		setTokenOne(tokenTwo);
		setTokenTwo(tokenOne);
	};

	return (
		<div className=" flex h-screen w-full items-center justify-center">
			{tokenModalOneIsOpen && <TokenModal tokenNum={activeToken} closeModal={closeTokenModalHandler} setToken={setTokenHandler} />}
			<SwapLayoutCard>
				<div className="flex w-full flex-row items-center justify-between text-lg font-semibold text-white">
					<div>Swap</div>
					<div>
						<BsFillGearFill />
					</div>
				</div>
				<SwapCard swapType="from" tokenNum={1} token={tokenOne} openTokenModal={openTokenModalHandler} />
				<div className=" flex h-6 w-full cursor-pointer items-center justify-center text-3xl text-white" onClick={swapTokensHandler}>
					<IoSwapVertical />
				</div>
				<SwapCard swapType="to" tokenNum={2} token={tokenTwo} openTokenModal={openTokenModalHandler} />
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
