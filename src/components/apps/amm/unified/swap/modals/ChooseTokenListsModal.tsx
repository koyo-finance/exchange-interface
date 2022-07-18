import { DEFAULT_TOKEN_LISTS } from 'config/token-lists';
import React from 'react';
import { BsArrowLeft } from 'react-icons/bs';

export interface ChooseTokenListsModalProps {
	setTokenListsModal: (state: boolean) => void;
}

const ChooseTokenListsModal: React.FC<ChooseTokenListsModalProps> = ({ setTokenListsModal }) => {
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
				{DEFAULT_TOKEN_LISTS.map((list, i) => (
					<div
						key={i}
						id={list}
						className="flex w-full transform-gpu cursor-pointer flex-row items-center justify-between p-2 duration-150 hover:bg-gray-900"
					>
						<div className="flex w-full flex-row items-center justify-start  gap-3">{list}</div>
					</div>
				))}
			</div>
		</>
	);
};

export default ChooseTokenListsModal;
