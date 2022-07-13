import { JsonRpcProvider, Provider } from '@ethersproject/providers';
import { ChainId } from '@koyofinance/core-sdk';
import { AURORA_RPC_URL } from 'constants/chains';

export const bobaKoyoProvider = new JsonRpcProvider('https://boba-rpc.koyo.finance/rpc', ChainId.BOBA);
export const auroraProvider = new JsonRpcProvider(AURORA_RPC_URL, ChainId.AURORA);

export default function useSORRPCProviders(): { [K in ChainId]?: Provider } {
	return {
		[ChainId.BOBA]: bobaKoyoProvider,
		[ChainId.AURORA]: auroraProvider
	};
}
