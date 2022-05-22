import { JsonRpcProvider, Provider } from '@ethersproject/providers';
import { BOBA_MAINNET_READ_RPC_URL, BOBA_RINKEBY_RPC_URL, SupportedChainId } from 'constants/chains';

export const bobaProvider = new JsonRpcProvider(BOBA_MAINNET_READ_RPC_URL, SupportedChainId.BOBA);
export const bobaRinkebyProvider = new JsonRpcProvider(BOBA_RINKEBY_RPC_URL, SupportedChainId.BOBA_RINKEBY);

export default function useProviders(): { [K in SupportedChainId]: Provider } {
	return {
		[SupportedChainId.BOBA]: bobaProvider,
		[SupportedChainId.BOBA_RINKEBY]: bobaRinkebyProvider
	};
}
