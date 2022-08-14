import { ROOT_WITH_PROTOCOL } from 'constants/links';
import sitemapGenerator from 'nextjs-sitemap-generator';
import path from 'path';

export async function generateSitemap(srcPath: string) {
	const baseUrl = ROOT_WITH_PROTOCOL;

	await sitemapGenerator({
		baseUrl,
		pagesDirectory: path.join(srcPath, 'pages'),
		targetDirectory: path.join(srcPath, 'public'),
		nextConfigPath: path.join(srcPath, 'next.config.js'),
		ignoredPaths: []
	});
}
