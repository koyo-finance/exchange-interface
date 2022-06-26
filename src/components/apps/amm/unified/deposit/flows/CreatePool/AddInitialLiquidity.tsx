import { formatBalance, toBigNumber } from '@koyofinance/core-sdk';
import SymbolCurrencyIcon from 'components/CurrencyIcon/SymbolCurrencyIcon';
import { BigNumber } from 'ethers';
import useMultiTokenBalances from 'hooks/contracts/useMultiTokenBalances';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTokens, setInitialLiquidity } from 'state/reducers/createPool';
import { useAccount } from 'wagmi';

export interface AddInitialLiquidityProps {
	setStep: (step: number) => void;
}

const AddInitialLiquidity: React.FC<AddInitialLiquidityProps> = ({ setStep }) => {
	const chosenTokens = useSelector(selectTokens);
	const dispatch = useDispatch();

	const { data: account } = useAccount();
	const accountAddress = account?.address;

	const inputAmountRef = useRef<HTMLInputElement>(null);

	const [inputAmounts, setInputAmounts] = useState<number[]>([]);

	const tokensBalance = useMultiTokenBalances(
		accountAddress,
		chosenTokens.map((fToken) => fToken.address)
	);

	const balances = chosenTokens.map((token, i) => {
		return formatBalance(tokensBalance[i].data || BigNumber.from(0), undefined, token.decimals);
	});

	const tokenAmountChangeHandler = (tokenIndex: number) => {
		const inputAmount = inputAmountRef.current ? Number(inputAmountRef.current?.value) : 0;

		const newAmountsArr = [...inputAmounts];
		newAmountsArr[tokenIndex] = inputAmount;
		setInputAmounts(newAmountsArr);
	};

	const setMaxTokenAmount = (tokenIndex: number) => {
		const maxAmount = Number(balances[tokenIndex]);
		const flooredAmount = Math.floor(maxAmount * 1000000) / 1000000;

		const newAmountsArr = [...inputAmounts];
		newAmountsArr[tokenIndex] = flooredAmount;
		setInputAmounts(newAmountsArr);
	};

	const confirmLiquidity = () => {
		const transformedAmounts = inputAmounts.map((amount, i) => toBigNumber(amount, chosenTokens[i].decimals));
		dispatch(setInitialLiquidity(transformedAmounts));
		setStep(4);
	};

	return (
		<div>
			<div className="flex w-full flex-col gap-2 rounded-xl bg-darks-500 p-2 sm:gap-4 sm:p-4">
				{chosenTokens.map((token, i) => (
					<div className=" flex w-full flex-row items-center justify-between " key={token.symbol}>
						<div className="flex w-2/5 transform-gpu cursor-pointer flex-row items-center justify-between gap-2 rounded-xl bg-darks-400 py-2 px-2 duration-100 hover:bg-darks-300 sm:w-1/3 lg:w-1/4">
							<div className="flex flex-row items-center gap-2">
								<div>
									<SymbolCurrencyIcon symbol={token.symbol} className="h-8 w-8" />
								</div>
								<div>{token.symbol}</div>
							</div>
						</div>
						<div className="flex w-3/5 flex-col items-end justify-end gap-1">
							<div className="flex w-full flex-row">
								<input
									ref={inputAmountRef}
									type="number"
									name={token.name}
									max={1000000}
									onChange={() => tokenAmountChangeHandler(i)}
									placeholder={'0,00'}
									value={inputAmounts[i] || undefined}
									onBlur={() => tokenAmountChangeHandler(i)}
									className="w-2/3 border-b-2 border-darks-400 bg-darks-500 font-jtm text-2xl font-extralight text-white outline-none sm:w-4/5 md:text-4xl"
								/>
								<button
									type="button"
									onClick={() => setMaxTokenAmount(i)}
									className="mb-1 transform-gpu cursor-pointer rounded-xl border-2 border-lights-400 p-1 text-lights-400 duration-100 hover:bg-lights-400 hover:text-black"
								>
									MAX
								</button>
							</div>
							<div className="w-full pr-2 text-right text-sm">Balance: {balances[i]}</div>
						</div>
					</div>
				))}
			</div>
			<button className="btn mt-2 w-full bg-lights-400 bg-opacity-100 p-0 text-black hover:bg-lights-400" onClick={confirmLiquidity}>
				Add Initial liquidity
			</button>
		</div>
	);
};

export default AddInitialLiquidity;
