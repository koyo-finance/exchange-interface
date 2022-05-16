import { generateSitemap } from 'core/sitemap';
import { GetStaticProps, NextPage } from 'next';
import path from 'path';
import React from 'react';

const IndexPage: NextPage = () => {
	return (
		<>
			<div className="flex h-screen w-full items-center justify-center">Hi</div>
		</>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const directory = path.join(process.cwd(), 'src');

	await generateSitemap(directory);

	return { props: {} };
};

export default IndexPage;
