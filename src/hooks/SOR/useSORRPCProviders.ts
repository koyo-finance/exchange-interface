import { JsonRpcProvider, Provider } from '@ethersproject/providers';
import { ChainId } from '@koyofinance/core-sdk';
import { AURORA_RPC_URL, MOONRIVER_RPC_URL } from 'constants/chains';

const bobaKoyoProvider = new JsonRpcProvider('https://boba-rpc.koyo.finance/rpc', ChainId.BOBA);
const auroraProvider = new JsonRpcProvider(AURORA_RPC_URL, ChainId.AURORA);
const moonriverProvider = new JsonRpcProvider(MOONRIVER_RPC_URL, ChainId.MOONRIVER);
const polygonProvider = new JsonRpcProvider('https://polygon-mainnet.g.alchemy.com/v2/9pEIoEx9SynqTgGgjGcW5M7sSuwTwbMS', ChainId.POLYGON);

export default function useSORRPCProviders(): { [K in ChainId]?: Provider } {
	return {
		[ChainId.BOBA]: bobaKoyoProvider,
		[ChainId.AURORA]: auroraProvider,
		[ChainId.MOONRIVER]: moonriverProvider,
		[ChainId.POLYGON]: polygonProvider
	};
}
