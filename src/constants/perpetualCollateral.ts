import { TokenInfo } from '@uniswap/token-lists';

// Remove this token list and create new subgraph token list
export const collateralAssets: TokenInfo[] = [
	{
		address: '0x66a2A913e447d6b4BF33EFbec43aAeF87890FBbc',
		chainId: 288,
		decimals: 6,
		logoURI: 'https://tassets.koyo.finance/logos/USDC/512x512.png',
		name: 'USD Coin',
		symbol: 'USDC',
		tags: ['stablecoin']
	}
];
