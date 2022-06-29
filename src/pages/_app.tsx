import { config } from '@fortawesome/fontawesome-svg-core';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import Navbar from 'components/Navbar';
import InitialStateWrapper from 'components/wrappers/InitialStateWrapper';
import { ROOT } from 'constants/links';
import { queryClient } from 'core/query';
import { chains, wagmiClient } from 'core/wallet';
import DefaultLayout from 'layouts/DefaultLayout';
import type { NextPage, NextPageContext } from 'next';
import PlausibleProvider from 'next-plausible';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from 'state';
import { koyoDarkTheme } from 'styles/rainbowkit';
import { ExtendedNextPage } from 'types/ExtendedNextPage';
import { WagmiConfig } from 'wagmi';
import DefaultSeoProps from '../DefaultSeoProps';
import { useInstantiateSORConstant } from 'hooks/sor/useInstantiateSORConstant';

import '@rainbow-me/rainbowkit/styles.css';
import 'styles/_App.css';

config.autoAddCss = false;

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
	useInstantiateSORConstant();

	const ExtendedPage = Component as ExtendedNextPage<NextPageContext, any>;

	const Layout = ExtendedPage.Layout || DefaultLayout;

	return (
		<>
			<React.StrictMode>
				<WagmiConfig client={wagmiClient}>
					<RainbowKitProvider chains={chains} showRecentTransactions={true} coolMode={true} theme={koyoDarkTheme()}>
						<QueryClientProvider client={queryClient}>
							<PlausibleProvider domain={ROOT}>
								<Provider store={store}>
									<PersistGate persistor={persistor}>
										<InitialStateWrapper>
											<>
												<Head>
													<meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
													<meta httpEquiv="X-UA-Compatible" content="ie=edge" />
													<meta httpEquiv="Expires" content="1y" />
													<meta httpEquiv="Pragma" content="1y" />
													<meta httpEquiv="Cache-Control" content="1y" />

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
										</InitialStateWrapper>
									</PersistGate>
								</Provider>
							</PlausibleProvider>

							<ReactQueryDevtools />
						</QueryClientProvider>
					</RainbowKitProvider>
				</WagmiConfig>
			</React.StrictMode>
		</>
	);
};

export default App;
