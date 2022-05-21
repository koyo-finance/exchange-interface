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
				source: '/swap/index',
				destination: '/swap'
			},
			{
				source: '/withdraw/index',
				destination: '/withdraw'
			}
		];
	},
	async redirects() {
		return [
			{
				source: '/',
				destination: '/swap',
				permanent: true
			}
		];
	}
});
