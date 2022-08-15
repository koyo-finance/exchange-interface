import { config } from 'core/config';
import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

const scriptTxt = `
	(function () {
		const { pathname } = window.location;
		const ipfsMatch = /.*\\/Qm\\w{44}\\//.exec(pathname);
		const base = document.createElement('base');

		base.href = ipfsMatch ? ipfsMatch[0] : '/';
		document.head.append(base);
	})();
`;

class MyDocument extends Document {
	public render() {
		return (
			<Html lang="en" prefix="og: https://ogp.me/ns#">
				<Head>
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" />

					<link href="https://fonts.googleapis.com/css2?family=Sora:wght@100;200;300;400;500;600;700;800&display=swap" rel="stylesheet" />
					<link
						href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100;200;300;400;500;600;700;800&display=swap"
						rel="stylesheet"
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
						rel="stylesheet"
					/>

					{/* eslint-disable-next-line react/no-danger */}
					{config.ipfs && <script dangerouslySetInnerHTML={{ __html: scriptTxt }} />}
				</Head>
				<body className="dark">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}

	public static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}
}

export default MyDocument;
