import { ROOT_WITH_PROTOCOL } from 'constants/links';
import { SwapLayout } from 'layouts/SwapLayout';
import { NextSeo } from 'next-seo';
import React from 'react';

import { ExtendedNextPage } from 'types/ExtendedNextPage';

const GaugesPage: ExtendedNextPage = () => {
	return (
		<>
			<NextSeo
				title="Gauges"
				canonical={`${ROOT_WITH_PROTOCOL}/kyo/gauges`}
				description="Deposit your assets into the desired pools and get LP tokens that represent your position in the pools, to earn fees."
			/>
			<div className="relative flex min-h-screen w-full items-center justify-center bg-darks-500 px-8 pb-8 pt-24 md:px-0 lg:pt-20"></div>
		</>
	);
};

GaugesPage.Layout = SwapLayout('gauge-vote');
export default GaugesPage;
