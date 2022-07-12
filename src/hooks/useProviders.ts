import { JsonRpcProvider, Provider } from '@ethersproject/providers';
import { ChainId } from '@koyofinance/core-sdk';
import { AURORA_RPC_URL, BOBA_MAINNET_READ_RPC_URL } from 'constants/chains';

export const bobaReadonlyProvider = new JsonRpcProvider(BOBA_MAINNET_READ_RPC_URL, ChainId.BOBA);
export const auroraProvider = new JsonRpcProvider(AURORA_RPC_URL, ChainId.AURORA);

export default function useProviders(): { [K in ChainId]?: Provider } {
	return {
		[ChainId.BOBA]: bobaReadonlyProvider,
		[ChainId.AURORA]: auroraProvider
	};
}
