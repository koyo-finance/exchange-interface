const { withPlausibleProxy } = require('next-plausible');
const { withSentryConfig } = require('@sentry/nextjs');

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
				destination: 'https://tassets.koyo.finance/koyo-default.tokenlist.json'
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

const sentry = {
	// Additional config options for the Sentry Webpack plugin. Keep in mind that
	// the following options are set automatically, and overriding them is not
	// recommended:
	//   release, url, org, project, authToken, configFile, stripPrefix,
	//   urlPrefix, include, ignore

	silent: true // Suppresses all logs
	// For all available options, see:
	// https://github.com/getsentry/sentry-webpack-plugin#options.
};

const configWithPlausible = withPlausibleProxy()(config);
// @ts-expect-error Expanded config
const configWithSentry = withSentryConfig(configWithPlausible, sentry);

module.exports = configWithSentry;
