import { ROOT } from 'constants/links';
import type { DefaultSeoProps as DefaultSeoPropsType } from 'next-seo';

export const BaseUrl = ROOT;
export const Summary = '';

export const DefaultSeoProps: DefaultSeoPropsType = {
	titleTemplate: ' | %s',
	title: 'Home',
	description: Summary,
	canonical: BaseUrl,
	additionalMetaTags: [
		{ name: 'url', content: BaseUrl },
		{ name: 'identifier-URL', content: BaseUrl },
		{ name: 'shortlink', content: BaseUrl },
		{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
		{ name: 'robots', content: 'archive,follow,imageindex,index,odp,snippet,translate' },
		{ name: 'googlebot', content: 'index,follow' },
		{ name: 'author', content: `` },
		{ name: 'owner', content: `` },
		{ name: 'designer', content: `` },
		{ name: 'reply-to', content: '' },
		{ name: 'target', content: 'all' },
		{ name: 'audience', content: 'all' },
		{ name: 'coverage', content: 'Worldwide' },
		{ name: 'distribution', content: 'Global' },
		{ name: 'rating', content: 'safe for kids' },
		{ name: 'apple-mobile-web-app-capable', content: 'yes' },
		{ name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
		{ name: 'HandheldFriendly', content: 'True' },
		{ name: 'apple-mobile-web-app-title', content: '' },
		{ name: 'application-name', content: '' },
		{ name: 'revisit-after', content: '7 days' },
		{ property: 'og:email', content: '' }
	],
	openGraph: {
		title: '',
		url: BaseUrl,
		description: Summary,
		type: 'website',
		locale: 'en_US',
		site_name: '',
		profile: {
			firstName: '',
			username: ''
		}
	},
	twitter: {
		handle: '',
		site: '',
		cardType: 'summary'
	}
};

export default DefaultSeoProps;
