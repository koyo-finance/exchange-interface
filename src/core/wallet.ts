import { onto } from '@koyofinance/rainbowkit-wallets-sdk';
import { apiProvider, configureChains, connectorsForWallets, wallet } from '@rainbow-me/rainbowkit';
import { CHAIN_INFO, SupportedChainId } from 'constants/chains';
import { Chain, createClient } from 'wagmi';

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

// @ts-expect-error We know that "isONTO" could be present. https://publicdocs.gitbook.io/onto/integrate-onto-in-mobile-dapp
const needsInjectedWalletFallback = typeof window !== 'undefined' && window.ethereum && !window.ethereum.isMetaMask && !window.ethereum.isONTO;

export const { chains, provider } = configureChains([bobaMainnetChain], [apiProvider.jsonRpc((chain) => ({ rpcUrl: chain.rpcUrls.default }))]);

const connectors = connectorsForWallets([
	{
		groupName: 'Recommended',
		wallets: [
			wallet.metaMask({ chains, shimDisconnect: true }),
			onto({ chains, shimDisconnect: true }),
			...(needsInjectedWalletFallback ? [wallet.injected({ chains, shimDisconnect: true })] : []),
			wallet.walletConnect({ chains })
		]
	}
]);

export const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider
});
