import { ChainId } from '@koyofinance/core-sdk';
import { TokenInfo } from '@uniswap/token-lists';
import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { selectAllTokensByChainId } from 'state/reducers/lists';
import { useAccount } from 'wagmi';

export interface PoolCreationTokenModalProps {
	chosenTokens: TokenInfo[];
	activeToken: number;
	setModalIsOpen: (state: boolean) => void;
	setTokens: (tokens: TokenInfo[]) => void;
}

const PoolCreationTokenModal: React.FC<PoolCreationTokenModalProps> = ({ chosenTokens, activeToken: _, setModalIsOpen, setTokens: __ }) => {
	// const dispatch = useDispatch();

	const TOKENS = useSelector(selectAllTokensByChainId(ChainId.BOBA));

	const [tokenList, setTokenList] = useState<TokenInfo[]>(TOKENS);
	const [filteredTokenList, setFilteredTokenList] = useState<TokenInfo[]>(tokenList);

	const { data: _account } = useAccount();

	useEffect(() => {
		const newTokenList = chosenTokens.flatMap((chosenToken) => tokenList.filter((token) => token.address !== chosenToken.address));

		setTokenList(newTokenList);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chosenTokens]);

	// const balances = filteredTokenList.map((token) => {
	// 	const { data: tokenBalance = 0 } = useTokenBalance(account?.address, token.address);
	// 	return formatBalance(tokenBalance, undefined, token.decimals);
	// });

	const setTokenHandler = (_address: string) => {
		// const chosenToken = tokenList.filter((token) => token.address === address);

		// dispatch(setTokens[chosen]);
		setModalIsOpen(false);
	};

	const filterTokensHandler = (e: any) => {
		if (e.target.value === '') {
			setFilteredTokenList(TOKENS);
			return;
		}

		const filteredList = TOKENS.filter(
			(token) =>
				token.name.includes(e.target.value) ||
				token.name.toLowerCase().includes(e.target.value) ||
				token.symbol.includes(e.target.value) ||
				token.symbol.toLowerCase().includes(e.target.value) ||
				token.address.includes(e.target.value) ||
				token.address.toLowerCase().includes(e.target.value)
		);

		setFilteredTokenList(filteredList);
	};

	return (
		<div className=" absolute top-0 left-0 z-50 flex min-h-screen w-screen items-center justify-center ">
			<div
				className="fixed top-0 left-0 z-0 min-h-screen w-screen cursor-pointer bg-black bg-opacity-50"
				onClick={() => setModalIsOpen(false)}
			></div>
			<div className="z-50 flex w-[30rem] flex-col gap-4 rounded-xl bg-gray-800 p-4 text-white">
				<div className=" flex w-full flex-row items-center justify-between">
					<div>Select Token</div>
					<div className="cursor-pointer text-2xl" onClick={() => setModalIsOpen(false)}>
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
							{/* <div className=" text-right text-gray-400">{balances[i]}</div> */}
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

export default PoolCreationTokenModal;
