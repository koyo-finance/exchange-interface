import { apiProvider, configureChains, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { CHAIN_INFO, SupportedChainId } from 'constants/chains';
import { createClient, Chain } from 'wagmi';

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

const { connectors } = getDefaultWallets({
	appName: 'Kōyō Finance',
	chains
});

export const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider
});
