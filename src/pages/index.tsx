import CallToAction from 'components/apps/_/Home/CallToAction';
import HomeCardsRows from 'components/apps/_/Home/cards/rows/HomeCardsRows';
import Header from 'components/apps/_/Home/Header';
import { generateSitemap } from 'core/sitemap';
import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import path from 'path';
import React from 'react';
import { ExtendedNextPage } from 'types/ExtendedNextPage';

const GroundLeafs = dynamic(() => import('components/apps/_/Home/GroundLeafs'));
const Footer = dynamic(() => import('components/Footer'));

const IndexPage: ExtendedNextPage = () => {
	const deviceWidth = window.visualViewport.width;

	return (
		<div
			className={`${
				deviceWidth > 1024 ? 'leaves-animation-desktop' : 'leaves-animation-mobile'
			} min-h-screen w-full bg-darks-500 bg-leaves bg-contain bg-repeat`}
		>
			<div className=" mt-6 flex min-h-screen w-full flex-col items-center bg-contain bg-no-repeat px-[7.5vw] pt-[10vh] lg:bg-trees xl:px-20 2xl:mt-2 2xl:gap-1 2xl:bg-cover">
				<div className="mb-10 flex w-full flex-col items-center justify-center gap-4 rounded-[50%] bg-title-gradient text-white lg:w-3/5 lg:gap-10 lg:px-36 xl:mb-0 xl:py-20 2xl:w-1/2">
					<Header />
					<div className="w-full text-center text-xl">
						Kōyō Finance allows you to <b>swap</b> your tokens, <b>deposit</b> your assets in pools and <b>earn</b> fees.
					</div>
					<CallToAction />
				</div>
				<HomeCardsRows />
			</div>
			<GroundLeafs />
			<Footer />
		</div>
	);
};
IndexPage.intercom = false;

export const getStaticProps: GetStaticProps = async () => {
	const directory = path.join(process.cwd(), 'src');

	await generateSitemap(directory);

	return { props: {} };
};

export default IndexPage;
