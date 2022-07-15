import { ChainId } from '@koyofinance/core-sdk';
import { connectorsForWallets, wallet } from '@rainbow-me/rainbowkit';
import { CHAIN_INFO } from 'constants/chains';
import { Chain, configureChains, createClient } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { onto } from './wallets/onto';
import { ontoWeb } from './wallets/ontoWeb';

export interface RainbowKitChain extends Chain {
	iconUrl?: string;
}

const bobaMainnetChain: RainbowKitChain = {
	id: ChainId.BOBA,
	name: CHAIN_INFO[ChainId.BOBA].label,
	network: 'boba',
	nativeCurrency: CHAIN_INFO[ChainId.BOBA].addNetworkInfo.nativeCurrency,
	rpcUrls: {
		default: CHAIN_INFO[ChainId.BOBA].addNetworkInfo.rpcUrl
	},
	blockExplorers: {
		default: { name: 'Bobascan', url: CHAIN_INFO[ChainId.BOBA].explorer }
	},
	testnet: false,
	iconUrl: 'https://tassets.koyo.finance/logos/BOBA/512x512.png'
};

const auroraMainnetChain: RainbowKitChain = {
	id: ChainId.AURORA,
	name: CHAIN_INFO[ChainId.AURORA].label,
	network: 'aurora',
	nativeCurrency: CHAIN_INFO[ChainId.AURORA].addNetworkInfo.nativeCurrency,
	rpcUrls: {
		default: CHAIN_INFO[ChainId.AURORA].addNetworkInfo.rpcUrl
	},
	blockExplorers: {
		default: { name: 'Aurorascan', url: CHAIN_INFO[ChainId.AURORA].explorer }
	},
	testnet: false,
	iconUrl: 'https://tassets.koyo.finance/logos/AURORA/512x512.png'
};

const moonriverChain: RainbowKitChain = {
	id: ChainId.MOONRIVER,
	name: CHAIN_INFO[ChainId.MOONRIVER].label,
	network: 'moonriver',
	nativeCurrency: CHAIN_INFO[ChainId.MOONRIVER].addNetworkInfo.nativeCurrency,
	rpcUrls: {
		default: CHAIN_INFO[ChainId.MOONRIVER].addNetworkInfo.rpcUrl
	},
	blockExplorers: {
		default: { name: 'Moonscan - Moonriver', url: CHAIN_INFO[ChainId.MOONRIVER].explorer }
	},
	testnet: false,
	iconUrl: 'https://tassets.koyo.finance/logos/MOVR/512x512.png'
};

const polygonChain: RainbowKitChain = {
	id: ChainId.POLYGON,
	name: CHAIN_INFO[ChainId.POLYGON].label,
	network: 'polygon',
	nativeCurrency: CHAIN_INFO[ChainId.POLYGON].addNetworkInfo.nativeCurrency,
	rpcUrls: {
		default: CHAIN_INFO[ChainId.POLYGON].addNetworkInfo.rpcUrl
	},
	blockExplorers: {
		default: { name: 'Polygonscan', url: CHAIN_INFO[ChainId.POLYGON].explorer }
	},
	testnet: false,
	iconUrl: 'https://tassets.koyo.finance/chains/polygon.png'
};

export const { chains, provider, webSocketProvider } = configureChains(
	[bobaMainnetChain, auroraMainnetChain, moonriverChain, polygonChain], //
	[jsonRpcProvider({ rpc: (chain) => ({ http: chain.rpcUrls.default }) })]
);

const connectors = connectorsForWallets([
	{
		groupName: 'Recommended',
		wallets: [
			wallet.metaMask({ chains, shimDisconnect: true }),
			ontoWeb({ chains, shimDisconnect: true }),
			onto({ chains, shimDisconnect: true }),
			wallet.walletConnect({ chains })
		]
	}
]);

export const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
	webSocketProvider
});
