import { ChainId } from '@koyofinance/core-sdk';

export enum SupportedChainId {
	BOBA = ChainId.BOBA,
	AURORA = ChainId.AURORA,
	MOONRIVER = ChainId.MOONRIVER,
	POLYGON = ChainId.POLYGON
}

export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = Object.values(SupportedChainId).filter(
	(id) => typeof id === 'number'
) as SupportedChainId[];

export const BOBA_MAINNET_RPC_URL = 'https://mainnet.boba.network';
export const BOBA_MAINNET_READ_RPC_URL = 'https://lightning-replica.boba.network';
export const AURORA_RPC_URL = 'https://mainnet.aurora.dev';
export const MOONRIVER_RPC_URL = 'https://moonriver.public.blastapi.io';
export const POLYGON_RPC_URL = 'https://polygon-rpc.com/';

/**
 * This is used to call the add network RPC
 */
interface AddNetworkInfo {
	readonly rpcUrl: string;
	readonly nativeCurrency: {
		name: string; // e.g. 'Goerli ETH',
		symbol: string; // e.g. 'gorETH',
		decimals: number; // e.g. 18,
	};
}

interface BaseChainInfo {
	readonly blockWaitMsBeforeWarning?: number;
	readonly explorer: string;
	readonly label: string;
	readonly addNetworkInfo: AddNetworkInfo;
}

export type ChainInfoMap = { readonly [chainId: number]: BaseChainInfo } & {
	readonly [chainId in SupportedChainId]: BaseChainInfo;
};

export const CHAIN_INFO: ChainInfoMap = {
	[SupportedChainId.BOBA]: {
		explorer: 'https://bobascan.com/',
		label: 'Boba L2',
		addNetworkInfo: {
			nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
			rpcUrl: BOBA_MAINNET_RPC_URL
		}
	},
	[SupportedChainId.AURORA]: {
		explorer: 'https://aurorascan.dev/',
		label: 'Aurora',
		addNetworkInfo: {
			nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
			rpcUrl: AURORA_RPC_URL
		}
	},
	[SupportedChainId.MOONRIVER]: {
		explorer: 'https://moonriver.moonscan.io/',
		label: 'Moonriver',
		addNetworkInfo: {
			nativeCurrency: { name: 'Moonriver', symbol: 'MOVR', decimals: 18 },
			rpcUrl: MOONRIVER_RPC_URL
		}
	},
	[SupportedChainId.POLYGON]: {
		explorer: 'https://polygonscan.com/',
		label: 'Polygon',
		addNetworkInfo: {
			nativeCurrency: { name: 'Matic', symbol: 'MATIC', decimals: 18 },
			rpcUrl: POLYGON_RPC_URL
		}
	}
};
