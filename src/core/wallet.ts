import { apiProvider, configureChains, connectorsForWallets, wallet } from '@rainbow-me/rainbowkit';
import { CHAIN_INFO, SupportedChainId } from 'constants/chains';
import { Chain, createClient } from 'wagmi';
import { onto } from './wallets/onto';
import { ontoWeb } from './wallets/ontoWeb';

const bobaMainnetChain: Chain = {
	id: SupportedChainId.BOBA,
	name: CHAIN_INFO[SupportedChainId.BOBA].label,
	nativeCurrency: CHAIN_INFO[SupportedChainId.BOBA].addNetworkInfo.nativeCurrency,
	rpcUrls: {
		default: CHAIN_INFO[SupportedChainId.BOBA].addNetworkInfo.rpcUrl
	},
	blockExplorers: {
		default: { name: 'BlockExplorer', url: CHAIN_INFO[SupportedChainId.BOBA].explorer },
		blockexplorer: { name: 'BlockExplorer', url: CHAIN_INFO[SupportedChainId.BOBA].explorer },
		etherscan: { name: 'BlockExplorer', url: CHAIN_INFO[SupportedChainId.BOBA].explorer }
	},
	testnet: false
};

export const { chains, provider } = configureChains([bobaMainnetChain], [apiProvider.jsonRpc((chain) => ({ rpcUrl: chain.rpcUrls.default }))]);

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
	provider
});
