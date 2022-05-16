import FormApproveAsset from 'components/Pools/StableSwap/FormApproveAsset';
import { BigNumber } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';
import { Form, Formik } from 'formik';
import { SwapLayout, SwapLayoutCard } from 'layouts/SwapLayout';
import { NextPage } from 'next';
import React from 'react';
import { Case, Default, Switch } from 'react-if';
import { ExtendedNextPage } from 'types/ExtendedNextPage';
import { BsFillGearFill } from 'react-icons/bs';
import { IoSwapVertical } from 'react-icons/io5';
import SwapCard from 'components/UI/Cards/SwapCard';

const SwapIndexPage: NextPage = () => {
	return (
		<div className=" flex h-full w-full items-center justify-center">
			<div className="flex w-1/3 transform-gpu animate-fade-in flex-col gap-2  rounded-xl bg-black bg-opacity-50 py-4 px-6">
				<div className="flex w-full flex-row items-center justify-between text-lg font-semibold text-white">
					<div>Swap</div>
					<div>
						<BsFillGearFill />
					</div>
				</div>
				<SwapCard swapType="from" />
				<div className=" flex w-full cursor-pointer items-center justify-center text-3xl text-white">
					<IoSwapVertical />
				</div>
				<SwapCard swapType="to" />
				<button className="btn mt-2 w-full bg-lights-400 text-black">SWAP</button>
			</div>
		</div>
	);
};

export default SwapIndexPage;
