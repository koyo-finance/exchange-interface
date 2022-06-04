const { withPlausibleProxy } = require('next-plausible');

module.exports = withPlausibleProxy()({
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
				source: '/lock/index',
				destination: '/lock'
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
				destination: 'https://tassets.koyo.finance/koyo-default.tokenlist.json',
			}
		];
	},
	async redirects() {
		return [];
	}
});
