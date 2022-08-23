import { formatBalance } from '@koyofinance/core-sdk';
import { TokenInfo } from '@uniswap/token-lists';
import CurrencyIcon from 'components/CurrencyIcon/CurrencyIcon';
import { BigNumber } from 'ethers';
import useMultiTokenBalances from 'hooks/generic/useMultiTokenBalances';
import { useWeb3 } from 'hooks/useWeb3';
import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

export interface CollateralAssetModalProps {
	collateralTokens: TokenInfo[];
	setCollateralAsset: (token: TokenInfo) => void;
	setCollateralDropdownOpen: (value: boolean) => void;
}

const CollateralAssetModal: React.FC<CollateralAssetModalProps> = ({ collateralTokens, setCollateralAsset, setCollateralDropdownOpen }) => {
	const [filteredTokenList, setFilteredTokenList] = useState(collateralTokens);

	const { accountAddress } = useWeb3();

	const tokensBalance = useMultiTokenBalances(
		accountAddress,
		filteredTokenList.map((fToken) => fToken.address)
	);

	const balances = filteredTokenList.map((token, i) => {
		return formatBalance(tokensBalance[i].data || BigNumber.from(0), { minimumFractionDigits: 2, maximumFractionDigits: 4 }, token.decimals);
	});

	const filterTokensHandler = (e: any) => {
		if (e.target.value === '') {
			setFilteredTokenList(collateralTokens);
			return;
		}

		const filteredList = collateralTokens.filter(
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
			<div
				className="fixed top-0 left-0 z-0 min-h-screen w-full cursor-pointer bg-black bg-opacity-50"
				onClick={() => setCollateralDropdownOpen(false)}
			></div>
			<div className="z-20 flex w-[30rem] flex-col gap-4 rounded-xl bg-gray-800 p-4 text-white">
				<div className=" flex w-full flex-row items-center justify-between">
					<div>Select Token</div>
					<div className="cursor-pointer text-2xl" onClick={() => setCollateralDropdownOpen(false)}>
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
							onClick={() => {
								setCollateralAsset(token);
								setCollateralDropdownOpen(false);
							}}
						>
							<div className="flex w-full flex-row items-center justify-start  gap-3">
								<CurrencyIcon symbol={token.symbol} overrides={[token.logoURI || '']} className="h-10 w-10" />
								<div className=" w-1/2">
									<div>{token.symbol}</div>
									<div>{token.name}</div>
								</div>
							</div>
							<div className=" text-right text-gray-400">{balances[i]}</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default CollateralAssetModal;
