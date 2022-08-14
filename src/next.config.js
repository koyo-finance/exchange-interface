// @ts-ignore
const withPlugins = require('next-compose-plugins');
const { withPlausibleProxy } = require('next-plausible');
const withBundleAnalyzer = require('@next/bundle-analyzer');

const IPFS = process.env.IPFS_EXPORT === 'true';

const config = {
	exportTrailingSlash: IPFS ? true : undefined,
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

const plausiblePlugin = withPlausibleProxy;
const bundleAnalyzerPlugin = withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' });

module.exports = withPlugins([plausiblePlugin, bundleAnalyzerPlugin], config);
