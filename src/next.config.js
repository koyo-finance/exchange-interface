const { withPlausibleProxy } = require('next-plausible');

const config = {
	async rewrites() {
		return [
			{
				source: '/index',
				destination: '/'
			},
			{
				source: '/deposit/index',
				destination: '/deposit'
			},
			{
				source: '/swap/index',
				destination: '/swap'
			},
			{
				source: '/withdraw/index',
				destination: '/withdraw'
			},

			{
				source: '/tokens',
				destination: 'https://tokens.koyo.finance/all.json'
			}
		];
	},
	async redirects() {
		return [
			{
				source: '/lock/index',
				destination: '/kyo/lock',
				permanent: true
			},
			{
				source: '/lock',
				destination: '/kyo/lock',
				permanent: true
			}
		];
	}
};

const configWithPlausible = withPlausibleProxy()(config);

module.exports = configWithPlausible;
