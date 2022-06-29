import { ChainId, formatBalance } from '@koyofinance/core-sdk';
import { TokenInfo } from '@uniswap/token-lists';
import { BigNumber } from 'ethers';
import useMultiTokenBalances from 'hooks/generic/useMultiTokenBalances';
import { useWeb3 } from 'hooks/useWeb3';
import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { selectAllTokensByChainId } from 'state/reducers/lists';

export interface SwapTokenModalProps {
	tokenNum: number;
	oppositeToken: TokenInfo;
	closeModal: () => void;
	setToken: (token: TokenInfo, tokenNum: number) => void;
}

const SwapTokenModal: React.FC<SwapTokenModalProps> = (props) => {
	const { accountAddress } = useWeb3();

	const TOKENS = useSelector(selectAllTokensByChainId(ChainId.BOBA));
	const [tokenList, setTokenList] = useState<TokenInfo[]>(TOKENS.filter((token) => token.address !== props.oppositeToken.address));
	const [filteredTokenList, setFilteredTokenList] = useState<TokenInfo[]>(tokenList);

	const tokensBalance = useMultiTokenBalances(
		accountAddress,
		filteredTokenList.map((fToken) => fToken.address)
	);

	const balances = filteredTokenList.map((token, i) => {
		return formatBalance(tokensBalance[i].data || BigNumber.from(0), { minimumFractionDigits: 2, maximumFractionDigits: 4 }, token.decimals);
	});

	useEffect(() => {
		const newTokenList = TOKENS.filter((token) => token.address !== props.oppositeToken.address);

		setTokenList(newTokenList);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.oppositeToken.address]);

	const setTokenHandler = (address: string) => {
		const chosenTokens = tokenList.filter((token) => token.address === address);

		props.setToken(chosenTokens[0], props.tokenNum);
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
							className=" flex w-full transform-gpu cursor-pointer flex-row items-center justify-between p-2 duration-150 hover:bg-gray-900"
							onClick={() => setTokenHandler(token.address)}
						>
							<div className="flex w-full flex-row items-center justify-start  gap-3">
								<div>
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img src={token.logoURI} className="w-10" alt={token.name} />
								</div>
								<div className=" w-1/2">
									<div>{token.symbol}</div>
									<div>{token.name}</div>
								</div>
							</div>
							<div className=" text-right text-gray-400">{balances[i]}</div>
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

export default SwapTokenModal;
