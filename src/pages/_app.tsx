import { config } from '@fortawesome/fontawesome-svg-core';
import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { ROOT } from 'constants/links';
import { queryClient } from 'core/query';
import { chains, wagmiClient } from 'core/wallet';
import type { NextPage, NextPageContext } from 'next';
import PlausibleProvider from 'next-plausible';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { WagmiProvider } from 'wagmi';
import DefaultSeoProps from '../DefaultSeoProps';

import 'styles/_App.css';
import '@rainbow-me/rainbowkit/styles.css';
import DefaultLayout from 'layouts/DefaultLayout';
import { ExtendedNextPage } from 'types/ExtendedNextPage';
import Navbar from 'components/Navbar/Navbar';

config.autoAddCss = false;

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
	const ExtendedPage = Component as ExtendedNextPage<NextPageContext, any>;

	const Layout = ExtendedPage.Layout || DefaultLayout;

	return (
		<>
			<React.StrictMode>
				<WagmiProvider client={wagmiClient}>
					<RainbowKitProvider
						chains={chains}
						showRecentTransactions={true}
						coolMode={true}
						theme={darkTheme({ accentColor: '#F0932C', accentColorForeground: '#000' })}
					>
						<QueryClientProvider client={queryClient}>
							<PlausibleProvider domain={ROOT}>
								<>
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
								</>

								<>
									<Navbar />
									<Layout>
										<ExtendedPage {...pageProps} />
									</Layout>
								</>
							</PlausibleProvider>

							<ReactQueryDevtools />
						</QueryClientProvider>
					</RainbowKitProvider>
				</WagmiProvider>
			</React.StrictMode>
		</>
	);
};

export default App;
