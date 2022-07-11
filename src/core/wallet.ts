import { connectorsForWallets, wallet } from '@rainbow-me/rainbowkit';
import { CHAIN_INFO, SupportedChainId } from 'constants/chains';
import { Chain, configureChains, createClient } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { onto } from './wallets/onto';
import { ontoWeb } from './wallets/ontoWeb';

const bobaMainnetChain: Chain = {
	id: SupportedChainId.BOBA,
	name: CHAIN_INFO[SupportedChainId.BOBA].label,
	network: 'boba',
	nativeCurrency: CHAIN_INFO[SupportedChainId.BOBA].addNetworkInfo.nativeCurrency,
	rpcUrls: {
		default: CHAIN_INFO[SupportedChainId.BOBA].addNetworkInfo.rpcUrl
	},
	blockExplorers: {
		default: { name: 'Bobascan', url: CHAIN_INFO[SupportedChainId.BOBA].explorer }
	},
	testnet: false
};

export const { chains, provider, webSocketProvider } = configureChains(
	[bobaMainnetChain], //
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
