import CallToAction from 'components/apps/_/Home/CallToAction';
import HomeCardsRows from 'components/apps/_/Home/cards/rows';
import GroundLeafs from 'components/apps/_/Home/GroundLeafs';
import Header from 'components/apps/_/Home/Header';
import Footer from 'components/Footer';
import { generateSitemap } from 'core/sitemap';
import { GetStaticProps, NextPage } from 'next';
import path from 'path';
import React from 'react';

const IndexPage: NextPage = () => {
	const deviceWidth = window.visualViewport.width;

	// const sor = jpex.resolve<SOR>();
	// console.log(sor);

	// useEffect(() => {
	// 	void sor.fetchPools().then(() => {
	// 		void sor
	// 			.getSwaps(
	// 				'0x7562F525106F5d54E891e005867Bf489B5988CD9',
	// 				'0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000',
	// 				SwapTypes.SwapExactIn,
	// 				BigNumber.from(1).mul(10 ** 12),
	// 				{
	// 					maxPools: 4,
	// 					gasPrice: BigNumber.from('40000000000')
	// 				}
	// 			)
	// 			.then(console.log);
	// 	});
	// }, []);

	return (
		<div
			className={`${
				deviceWidth > 1024 ? 'leaves-animation-desktop' : 'leaves-animation-mobile'
			} min-h-screen w-full bg-darks-500 bg-leaves bg-contain bg-repeat`}
		>
			<div className=" mt-6 flex min-h-screen w-full flex-col items-center bg-contain bg-no-repeat px-[7.5vw] pt-[10vh] lg:bg-trees xl:px-20 2xl:mt-2 2xl:gap-1 3xl:bg-cover">
				<div className="flex w-full flex-col  items-center justify-center gap-4 rounded-[50%] bg-title-gradient text-white lg:w-3/5 lg:gap-10 lg:px-36 xl:py-20 2xl:w-1/2">
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

export const getStaticProps: GetStaticProps = async () => {
	const directory = path.join(process.cwd(), 'src');

	await generateSitemap(directory);

	return { props: {} };
};

export default IndexPage;
