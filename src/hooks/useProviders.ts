import { AlchemyProvider, JsonRpcProvider, Provider } from '@ethersproject/providers';
import { BOBA_MAINNET_READ_RPC_URL, BOBA_RINKEBY_RPC_URL, PinnedChainId, SupportedChainId } from 'constants/chains';

export const bobaProvider = new JsonRpcProvider(BOBA_MAINNET_READ_RPC_URL, SupportedChainId.BOBA);
export const bobaRinkebyProvider = new JsonRpcProvider(BOBA_RINKEBY_RPC_URL, SupportedChainId.BOBA_RINKEBY);

export const mainnetAlchemyProvider = new AlchemyProvider(PinnedChainId.MAINNET, process.env.NEXT_PUBLIC_MAINNET_KEY);

export default function useProviders(): { [K in SupportedChainId | PinnedChainId]: Provider } {
	return {
		[SupportedChainId.BOBA]: bobaProvider,
		[SupportedChainId.BOBA_RINKEBY]: bobaRinkebyProvider,

		[PinnedChainId.MAINNET]: mainnetAlchemyProvider
	};
}
