import FallbackCurrencyIcon from 'components/FallbackCurrencyIcon';
import React, { useEffect, useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch } from 'state/hooks';
import { fetchTokenLists, selectFetchedLists, setSelectedLists } from 'state/reducers/lists';

export interface ChooseTokenListsModalProps {
	setTokenListsModal: (state: boolean) => void;
}

const ChooseTokenListsModal: React.FC<ChooseTokenListsModalProps> = ({ setTokenListsModal }) => {
	const dispatch = useDispatch();
	const appDispatch = useAppDispatch();

	const fetchedTokenLists = useSelector(selectFetchedLists());
	const [tokenLists, setTokenLists] = useState(fetchedTokenLists);
	const [tokenListInput, setTokenListInput] = useState<string>('');

	useEffect(() => {
		const seen: string[] = [];
		const filteredTokenLists = fetchedTokenLists.filter((list) => {
			return seen.includes(list.name) ? false : seen.push(list.name);
		});
		setTokenLists(filteredTokenLists);
	}, [fetchedTokenLists]);

	const tokenListInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTokenListInput(e.target.value);
	};

	const addTokenListHander = () => {
		if (tokenListInput === '') return;
		dispatch(setSelectedLists(tokenListInput || ''));
		appDispatch(fetchTokenLists());
		if (tokenListInput) setTokenListInput('');
	};

	return (
		<>
			<div
				className="mt-1 flex w-fit transform-gpu cursor-pointer flex-row items-center gap-1 text-lights-400 duration-100 hover:translate-x-1 hover:text-lights-300"
				onClick={() => setTokenListsModal(false)}
			>
				<BsArrowLeft className=" text-xl font-bold" />
				<div>Back to token selection</div>
			</div>
			<div className="flex max-h-[35rem] w-full flex-col overflow-y-scroll">
				{tokenLists.map((list, i) => (
					<div key={i} id={list.name} className="flex w-full  cursor-pointer flex-row items-center justify-between gap-2 p-2">
						<FallbackCurrencyIcon srcs={[list.logoURI || '']} className="h-10 w-10 rounded-[50%]" />
						<div className="flex w-full flex-row items-center justify-start  gap-3">{list.name}</div>
					</div>
				))}
			</div>
			<div className="flex w-full flex-row gap-2 px-2">
				<input
					className="w-2/3 border-b-2 border-darks-200 bg-transparent text-base font-extralight text-white outline-none md:text-lg"
					type="text"
					placeholder="https://koyo.finance/tokens"
					value={tokenListInput}
					onChange={tokenListInputChangeHandler}
				/>
				<button
					type="button"
					className="btn w-1/3 border-2 border-lights-400 bg-transparent bg-opacity-100 p-0 text-lg text-lights-400 hover:bg-lights-400 hover:text-black"
					onClick={addTokenListHander}
				>
					ADD LIST +
				</button>
			</div>
		</>
	);
};

export default ChooseTokenListsModal;
