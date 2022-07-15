import { JsonRpcProvider, Provider } from '@ethersproject/providers';
import { ChainId } from '@koyofinance/core-sdk';
import { AURORA_RPC_URL, BOBA_MAINNET_READ_RPC_URL, MOONRIVER_RPC_URL } from 'constants/chains';

export const bobaReadonlyProvider = new JsonRpcProvider(BOBA_MAINNET_READ_RPC_URL, ChainId.BOBA);
export const auroraProvider = new JsonRpcProvider(AURORA_RPC_URL, ChainId.AURORA);
export const moonriverProvider = new JsonRpcProvider(MOONRIVER_RPC_URL, ChainId.MOONRIVER);
export const polygonProvider = new JsonRpcProvider('https://polygon-mainnet.g.alchemy.com/v2/DJ0JMuEz_9xH0M54oC2dV3SHsVoRhYqP', ChainId.POLYGON);

export default function useProviders(): { [K in ChainId]?: Provider } {
	return {
		[ChainId.BOBA]: bobaReadonlyProvider,
		[ChainId.AURORA]: auroraProvider,
		[ChainId.MOONRIVER]: moonriverProvider,
		[ChainId.POLYGON]: polygonProvider
	};
}
