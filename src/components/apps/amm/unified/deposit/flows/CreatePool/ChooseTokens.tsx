import { Dialog, Transition } from '@headlessui/react';
import { TokenInfo } from '@uniswap/token-lists';
import SymbolCurrencyIcon from 'components/CurrencyIcon/SymbolCurrencyIcon';
import DefaultError from 'components/UI/Errors/DefaultError';
import PoolCreationTokenModal from 'components/UI/Modals/PoolCreationTokenModal';
import { useWeb3 } from 'hooks/useWeb3';
import React, { Fragment, useEffect, useState } from 'react';
import { BsTrash, BsTrashFill } from 'react-icons/bs';
import { RiArrowDownSLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { PoolType, setPoolType, setTokens, setWeights } from 'state/reducers/createPool';
import { selectAllTokensByChainId } from 'state/reducers/lists';

export interface ChooseTokensProps {
	setStep: (step: number) => void;
	selectedTokens: TokenInfo[];
	weights: number[];
}

const poolTypes: PoolType[] = [PoolType.WEIGHTED, PoolType.ORACLE_WEIGHTED, PoolType.STABLE];

const ChooseTokens: React.FC<ChooseTokensProps> = ({ setStep, selectedTokens, weights }) => {
	const dispatch = useDispatch();

	const [poolType, setPoolTypeState] = useState(poolTypes[0]);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [activeToken, setActiveToken] = useState(0);
	const [error, setError] = useState('');
	const [tokenWeights, setTokenWeights] = useState(weights);

	const { chainId } = useWeb3();
	const TOKENS = useSelector(selectAllTokensByChainId(chainId));

	const addNewTokenHandler = () => {
		if (selectedTokens.length === 8) {
			setError('Cannot add more tokens');
			return;
		}
		setActiveToken(selectedTokens.length);
		setModalIsOpen(true);
	};

	const setTokenHandler = (token: TokenInfo) => {
		setError('');
		const newTokens = [...selectedTokens];

		if (activeToken === selectedTokens.length) {
			newTokens.push(token);
			const newWeights = newTokens.map(() => Math.round(100 / newTokens.length));
			dispatch(setTokens(newTokens));
			setTokenWeights(newWeights);
			return;
		}

		newTokens[activeToken] = token;
		dispatch(setTokens(newTokens));
		setError('');
	};

	useEffect(() => {
		if (selectedTokens.length >= TOKENS.length) {
			const newWeights = TOKENS.map(() => Math.round(100 / TOKENS.length));
			dispatch(setTokens(TOKENS));
			setTokenWeights(newWeights);
		} else {
			const newTokens = selectedTokens.map((_, i) => TOKENS[i]);
			dispatch(setTokens(newTokens));
		}
	}, [chainId]);

	const removeTokenHandler = (tokenIndex: number) => {
		if (selectedTokens.length === 2) {
			setError('You need at least 2 tokens in the pool!');
			return;
		}

		const newTokens = [...selectedTokens];
		newTokens.splice(tokenIndex, 1);

		const newWeights = newTokens.map(() => 100 / newTokens.length);

		dispatch(setTokens([...newTokens]));
		setTokenWeights([...newWeights]);
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
		setTokenWeights(newWeights);
		setError('');
	};

	const poolTypeChangeHandler = (type: PoolType) => {
		if (type === PoolType.ORACLE_WEIGHTED) {
			const newTokenArr = [...selectedTokens];
			setTokenWeights([50, 50]);
			dispatch(setTokens(newTokenArr.splice(0, 2)));
		}
		setPoolTypeState(type);
		setError('');
	};

	const confirmTokensHandler = () => {
		const weightSum = tokenWeights.reduce((acc, w) => (acc += w));

		if (weightSum !== 100) {
			setError('Weights must sum up to exeactly 100%');
			return;
		}

		dispatch(setWeights(tokenWeights));
		dispatch(setPoolType(poolType));
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
			<div className="flex w-full cursor-pointer flex-row items-center">
				{poolTypes.map((type, i) => (
					<div
						className={`flex h-12 w-1/3 transform-gpu flex-row flex-wrap items-center justify-center p-1 text-center text-sm duration-100 md:text-base  ${
							i === 0 ? 'rounded-l-xl' : ''
						} ${i === 2 ? 'rounded-r-xl' : ''} ${poolType === type ? 'bg-darks-300' : 'bg-darks-500 hover:bg-darks-400'}`}
						onClick={() => poolTypeChangeHandler(type)}
					>
						{type} pool
					</div>
				))}
			</div>
			<div
				className={` flex w-full flex-row items-center justify-between pl-[15%] ${
					poolType === 'oracle' ? 'pr-[7.5%]' : 'pr-[16.5%]'
				} 2xl:pl-[12.5%]`}
			>
				<div>Token</div>
				{poolType !== 'stable' && <div>Weight (%)</div>}
			</div>
			<div className="flex w-full flex-col gap-4 rounded-xl bg-darks-500 p-2 sm:p-4">
				{error !== '' && <DefaultError message={error} />}
				{selectedTokens.map((token, i) => (
					<div className="flex w-full flex-row items-center justify-between" key={token.symbol}>
						<div
							className="flex w-1/2 transform-gpu cursor-pointer flex-row items-center justify-between gap-1 rounded-xl bg-darks-400 py-2 px-2 duration-100 hover:bg-darks-300 sm:gap-2 md:w-2/5 2xl:w-1/3"
							onClick={() => {
								setActiveToken(i);
								setModalIsOpen(true);
							}}
						>
							<div className="sm:text-md flex flex-row items-center gap-1 text-sm sm:gap-2">
								<div>
									<SymbolCurrencyIcon symbol={token.symbol} className="h-8 w-8" />
								</div>
								<div>{token.symbol}</div>
							</div>
							<div>
								<RiArrowDownSLine className=" text-lg sm:text-xl" />
							</div>
						</div>
						<div className="flex w-3/5 flex-row items-center justify-end gap-1 sm:gap-5">
							{poolType !== 'stable' && (
								<input
									type="number"
									step={1}
									placeholder={`${tokenWeights[i]}%`}
									value={tokenWeights[i] ? tokenWeights[i] : undefined}
									onChange={(e) => setTokenWeight(Number(e.target.value), i)}
									className="w-3/4 border-b-2 border-darks-300 bg-transparent text-center text-lg text-white outline-none md:w-1/2"
								/>
							)}
							{poolType !== 'oracle' && (
								<div className="group w-fit cursor-pointer text-xl text-red-600" onClick={() => removeTokenHandler(i)}>
									<div className="block group-hover:hidden">
										<BsTrash />
									</div>
									<div className="hidden group-hover:block">
										<BsTrashFill />
									</div>
								</div>
							)}
						</div>
					</div>
				))}
				{poolType !== 'oracle' && (
					<button
						className="btn w-full border-2 border-lights-400 bg-transparent bg-opacity-100 p-0 text-lg text-lights-400 hover:bg-lights-400 hover:text-black"
						onClick={addNewTokenHandler}
					>
						Add token +
					</button>
				)}
				{poolType !== 'stable' && (
					<div className=" flex flex-row items-start gap-2 rounded-xl bg-gray-600 bg-opacity-50 p-2 text-gray-200">
						<div className="font-sans text-2xl">&#x24D8;</div>
						<div className="pt-1">
							Please set the weights manually, so they add up to a 100% and aren't decimal numbers, otherwise the creation of your pool
							might fail.
						</div>
					</div>
				)}
			</div>
			<button className="btn w-full bg-lights-400 bg-opacity-100 p-0 text-lg text-black hover:bg-lights-300" onClick={confirmTokensHandler}>
				Confirm Tokens
			</button>
		</>
	);
};

export default ChooseTokens;
