import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import InitialStateWrapper from 'components/wrappers/InitialStateWrapper';
import { ROOT } from 'constants/links';
import { queryClient } from 'core/query';
import { chains, wagmiClient } from 'core/wallet';
import { useInstantiateSORConstant } from 'hooks/SOR/useInstantiateSORConstant';
import { useInitializeIntercom } from 'hooks/useInitializeIntercom';
import DefaultLayout from 'layouts/DefaultLayout';
import type { NextPage, NextPageContext } from 'next';
import { updateIntercom } from 'next-intercom';
import PlausibleProvider from 'next-plausible';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from 'state';
import { koyoDarkTheme } from 'styles/rainbowkit';
import { ExtendedNextPage } from 'types/ExtendedNextPage';
import { WagmiConfig } from 'wagmi';
import DefaultSeoProps from 'DefaultSeoProps';
import dynamic from 'next/dynamic';
import { config } from 'core/config';
import FlagsmithWrapper from 'components/wrappers/FlagsmithWrapper';

import '@rainbow-me/rainbowkit/styles.css';
import 'styles/_App.css';

const Navbar = dynamic(() => import('components/Navbar'));

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
	useInstantiateSORConstant();

	const ExtendedPage = Component as ExtendedNextPage<NextPageContext, any>;
	const Layout = ExtendedPage.Layout || DefaultLayout;
	const Intercom = ExtendedPage.intercom === undefined ? true : ExtendedPage.intercom;

	useInitializeIntercom(Intercom);

	useEffect(() => {
		if (!config.intercomId) return;

		updateIntercom('update', {
			hide_default_launcher: Intercom ? false : true
		});
		if (Intercom === false) updateIntercom('hide', undefined);
	}, [Intercom]);

	return (
		<React.StrictMode>
			<WagmiConfig client={wagmiClient}>
				<RainbowKitProvider
					chains={chains}
					appInfo={{
						appName: 'Kōyō Finance',
						learnMoreUrl: 'https://docs.koyo.finance'
					}}
					showRecentTransactions={true}
					coolMode={true}
					theme={koyoDarkTheme()}
				>
					<QueryClientProvider client={queryClient}>
						<PlausibleProvider domain={ROOT}>
							<Provider store={store}>
								<PersistGate persistor={persistor}>
									<InitialStateWrapper>
										<FlagsmithWrapper>
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
										</FlagsmithWrapper>
									</InitialStateWrapper>
								</PersistGate>
							</Provider>
						</PlausibleProvider>

						<ReactQueryDevtools />
					</QueryClientProvider>
				</RainbowKitProvider>
			</WagmiConfig>
		</React.StrictMode>
	);
};

export default MyApp;
