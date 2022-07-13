import { formatAmount } from '@koyofinance/core-sdk';
import { TokenInfo } from '@uniswap/token-lists';
import SymbolCurrencyIcon from 'components/CurrencyIcon/SymbolCurrencyIcon';
import { AiOutlineCheck } from 'react-icons/ai';
import React from 'react';

export interface LendTokenCardProps {
	token: TokenInfo;
	balance: number;
}

const LendTokenCard: React.FC<LendTokenCardProps> = ({ token, balance }) => {
	return (
		<div className="flex w-full flex-row items-center justify-between">
			<div className="flex w-2/3 flex-row items-center justify-between gap-2">
				<div className="flex w-1/2 flex-row items-center gap-2">
					<SymbolCurrencyIcon symbol={token.symbol} className="h-8 w-8" />
					<div>{token.name}</div>
				</div>
				<div className="w-1/4 text-center">{formatAmount(balance, 4)}</div>
				<div className="flex w-1/4 justify-end pr-10 text-2xl text-green-600">
					<AiOutlineCheck />
				</div>
			</div>
			<div className="flex w-1/3 justify-end gap-4">
				<button className="text-md btn btn-sm border-0 bg-lights-400 px-8 text-black hover:bg-lights-200 lg:text-lg">Lend</button>
				<a
					href={`https://info.koyo.finance/#/tokens/${token.address}`}
					target="_blank"
					className="btn btn-sm border-2 border-lights-400 bg-transparent bg-opacity-100 p-0 px-4 text-lg text-lights-400 hover:bg-lights-400 hover:text-black"
				>
					Details
				</a>
			</div>
		</div>
	);
};

export default LendTokenCard;
