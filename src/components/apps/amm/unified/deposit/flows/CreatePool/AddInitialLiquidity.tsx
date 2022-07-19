import { formatBalance, toBigNumber } from '@koyofinance/core-sdk';
import SymbolCurrencyIcon from 'components/CurrencyIcon/CurrencyIcon';
import { BigNumber } from 'ethers';
import useMultiTokenBalances from 'hooks/generic/useMultiTokenBalances';
import { useWeb3 } from 'hooks/useWeb3';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTokens, setInitialLiquidity } from 'state/reducers/createPool';
import StepBackCard from '../../cards/StepBackCard';

export interface AddInitialLiquidityProps {
	setStep: (step: number) => void;
}

const AddInitialLiquidity: React.FC<AddInitialLiquidityProps> = ({ setStep }) => {
	const dispatch = useDispatch();
	const { accountAddress } = useWeb3();

	const chosenTokens = useSelector(selectTokens);
	const [inputAmounts, setInputAmounts] = useState<number[]>(chosenTokens.map(() => 0));

	const tokensBalance = useMultiTokenBalances(
		accountAddress,
		chosenTokens.map((fToken) => fToken.address)
	);

	const balances = chosenTokens.map((token, i) => {
		return formatBalance(tokensBalance[i].data || BigNumber.from(0), undefined, token.decimals);
	});

	const tokenAmountChangeHandler = (tokenIndex: number, input: string) => {
		const inputAmount = Number(input);

		const newAmountsArr = [...inputAmounts];
		newAmountsArr[tokenIndex] = inputAmount;
		setInputAmounts(newAmountsArr);
	};

	const setMaxTokenAmount = (tokenIndex: number) => {
		const maxAmount = Number(balances[tokenIndex]);
		const flooredAmount = Math.floor(maxAmount * 10000) / 10000;

		const newAmountsArr = [...inputAmounts];
		newAmountsArr[tokenIndex] = flooredAmount;
		setInputAmounts([...newAmountsArr]);
	};

	const confirmLiquidity = () => {
		const transformedAmounts = inputAmounts.map((amount, i) => toBigNumber(amount, chosenTokens[i].decimals));
		dispatch(setInitialLiquidity(transformedAmounts));
		setStep(4);
	};

	return (
		<>
			<StepBackCard setStep={setStep} step={2} previousStep="pool fees" />
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
						<div className="flex w-1/2 flex-col justify-end gap-1">
							<div className="flex w-full flex-row">
								<input
									type="number"
									name={token.name}
									max={1000000}
									onChange={(e) => tokenAmountChangeHandler(i, e.target.value)}
									placeholder={'0,00'}
									value={inputAmounts[i] || undefined}
									onBlur={(e) => tokenAmountChangeHandler(i, e.target.value)}
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
			<button className="btn mt-2 w-full bg-lights-400 bg-opacity-100 p-0 text-black hover:bg-lights-300" onClick={confirmLiquidity}>
				Add Initial liquidity
			</button>
		</>
	);
};

export default AddInitialLiquidity;
