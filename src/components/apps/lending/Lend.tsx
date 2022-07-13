import { fromBigNumber } from '@koyofinance/core-sdk';
import { TokenInfo } from '@uniswap/token-lists';
import useMultiTokenBalances from 'hooks/generic/useMultiTokenBalances';
import { useWeb3 } from 'hooks/useWeb3';
import React, { useState } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import LendTokenCard from './cards/LendTokenCard';

export interface LendProps {
	tokens: TokenInfo[];
}

const Lend: React.FC<LendProps> = ({ tokens }) => {
	const [lendIsHidden, setLendIsHidden] = useState(false);

	const { accountAddress } = useWeb3();

	const tokensBalance = useMultiTokenBalances(
		accountAddress,
		tokens.map((fToken) => fToken.address)
	);

	const balances = tokens.map((token, i) => {
		return fromBigNumber(tokensBalance[i].data || 0, token.decimals);
	});

	return (
		<div className="flex w-1/2 flex-col gap-6">
			<div
				key={'Your lendings'}
				className="flex w-full flex-col gap-4 rounded-xl border-2 border-lights-400 bg-black bg-opacity-50 p-4 text-base text-white  xl:text-xl"
			>
				<div className="w-full">Your lendings</div>
				<div>
					<div>Total balance: </div>
					<div>Total collateral</div>
					<div>Total APY:</div>
				</div>
			</div>
			<div
				key={'lend'}
				className="flex w-full flex-col gap-5 rounded-xl border-2 border-lights-400 bg-black bg-opacity-50 p-4 text-base text-white xl:text-xl"
			>
				<div className="flex w-full items-center justify-between">
					<div>Lend your assets</div>
					<button
						onClick={() => setLendIsHidden(!lendIsHidden)}
						className="flex transform-gpu flex-row items-center gap-1 text-lg text-white duration-100 hover:text-lights-400"
					>
						{lendIsHidden ? 'Show' : 'Hide'}{' '}
						<RiArrowDownSLine className={`transform-gpu text-xl font-bold duration-150 ${lendIsHidden ? '' : ' rotate-180'}`} />{' '}
					</button>
				</div>
				{!lendIsHidden && (
					<>
						<div className="flex w-2/3 flex-row justify-between">
							<div className="w-1/2 pl-[15%]">Token</div>
							<div className="w-1/4">Your balance</div>
							<div className="w-1/4 text-right">Collateral</div>
						</div>
						{tokens.map((token, i) => Number(balances[i]) > 0 && <LendTokenCard token={token} balance={balances[i]} />)}
					</>
				)}
			</div>
		</div>
	);
};

export default Lend;
