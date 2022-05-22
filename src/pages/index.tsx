import { generateSitemap } from 'core/sitemap';
import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import path from 'path';
import React from 'react';

const IndexPage: NextPage = () => {
	return (
		<>
			<div className="flex h-screen w-full flex-col items-center justify-center gap-6">
				<div className=" px-4 text-center text-xl text-gray-300">
					Hi my fellow traders. Welcome to Kōyō Finance, the first stable 4pool swapping system on Boba Network.
					<br />
					Enjoy swapping and depositing in our stable 4pool between DAI, FRAX, USDC and USDT.
				</div>
				<Link href="/swap">
					<button className=" btn transform-gpu bg-lights-400 text-black duration-100 hover:bg-lights-300 active:bg-lights-200">
						Launch App
					</button>
				</Link>
			</div>
		</>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const directory = path.join(process.cwd(), 'src');

	await generateSitemap(directory);

	return { props: {} };
};

export default IndexPage;
