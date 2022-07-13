import { ChainId } from '@koyofinance/core-sdk';
import { connectorsForWallets, wallet } from '@rainbow-me/rainbowkit';
import { CHAIN_INFO } from 'constants/chains';
import { Chain, configureChains, createClient } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { onto } from './wallets/onto';
import { ontoWeb } from './wallets/ontoWeb';

const bobaMainnetChain: Chain = {
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
	testnet: false
};

const auroraMainnetChain: Chain = {
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
	testnet: false
};

const moonriverChain: Chain = {
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
	testnet: false
};

export const { chains, provider, webSocketProvider } = configureChains(
	[bobaMainnetChain, auroraMainnetChain, moonriverChain], //
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
