import FarmCard, { Gauge } from 'components/UI/Cards/Farms/FarmCard';
import { ROOT_WITH_PROTOCOL } from 'constants/links';
import { EXCHANGE_SUBGRAPH_URL } from 'constants/subgraphs';
import { SwapLayout } from 'layouts/SwapLayout';
import { NextSeo } from 'next-seo';
import { useGetAllGaugesQuery } from 'query/generated/graphql-codegen-generated';
import React from 'react';
import { ExtendedNextPage } from 'types/ExtendedNextPage';

const FarmsPage: ExtendedNextPage = () => {
	const { data: allGaugesQueryData } = useGetAllGaugesQuery({
		endpoint: EXCHANGE_SUBGRAPH_URL
	});
	const gaugeList: Gauge[] = (allGaugesQueryData?.allGauges || []) //
		.map((gauge) => ({
			address: gauge.address,
			name: gauge.symbol.replace('-gauge', ''),
			pool: { id: gauge.pool?.id || '', address: gauge.pool?.address || '', name: gauge.pool?.name || '' }
		}));

	return (
		<>
			<NextSeo
				title="Farms"
				canonical={`${ROOT_WITH_PROTOCOL}/kyo/farms`}
				description="Deposit your LP tokens to desired gauges and earn rewards."
			/>
			<div className=" flex min-h-screen w-full flex-col items-center gap-[5vh] bg-darks-500 px-4 pb-8 pt-24 md:px-0 lg:pt-20 ">
				<div className="mt-8 flex w-full flex-col items-center justify-center gap-8 text-center text-white">
					<h1 className=" text-4xl font-bold md:text-5xl">Kōyō Farms</h1>
					<div className="w-full font-normal md:w-3/4 md:text-xl md:font-semibold lg:w-1/2">
						Stake your LP tokens into desired gauges to earn and claim emissions.
					</div>
				</div>
				<div className="flex w-full flex-row flex-wrap items-center justify-center gap-5">
					{gaugeList.map((gauge) => (
						<FarmCard gauge={gauge} key={gauge.address} />
					))}
				</div>
			</div>
		</>
	);
};

FarmsPage.Layout = SwapLayout('gauge-vote');
export default FarmsPage;
