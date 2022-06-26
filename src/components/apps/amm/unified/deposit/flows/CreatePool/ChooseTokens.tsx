import { Dialog, Transition } from '@headlessui/react';
import { TokenInfo } from '@uniswap/token-lists';
import SymbolCurrencyIcon from 'components/CurrencyIcon/SymbolCurrencyIcon';
import DefaultError from 'components/UI/Errors/DefaultError';
import PoolCreationTokenModal from 'components/UI/Modals/PoolCreationTokenModal';
import React, { Fragment, useState } from 'react';
import { BsTrash, BsTrashFill } from 'react-icons/bs';
import { RiArrowDownSLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { setTokens, setWeights } from 'state/reducers/createPool';

export interface ChooseTokensProps {
	setStep: (step: number) => void;
	selectedTokens: TokenInfo[];
	weights: number[];
}

const ChooseTokens: React.FC<ChooseTokensProps> = ({ setStep, selectedTokens, weights }) => {
	const dispatch = useDispatch();

	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [activeToken, setActiveToken] = useState(0);
	const [error, setError] = useState('');
	const [tokenWeights, setTokenWeights] = useState(weights);

	const addNewTokenHandler = () => {
		setActiveToken(selectedTokens.length);
		setModalIsOpen(true);
	};

	const setTokenHandler = (token: TokenInfo) => {
		setError('');
		const newTokens = [...selectedTokens];

		if (activeToken === selectedTokens.length) {
			newTokens.push(token);
			const newWeights = newTokens.map(() => 100 / newTokens.length);
			dispatch(setTokens(newTokens));
			dispatch(setWeights(newWeights));
			setTokenWeights(newWeights);
			return;
		}

		newTokens[activeToken] = token;
		dispatch(setTokens(newTokens));
		setError('');
	};

	const removeTokenHandler = (tokenIndex: number) => {
		if (selectedTokens.length === 2) {
			setError('You need at least 2 tokens in the pool!');
			return;
		}

		const newTokens = [...selectedTokens];
		newTokens.splice(tokenIndex, 1);

		const newWeights = newTokens.map(() => 100 / newTokens.length);

		dispatch(setTokens(newTokens));
		dispatch(setWeights(newWeights));
		setTokenWeights(newWeights);
		setError('');
	};

	const setTokenWeight = (newWeight: number, weightIndex: number) => {
		const newWeights = [...tokenWeights];
		newWeights[weightIndex] = newWeight;
		const weightSum = newWeights.reduce((acc, w) => (acc += w));
		if (weightSum > 100) {
			setError('Weights must not be over 100%!');
			return;
		}
		dispatch(setWeights(newWeights));
		setTokenWeights(newWeights);
		setError('');
	};

	const confirmTokensHandler = () => {
		const weightSum = weights.reduce((acc, w) => (acc += w));
		if (weightSum !== 100) {
			setError('Weights must sum up to exeactly 100%');
			return;
		}

		setError('');
		setStep(2);
	};

	return (
		<>
			<Transition appear show={modalIsOpen} as={Fragment}>
				<Dialog as="div" className=" z-50" onClose={() => setModalIsOpen(false)}>
					<PoolCreationTokenModal chosenTokens={selectedTokens} setTokens={setTokenHandler} setModalIsOpen={setModalIsOpen} />
				</Dialog>
			</Transition>
			<div className="mt-2 flex w-full flex-row items-center justify-between pl-[15%] pr-[15%] 2xl:pl-[10%]">
				<div>Token</div>
				<div>Weight (%)</div>
			</div>
			<div className="flex w-full flex-col gap-4 rounded-xl bg-darks-500 p-2 sm:p-4">
				{error !== '' && <DefaultError message={error} />}
				{selectedTokens.map((token, i) => (
					<div className="flex w-full flex-row items-center justify-between" key={token.symbol}>
						<div
							className="flex w-1/2 transform-gpu cursor-pointer flex-row items-center justify-between gap-2 rounded-xl bg-darks-400 py-2 px-2 duration-100 hover:bg-darks-300 md:w-2/5 2xl:w-1/4"
							onClick={() => {
								setActiveToken(i);
								setModalIsOpen(true);
							}}
						>
							<div className="flex flex-row items-center gap-2">
								<div>
									<SymbolCurrencyIcon symbol={token.symbol} className="h-8 w-8" />
								</div>
								<div>{token.symbol}</div>
							</div>
							<div>
								<RiArrowDownSLine className="text-xl" />
							</div>
						</div>
						<div className="flex w-3/5 flex-row items-center justify-end gap-1 sm:gap-5">
							<input
								type="number"
								step={1}
								placeholder={`${tokenWeights[i]}%`}
								value={tokenWeights[i] ? tokenWeights[i] : undefined}
								onChange={(e) => setTokenWeight(Number(e.target.value), i)}
								className="w-3/4 border-b-2 border-darks-300 bg-transparent text-center text-white outline-none md:w-1/2"
							/>
							<div className="group w-fit cursor-pointer text-xl text-red-600" onClick={() => removeTokenHandler(i)}>
								<div className="block group-hover:hidden">
									<BsTrash />
								</div>
								<div className="hidden group-hover:block">
									<BsTrashFill />
								</div>
							</div>
						</div>
					</div>
				))}
				<button
					className="btn w-full border-2 border-lights-400 bg-transparent bg-opacity-100 p-0 text-lg text-lights-400 hover:bg-lights-400 hover:text-black"
					onClick={addNewTokenHandler}
				>
					Add token +
				</button>
			</div>
			<button className="btn w-full bg-lights-400 bg-opacity-100 p-0 text-lg text-black hover:bg-lights-300" onClick={confirmTokensHandler}>
				Confirm Tokens
			</button>
		</>
	);
};

export default ChooseTokens;
