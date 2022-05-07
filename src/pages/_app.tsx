import { config } from '@fortawesome/fontawesome-svg-core';
import Footer from 'components/Footer/Footer';
import Navbar from 'components/Navbar/Navbar';
import PinnedComponents from 'components/PinnedComponents';
import { queryClient } from 'core/query';
import useInitWeb3Onboard from 'hooks/useInitWeb3Onboard';
import type { NextPage } from 'next';
import PlausibleProvider from 'next-plausible';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import 'styles/_App.css';
import DefaultSeoProps from '../DefaultSeoProps';

config.autoAddCss = false;

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
	useInitWeb3Onboard();

	return (
		<>
			<React.StrictMode>
				<QueryClientProvider client={queryClient}>
					<PlausibleProvider domain="">
						<Head>
							<meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
							<meta httpEquiv="X-UA-Compatible" content="ie=edge" />
							<meta httpEquiv="Expires" content="1y" />
							<meta httpEquiv="Pragma" content="1y" />
							<meta httpEquiv="Cache-Control" content="1y" />

							<meta httpEquiv="Page-Enter" content="RevealTrans(Duration=2.0,Transition=2)" />
							<meta httpEquiv="Page-Exit" content="RevealTrans(Duration=3.0,Transition=12)" />

							<link rel="shortcut icon" href="/favicon.ico" />
						</Head>
						<DefaultSeo {...DefaultSeoProps} />

						<>
							<PinnedComponents>
								<div className="min-h-screen">
									<Navbar />

									<main className="min-h-screen dark:bg-lights-200 dark:text-black">
										<Component {...pageProps} />
									</main>

									<footer>
										<Footer />
									</footer>
								</div>
							</PinnedComponents>
						</>
					</PlausibleProvider>

					<ReactQueryDevtools />
				</QueryClientProvider>
			</React.StrictMode>
		</>
	);
};

export default App;
