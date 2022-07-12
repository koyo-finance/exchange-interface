import { JsonRpcProvider, Provider } from '@ethersproject/providers';
import { ChainId } from '@koyofinance/core-sdk';
import { BOBA_MAINNET_READ_RPC_URL, SupportedChainId } from 'constants/chains';

export const bobaReadonlyProvider = new JsonRpcProvider(BOBA_MAINNET_READ_RPC_URL, SupportedChainId.BOBA);

export default function useProviders(): { [K in ChainId]?: Provider } {
	return {
		[SupportedChainId.BOBA]: bobaReadonlyProvider
	};
}
