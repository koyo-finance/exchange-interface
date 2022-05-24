import { ChainId } from '@koyofinance/core-sdk';
import { TokenInfo } from '@uniswap/token-lists';
import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { selectAllPoolsByChainId, selectAllTokensByChainId } from 'state/reducers/lists';
import { TokenWithPoolInfo } from 'types/tokens';

export interface TokenModalProps {
	tokenNum: number;
	oppositeToken: TokenInfo;
	closeModal: () => void;
	setToken: (token: TokenInfo | TokenWithPoolInfo, tokenNum: number) => void;
}

const TokenModal: React.FC<TokenModalProps> = (props) => {
	const TOKENS = useSelector(selectAllTokensByChainId(ChainId.BOBA));
	const pools = useSelector(selectAllPoolsByChainId(ChainId.BOBA));

	const [tokenList, setTokenList] = useState<(TokenInfo | TokenWithPoolInfo)[]>(TOKENS);
	const [filteredTokenList, setFilteredTokenList] = useState<(TokenInfo | TokenWithPoolInfo)[]>(tokenList);

	useEffect(() => {
		setFilteredTokenList(tokenList);
	}, [tokenList]);

	useEffect(() => {
		const newTokenList = TOKENS.filter((token) => token.address !== props.oppositeToken.address);

		if (props.tokenNum === 1) {
			setTokenList(newTokenList);
			return;
		}

		const newFilteredTokenList = newTokenList
			.flatMap((token) =>
				pools.map((pool) => {
					const oppositeTokenInPool = pool.coins.findIndex((poolToken) => poolToken.address === props.oppositeToken.address);
					if (oppositeTokenInPool === -1) return -1;
					const [tokenInPool] = pool.coins.filter((coin) => {
						return coin.address === token.address;
					});
					if (!tokenInPool) return -1;
					const tokenId = newTokenList.findIndex((wantedToken) => tokenInPool?.address === wantedToken.address);
					const tokenWithPool: TokenWithPoolInfo = {
						...newTokenList[tokenId],
						poolId: pool.id,
						poolAddress: pool.addresses.swap
					};
					return tokenWithPool;
				})
			)
			.filter((tList) => tList !== -1) as TokenWithPoolInfo[];

		setTokenList(newFilteredTokenList);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.oppositeToken.address, (props.oppositeToken as TokenWithPoolInfo).poolId]);

	const setTokenHandler = (address: string, poolId: string) => {
		const chosenTokens = tokenList.filter((token) => token.address === address);

		if (poolId === undefined) {
			props.setToken(chosenTokens[0], props.tokenNum);
			props.closeModal();
			return;
		}

		const [chosenTokenByPool] = chosenTokens.filter((token) => (token as TokenWithPoolInfo).poolId === poolId);
		props.setToken(chosenTokenByPool, props.tokenNum);
		props.closeModal();
	};

	const filterTokensHandler = (e: any) => {
		if (e.target.value === '') {
			setFilteredTokenList(tokenList);
			return;
		}
		const filteredList = tokenList.filter(
			(token) =>
				token.name.includes(e.target.value) ||
				token.name.toLowerCase().includes(e.target.value) ||
				token.symbol.includes(e.target.value) ||
				token.symbol.toLowerCase().includes(e.target.value)
		);
		setFilteredTokenList(filteredList);
	};

	return (
		<div className=" fixed top-0 left-0 z-40 flex min-h-screen w-full items-center justify-center ">
			<div className="fixed top-0 left-0 z-0 min-h-screen w-full cursor-pointer bg-black bg-opacity-50" onClick={props.closeModal}></div>
			<div className="z-20 flex w-[30rem] flex-col gap-4 rounded-xl bg-gray-800 p-4 text-white">
				<div className=" flex w-full flex-row items-center justify-between">
					<div>Select Token</div>
					<div className="cursor-pointer text-2xl" onClick={props.closeModal}>
						<FaTimes />
					</div>
				</div>
				<div>
					<input
						type="text"
						placeholder="Select Token by Name or Address"
						onChange={filterTokensHandler}
						className="w-full rounded-xl border-2 border-darks-300 bg-transparent p-2 text-lg outline-none"
					/>
				</div>
				<div className="flex max-h-[35rem] w-full flex-col overflow-y-scroll">
					{filteredTokenList.map((token, i) => (
						<div
							key={i}
							id={token.symbol}
							className=" flex w-full transform-gpu cursor-pointer flex-row items-center justify-start  gap-3 p-2 duration-150 hover:bg-gray-900"
							onClick={() => setTokenHandler(token.address, (token as TokenWithPoolInfo).poolId)}
						>
							<div>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img src={token.logoURI} className="w-10" alt={token.name} />
							</div>
							<div className=" w-1/2">
								<div>{token.symbol}</div>
								<div>{token.name}</div>
							</div>
							{props.tokenNum === 2 && (token as TokenWithPoolInfo).poolId && (
								<div className=" w-1/2 pr-4 text-right text-gray-500">{(token as TokenWithPoolInfo).poolId}</div>
							)}
						</div>
					))}
				</div>
				<div className=" flex w-full flex-row items-center justify-center gap-2 text-lights-400">
					<div>Manage token lists</div>
					<div>
						<FiEdit />
					</div>
				</div>
			</div>
		</div>
	);
};

export default TokenModal;
