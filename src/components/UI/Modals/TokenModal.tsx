import React, { EventHandler } from 'react';
import { FaTimes } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { Token } from 'types/TokenObject';

export interface TokenModalProps {
	tokenNum: number;
	closeModal: () => void;
	setToken: (token: Token, tokenNum: number) => void;
}

const TokenModal: React.FC<TokenModalProps> = (props) => {
	// const TOKENS: Token[] = [
	// 	{
	// 		name: 'Wrapped Ethereum',
	// 		symbol: 'wETH',
	// 		icon: 'assets/icons/Ethereum.svg',
	// 		address: '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000'
	// 	},
	// 	{
	// 		name: 'Wrapped Bitcoin',
	// 		symbol: 'WBTC',
	// 		icon: 'assets/icons/BitcoinWrapped.svg',
	// 		address: '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000'
	// 	},
	// 	{
	// 		name: 'Curve',
	// 		symbol: 'CRV',
	// 		icon: 'assets/icons/Curve.svg',
	// 		address: '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000'
	// 	},
	// 	{
	// 		name: 'Polygon',
	// 		symbol: 'MATIC',
	// 		icon: 'assets/icons/Polygon.svg',
	// 		address: '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000'
	// 	},
	// 	{
	// 		name: 'Loopring',
	// 		symbol: 'LRC',
	// 		icon: 'assets/icons/Loopring.svg',
	// 		address: '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000'
	// 	},
	// 	{
	// 		name: 'Sushi',
	// 		symbol: 'SUSHI',
	// 		icon: 'assets/icons/SushiSwap.svg',
	// 		address: '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000'
	// 	}
	// ];

	const TOKENS = useSelector((state) => state?.tokenList.tokenList);

	const setTokenHandler = (e: any) => {
		// console.log(e.target.id);
		props.setToken(TOKENS[+e.target.id], props.tokenNum);
		props.closeModal();
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
						className="w-full rounded-xl border-2 border-darks-300 bg-transparent p-2 text-lg outline-none"
					/>
				</div>
				<div className="flex  max-h-[35rem] w-full flex-col overflow-y-scroll">
					{TOKENS.map((token, i) => (
						<div
							key={i}
							id={`${i}`}
							className=" flex w-full transform-gpu cursor-pointer flex-row items-center justify-start  gap-3 p-2 duration-150 hover:bg-gray-900"
							onClick={setTokenHandler}
						>
							<div>
								<img src={token.icon} className=" w-8" />
							</div>
							<div>
								<div>{token.symbol}</div>
								<div>{token.name}</div>
							</div>
						</div>
					))}
				</div>
				<div className=" flex w-full flex-row items-center justify-center gap-2 text-lights-400">
					<div>Manage token lists</div>
					<div>
						<FiEdit />
					</div>{' '}
				</div>
			</div>
		</div>
	);
};

export default TokenModal;
