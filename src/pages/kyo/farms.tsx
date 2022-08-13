import FarmCard, { Gauge } from 'components/apps/dao/gauges/cards/FarmCard';
import GuideLink from 'components/GuideLink';
import { ROOT_WITH_PROTOCOL } from 'constants/links';
import { GAUGES_SUBGRAPH_URL } from 'constants/subgraphs';
import { SwapLayout } from 'layouts/SwapLayout';
import { NextSeo } from 'next-seo';
import { useGetAllGaugesQuery } from 'query/generated/graphql-codegen-generated';
import React from 'react';
import { ExtendedNextPage } from 'types/ExtendedNextPage';

const FarmsPage: ExtendedNextPage = () => {
	const { data: allGaugesQueryData } = useGetAllGaugesQuery({
		endpoint: GAUGES_SUBGRAPH_URL
	});

	const gaugeList: Gauge[] = (allGaugesQueryData?.allGauges || []) //
		.map((gauge) => ({
			address: gauge.address,
			name: gauge.symbol.replace('-gauge', ''),
			killed: gauge.killed,
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
					<div className="w-full md:w-3/4 lg:w-1/2">
						<div className="w-full font-normal md:text-xl md:font-semibold">
							Stake your LP tokens into desired gauges to earn and claim emissions.
						</div>
						<div className="mt-5 w-full text-lg font-normal duration-100 md:text-2xl md:font-semibold ">
							<a
								href="https://info.koyo.finance/#/gauges"
								target="_blank"
								className="transform-gpu text-lights-400 underline hover:text-lights-300"
								rel="noreferrer"
							>
								More info about the gauges on Kōyō Finance
							</a>
						</div>
					</div>
				</div>
				<div className="flex w-full flex-row flex-wrap items-start justify-center gap-4">
					{gaugeList.map((gauge) => (
						<FarmCard gauge={gauge} key={gauge.address} />
					))}
				</div>
			</div>
			<GuideLink type="Gauges" text="Trouble depositing into gauges?" link="https://docs.koyo.finance/protocol/guide/KYO/farms" />
		</>
	);
};

FarmsPage.Layout = SwapLayout('gauge-vote');
export default FarmsPage;
