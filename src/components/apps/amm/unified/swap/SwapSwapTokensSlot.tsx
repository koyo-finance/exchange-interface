import React from 'react';
import { IoSwapVertical } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'state/hooks';
import { selectTokenOne, selectTokenTwo, setTokenOne, setTokenTwo } from 'state/reducers/selectedTokens';

const SwapSwapTokensSlot: React.FC = () => {
	const dispatch = useAppDispatch();

	const tokenOne = useSelector(selectTokenOne);
	const tokenTwo = useSelector(selectTokenTwo);

	const swapTokensHandler = () => {
		dispatch(setTokenOne(tokenTwo));
		dispatch(setTokenTwo(tokenOne));
	};

	return (
		<div
			className=" mx-auto h-8 w-auto transform-gpu cursor-pointer text-3xl text-white duration-150 hover:text-lights-400"
			onClick={swapTokensHandler}
		>
			<IoSwapVertical />
		</div>
	);
};

export default SwapSwapTokensSlot;
