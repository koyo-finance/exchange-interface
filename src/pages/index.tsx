import Footer from 'components/Footer';
import KoyoPriceCard from 'components/Home/cards/KoyoPriceCard';
import KYOLockedCard from 'components/Home/cards/KYOLockedCard';
import MostActivePoolCard from 'components/Home/cards/MostActivePoolCard';
import TotalLiquidityCard from 'components/Home/cards/TotalLiquidityCard';
import Header from 'components/Home/Header';
import { generateSitemap } from 'core/sitemap';
import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import path from 'path';
import React from 'react';

const IndexPage: NextPage = () => {
	const deviceWidth = window.visualViewport.width;

	return (
		<div
			className={`${
				deviceWidth > 1024 ? 'leaves-animation-desktop' : 'leaves-animation-mobile'
			} min-h-screen w-full bg-darks-500 bg-leaves bg-contain bg-repeat`}
		>
			<div className=" mt-6 flex min-h-screen w-full flex-col items-center bg-contain bg-no-repeat px-[7.5vw] pt-[10vh] lg:bg-trees xl:px-20 2xl:mt-2 2xl:gap-1 3xl:bg-cover">
				<div className="lg:3/5 justify-cente flex  w-full flex-col items-center gap-4 rounded-[50%] bg-title-gradient text-white lg:gap-10 lg:px-36 xl:py-20 2xl:w-1/2">
					<Header />
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
					<TotalLiquidityCard />
					<MostActivePoolCard />
					<KoyoPriceCard />
				</div>
				<div className="mt-10 flex w-full flex-row items-center justify-center">
					<KYOLockedCard />
				</div>
			</div>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img src="/assets/wallpappers/lying-leaves.svg" alt="leaves on the ground" className="mt-10 w-full" />
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
