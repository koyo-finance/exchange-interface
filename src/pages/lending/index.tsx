import { ChainId } from '@koyofinance/core-sdk';
import Borrow from 'components/apps/lending/Borrow';
import Lend from 'components/apps/lending/Lend';
import { ROOT_WITH_PROTOCOL } from 'constants/links';
import { SwapLayout } from 'layouts/SwapLayout';
import { NextSeo } from 'next-seo';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllTokensByChainId } from 'state/reducers/lists';
import { ExtendedNextPage } from 'types/ExtendedNextPage';

const LendingPage: ExtendedNextPage = () => {
	const tokens = useSelector(selectAllTokensByChainId(ChainId.BOBA));

	return (
		<>
			<NextSeo
				title="Lending"
				canonical={`${ROOT_WITH_PROTOCOL}/lending`}
				description="Deposit your LP tokens to desired gauges and earn rewards."
			/>
			<div className=" flex min-h-screen w-full flex-col items-center gap-[5vh] bg-darks-500 px-4 pb-8 pt-24 md:px-0 lg:pt-20 ">
				<div className="m-5 flex w-full flex-row items-center justify-center">
					<div>
						<img src="/assets/icons/tokens-left.svg" alt="tokens" />
					</div>
					<div className="mt-8 flex w-1/2 flex-col items-center justify-center gap-8 text-center text-white">
						<h1 className=" text-4xl font-bold md:text-5xl">Kōyō Lending</h1>
						<div className="w-full font-normal md:w-3/4 md:text-xl md:font-semibold lg:w-1/2">
							Lend & borrow, to open yourself new financial opportunities for your DeFi assets.
						</div>
					</div>
					<div>
						<img src="/assets/icons/tokens-right.svg" alt="tokens" />
					</div>
				</div>
				<div className="flex w-full flex-row justify-items-center gap-6 px-16">
					<Lend tokens={tokens} />
					<Borrow tokens={tokens} />
				</div>
			</div>
		</>
	);
};

LendingPage.Layout = SwapLayout('lending');
export default LendingPage;
