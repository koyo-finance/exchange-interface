import { Dialog, Transition } from '@headlessui/react';
import { TokenInfo } from '@uniswap/token-lists';
import SymbolCurrencyIcon from 'components/CurrencyIcon/SymbolCurrencyIcon';
import PoolCreationTokenModal from 'components/UI/Modals/PoolCreationTokenModal';
import React, { Fragment, useState } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';

export interface ChooseTokensProps {
	setStep: (step: number) => void;
	selectedTokens: TokenInfo[];
	setTokens: (tokens: TokenInfo[]) => void;
	weights: number[];
	setWeights: (weights: number[]) => void;
}

const ChooseTokens: React.FC<ChooseTokensProps> = ({ setStep, selectedTokens, setTokens }) => {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [activeToken, setActiveToken] = useState(0);

	return (
		<>
			<Transition appear show={modalIsOpen} as={Fragment}>
				<Dialog as="div" className=" z-50" onClose={() => setModalIsOpen(false)}>
					<PoolCreationTokenModal
						chosenTokens={selectedTokens}
						setTokens={setTokens}
						activeToken={activeToken}
						setModalIsOpen={setModalIsOpen}
					/>
				</Dialog>
			</Transition>
			<div className="flex w-full flex-row items-center justify-between pr-16">
				<div>Token</div>
				<div>Weight</div>
			</div>
			<div className="w-full bg-darks-500">
				{selectedTokens.map((token, i) => (
					<div
						className="flex w-1/3 transform-gpu cursor-pointer flex-row items-center justify-between gap-2 rounded-xl bg-darks-400 py-2 px-2 duration-100 hover:bg-darks-300"
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
				))}
				<div></div>
			</div>
			<button className="btn mt-2 w-full bg-lights-400 bg-opacity-100 p-0 text-lg text-black hover:bg-lights-400" onClick={() => setStep(2)}>
				Confirm Tokens
			</button>
		</>
	);
};

export default ChooseTokens;
