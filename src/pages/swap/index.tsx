import { ConnectButton } from '@rainbow-me/rainbowkit';
import SwapCard from 'components/UI/Cards/SwapCard';
import TokenModal from 'components/UI/Modals/TokenModal';
import { SwapLayout, SwapLayoutCard } from 'layouts/SwapLayout';
import React, { useEffect, useState } from 'react';
import { BsFillGearFill } from 'react-icons/bs';
import { IoSwapVertical } from 'react-icons/io5';
import { useAppDispatch } from 'state/hooks';
import { fetchTokenLists } from 'state/reducers/lists';
import { ExtendedNextPage } from 'types/ExtendedNextPage';
import { Token } from 'types/TokenObject';
import { useAccount } from 'wagmi';

const SwapIndexPage: ExtendedNextPage = () => {
	const dispatch = useAppDispatch();
	const [tokenModalOneIsOpen, setTokenModalIsOpen] = useState(false);
	const [tokenOne, setTokenOne] = useState<Token>({
		name: 'Wrapped Ethereum',
		symbol: 'wETH',
		icon: 'assets/icons/Ethereum.svg',
		address: '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000'
	});
	const [tokenTwo, setTokenTwo] = useState<Token>({
		name: 'Polygon',
		symbol: 'MATIC',
		icon: 'assets/icons/Polygon.svg',
		address: '0x922D641a426DcFFaeF11680e5358F34d97d112E1'
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

	const setTokenHandler = (token: Token, tokenNum: number) => {
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
