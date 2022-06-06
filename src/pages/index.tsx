import Footer from 'components/Footer';
import InfoCard from 'components/UI/Cards/HomePage/InfoCard';
import { generateSitemap } from 'core/sitemap';
import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import path from 'path';
import React, { useEffect, useState } from 'react';
import { fetch, FetchResultTypes } from '@sapphire/fetch';
import { DefiLlamaProtocol } from 'types/DefiLlama';
import useSWRImmutable from 'swr/immutable';
import { formatAmount, formatBalance, formatDollarAmount, fromBigNumber } from '@koyofinance/core-sdk';
import useTokenBalance from 'hooks/contracts/useTokenBalance';
import { kyoContract, votingEscrowContract } from 'core/contracts';

function fetcher<T = unknown>(url: string) {
	return fetch<T>(url, 'json' as FetchResultTypes.JSON);
}

const IndexPage: NextPage = () => {
	const [activeTitleWord, setActiveTitleWord] = useState(0);

	const { data: kyoLocked = 0 } = useTokenBalance(votingEscrowContract.address, kyoContract.address);

	useEffect(() => {
		setTimeout(() => {
			if (activeTitleWord === 2) {
				setActiveTitleWord(0);
				return;
			}
			setActiveTitleWord(activeTitleWord + 1);
		}, 2000);
	}, [activeTitleWord]);

	const deviceWidth = window.visualViewport.width;

	const { data: tvlData } = useSWRImmutable('https://api.llama.fi/protocol/koyo-finance', (url: string) => fetcher<DefiLlamaProtocol>(url), {});

	return (
		<div
			className={`${
				deviceWidth > 1024 ? 'leaves-animation-desktop' : 'leaves-animation-mobile'
			} min-h-screen w-full bg-darks-500 bg-leaves bg-contain bg-repeat`}
		>
			<div className=" mt-6 flex min-h-screen w-full flex-col items-center bg-contain bg-no-repeat px-[7.5vw] pt-[10vh] lg:bg-trees xl:px-20 2xl:mt-2 2xl:gap-1 3xl:bg-cover">
				<div className="lg:3/5 justify-cente flex  w-full flex-col items-center gap-4 rounded-[50%] bg-title-gradient text-white lg:gap-10 lg:px-36 xl:py-20 2xl:w-1/2">
					<div className=" flex flex-col items-center justify-center gap-4 text-center text-6xl font-bold transition-all duration-300 xl:text-7xl 2xl:text-8xl">
						<div className={`transform-gpu duration-500 ${activeTitleWord === 0 ? ' text-lights-400' : ''}`}>SWAP.</div>
						<div className={`transform-gpu duration-500 ${activeTitleWord === 1 ? ' text-lights-400' : ''}`}>DEPOSIT.</div>
						<div className={`transform-gpu duration-500 ${activeTitleWord === 2 ? ' text-lights-400' : ''}`}>EARN.</div>
					</div>
					<div className="w-full text-center text-xl">
						Kōyō Finance allows you to <b>swap</b> your tokens, <b>deposit</b> your assets in pools and <b>earn</b> fees.
					</div>
					<Link href="/swap">
						<button className=" btn transform-gpu border-0 bg-lights-400 px-10 text-black outline-none duration-100 hover:bg-lights-300 active:bg-lights-200">
							Launch App
						</button>
					</Link>
				</div>
				<div className="mt-12 flex w-full flex-row flex-wrap justify-evenly gap-10 lg:mt-2">
					<InfoCard
						data="TOTAL LIQUIDITY"
						value={formatDollarAmount((tvlData?.currentChainTvls?.Boba || 0) + (tvlData?.currentChainTvls?.Treasury || 0))}
					/>
					<InfoCard data="MOST ACTIVE POOL" value="4pool" />
					<InfoCard data="KŌYŌ PRICE" value="?" />
				</div>
				<div className="mt-10 flex w-full flex-row items-center justify-center">
					<InfoCard data="KŌYŌ LOCKED" value={formatAmount(fromBigNumber(kyoLocked))} />
				</div>
			</div>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img src="/assets/wallpappers/lying-leaves.svg" alt="leaves on the ground" className=" mt-10 w-full" />
			<Footer />
		</div>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const directory = path.join(process.cwd(), 'src');

	await generateSitemap(directory);

	return { props: {} };
};

export default IndexPage;
