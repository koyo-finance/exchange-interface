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
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const SwapIndexPage: ExtendedNextPage = () => {
	const { data: account } = useAccount();
	console.log(account);

	return (
		<div className=" flex h-screen w-full items-center justify-center">
			<SwapLayoutCard>
				<div className="flex w-full flex-row items-center justify-between text-lg font-semibold text-white">
					<div>Swap</div>
					<div>
						<BsFillGearFill />
					</div>
				</div>
				<SwapCard swapType="from" />
				<div className=" flex h-6 w-full cursor-pointer items-center justify-center text-3xl text-white">
					<IoSwapVertical />
				</div>
				<SwapCard swapType="to" />
				{account && <button className="btn mt-2 w-full bg-lights-400 text-black hover:bg-lights-200">SWAP</button>}
				{!account && (
					<div className="mt-2 flex w-full items-center justify-center">
						<ConnectButton />
					</div>
				)}
			</SwapLayoutCard>
		</div>
	);
};

SwapIndexPage.Layout = SwapLayout('swap');
export default SwapIndexPage;
