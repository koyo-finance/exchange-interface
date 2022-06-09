import { ROOT_WITH_PROTOCOL } from 'constants/links';
import type { DefaultSeoProps as DefaultSeoPropsType } from 'next-seo';

export const BaseUrl = ROOT_WITH_PROTOCOL;
export const Summary = [
	'Kōyō is the first next-generation AMM protocol in the Boba ecosystem.',
	'It is inspired by Curve and Balancer.',
	"At its core it's a decentralized exchange (DEX) that minimizes unnecessary losses from swaps between assets of equal value."
].join(' ');

export const DefaultSeoProps: DefaultSeoPropsType = {
	titleTemplate: 'Kōyō | %s',
	title: 'Landing',
	description: Summary,
	canonical: BaseUrl,
	additionalMetaTags: [
		{ name: 'url', content: BaseUrl },
		{ name: 'identifier-URL', content: BaseUrl },
		{ name: 'shortlink', content: BaseUrl },
		{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
		{ name: 'robots', content: 'archive,follow,imageindex,index,odp,snippet,translate' },
		{ name: 'googlebot', content: 'index,follow' },
		{ name: 'author', content: `Kōyō Finance, contact@koyo.finance` },
		{ name: 'owner', content: `Kōyō Finance, contact@koyo.finance` },
		{ name: 'designer', content: `Kōyō Finance, contact@koyo.finance` },
		{ name: 'reply-to', content: 'contact@koyo.finance' },
		{ name: 'target', content: 'all' },
		{ name: 'audience', content: 'all' },
		{ name: 'coverage', content: 'Worldwide' },
		{ name: 'distribution', content: 'Global' },
		{ name: 'rating', content: 'safe for kids' },
		{ name: 'apple-mobile-web-app-capable', content: 'yes' },
		{ name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
		{ name: 'HandheldFriendly', content: 'True' },
		{ name: 'apple-mobile-web-app-title', content: 'Kōyō Finance' },
		{ name: 'application-name', content: 'Kōyō Finance' },
		{ name: 'revisit-after', content: '7 days' },
		{ property: 'og:email', content: 'contact@koyo.finance' }
	],
	openGraph: {
		title: 'Kōyō Finance',
		url: BaseUrl,
		description: Summary,
		type: 'website',
		locale: 'en_US',
		site_name: '',
		profile: {
			firstName: 'Kōyō Finance',
			username: 'Kōyō Finance'
		}
	},
	twitter: {
		handle: '@koyofinance',
		site: '@koyofinance',
		cardType: 'summary'
	}
};

export default DefaultSeoProps;
