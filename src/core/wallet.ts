import { ChainId } from '@koyofinance/core-sdk';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { CHAIN_INFO } from 'constants/chains';
import { Chain, configureChains, createClient } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

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
	[bobaMainnetChain, polygonChain], //
	[jsonRpcProvider({ rpc: (chain) => ({ http: chain.rpcUrls.default }) })]
);

const { connectors } = getDefaultWallets({
	appName: 'Kōyō Finance',
	chains
});

export const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
	webSocketProvider
});
