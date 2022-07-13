import { TokenInfo } from '@uniswap/token-lists';
import React, { useState } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import BorrowTokenCard from './cards/BorrowTokenCard';

export interface BorrowProps {
	tokens: TokenInfo[];
}

const Borrow: React.FC<BorrowProps> = ({ tokens }) => {
	const [lendIsHidden, setLendIsHidden] = useState(false);

	return (
		<div className="flex w-1/2 flex-col gap-6">
			<div
				key={'Borrowings'}
				className="flex w-full flex-col gap-4 rounded-xl border-2 border-lights-400 bg-black bg-opacity-50 p-4 text-base text-white   xl:text-xl"
			>
				<div>Your borrowings</div>
				<div>
					<div>Total debt: </div>
					<div>Total debt: </div>
					<div>Total APY: </div>
					<div></div>
				</div>
			</div>
			<div
				key={'borrow'}
				className="flex w-full flex-col gap-4 rounded-xl border-2 border-lights-400 bg-black bg-opacity-50 p-4 text-base text-white   xl:text-xl"
			>
				<div className="flex w-full items-center justify-between">
					<div>Borrow assets</div>
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
						<div className="flex w-2/3 flex-row justify-around ">
							<div>Token</div>
							<div>Availible</div>
							<div>APY</div>
						</div>
						{tokens.map((token) => (
							<BorrowTokenCard token={token} />
						))}
					</>
				)}
			</div>
		</div>
	);
};

export default Borrow;
