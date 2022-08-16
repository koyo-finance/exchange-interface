/* eslint-disable @typescript-eslint/no-var-requires */

const { config } = require('dotenv-cra');
const path = require('path');
const { simpleGit } = require('simple-git');
const fsp = require('fs/promises');
const fse = require('fs-extra');

process.env.NODE_ENV ??= 'development';
const SRC = path.join(process.cwd(), 'src');
const CHARTING_BASE = path.join(SRC, 'public', 'static', 'charting');
const CLONE = path.join(CHARTING_BASE, 'c');
const CHARTING_LIBRARY = path.join(CHARTING_BASE, 'charting_library');
const DATAFEEDS = path.join(CHARTING_BASE, 'datafeeds');

const ENV_FILE = path.join(SRC, '.env');
config({ path: ENV_FILE });

async function main() {
	await fse.remove(CHARTING_LIBRARY);
	await fse.remove(DATAFEEDS);

	const git = simpleGit();
	await git.clone(`https://${process.env.GU}:${process.env.PAT}@github.com/tradingview/charting_library.git`, CLONE);

	await fse.copy(path.join(CLONE, 'charting_library'), CHARTING_LIBRARY);
	await fse.copy(path.join(CLONE, 'datafeeds'), DATAFEEDS);

	await fsp.rm(CLONE, { recursive: true });
}

void main().catch(console.error);
