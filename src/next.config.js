const { withPlausibleProxy } = require('next-plausible');

module.exports = withPlausibleProxy()({
	async rewrites() {
		return [
			{
				source: '/index',
				destination: '/'
			}
		];
	},
	async redirects() {
		return [];
	}
});
