import { ChainId } from '@koyofinance/core-sdk';

export enum SupportedChainId {
	BOBA = ChainId.BOBA,
	AURORA = ChainId.AURORA,
	MOONRIVER = ChainId.MOONRIVER
}

export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = Object.values(SupportedChainId).filter(
	(id) => typeof id === 'number'
) as SupportedChainId[];

export const BOBA_MAINNET_RPC_URL = 'https://mainnet.boba.network';
export const BOBA_MAINNET_READ_RPC_URL = 'https://lightning-replica.boba.network';
export const AURORA_RPC_URL = 'https://mainnet.aurora.dev';
export const MOONRIVER_RPC_URL = 'https://moonriver.public.blastapi.io';

export const RPC_URLS: { [K in SupportedChainId]: string } = {
	[SupportedChainId.BOBA]: BOBA_MAINNET_RPC_URL
};

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
			rpcUrl: 'https://mainnet.boba.network'
		}
	},
	[SupportedChainId.AURORA]: {
		explorer: 'https://aurorascan.dev/',
		label: 'Aurora',
		addNetworkInfo: {
			nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
			rpcUrl: 'https://mainnet.aurora.dev'
		}
	},
	[SupportedChainId.MOONRIVER]: {
		explorer: 'https://moonriver.moonscan.io',
		label: 'Moonriver',
		addNetworkInfo: {
			nativeCurrency: { name: 'Moonriver', symbol: 'MOVR', decimals: 18 },
			rpcUrl: 'https://moonriver.public.blastapi.io'
		}
	}
};
