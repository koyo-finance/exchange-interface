export enum SupportedChainId {
	BOBA = 288,
	BOBA_RINKEBY = 28
}

export enum PinnedChainId {
	MAINNET = 1
}

export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = Object.values(SupportedChainId).filter(
	(id) => typeof id === 'number'
) as SupportedChainId[];

export const HEX_CHAIN_IDS: { [K in SupportedChainId | PinnedChainId]: string } = {
	[SupportedChainId.BOBA]: '0x120',
	[SupportedChainId.BOBA_RINKEBY]: '0x1c',
	[PinnedChainId.MAINNET]: '0x1'
};

export const L1_CHAIN_IDS = [] as const;

export type SupportedL1ChainId = typeof L1_CHAIN_IDS[number];

export const L2_CHAIN_IDS = [SupportedChainId.BOBA, SupportedChainId.BOBA_RINKEBY] as const;

export type SupportedL2ChainId = typeof L2_CHAIN_IDS[number];

export const MAINNET_RPC_URL = '';
export const BOBA_MAINNET_RPC_URL = 'https://mainnet.boba.network';
export const BOBA_MAINNET_READ_RPC_URL = 'https://lightning-replica.boba.network';
export const BOBA_RINKEBY_RPC_URL = 'https://rinkeby.boba.network/';

export const RPC_URLS: { [K in SupportedChainId]: string } = {
	[SupportedChainId.BOBA]: BOBA_MAINNET_RPC_URL,
	[SupportedChainId.BOBA_RINKEBY]: BOBA_RINKEBY_RPC_URL
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

export enum NetworkType {
	L1,
	L2
}

interface BaseChainInfo {
	readonly networkType: NetworkType;
	readonly blockWaitMsBeforeWarning?: number;
	readonly explorer: string;
	readonly label: string;
	readonly addNetworkInfo: AddNetworkInfo;
}

export interface L1ChainInfo extends BaseChainInfo {
	readonly networkType: NetworkType.L1;
}

export interface L2ChainInfo extends BaseChainInfo {
	readonly networkType: NetworkType.L2;
}

export type ChainInfoMap = { readonly [chainId: number]: L1ChainInfo | L2ChainInfo } & {
	readonly [chainId in SupportedL2ChainId]: L2ChainInfo;
} & { readonly [chainId in SupportedL1ChainId]: L1ChainInfo };

export const CHAIN_INFO: ChainInfoMap = {
	[SupportedChainId.BOBA]: {
		networkType: NetworkType.L2,
		// blockWaitMsBeforeWarning: ms`25m`,
		explorer: 'https://blockexplorer.boba.network',
		label: 'Boba L2',
		addNetworkInfo: {
			nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
			rpcUrl: 'https://mainnet.boba.network'
		}
	},
	[SupportedChainId.BOBA_RINKEBY]: {
		networkType: NetworkType.L2,
		// blockWaitMsBeforeWarning: ms`25m`,
		explorer: 'https://blockexplorer.rinkeby.boba.network',
		label: 'Boba L2 Rinkeby',
		addNetworkInfo: {
			nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
			rpcUrl: 'https://rinkeby.boba.network/'
		}
	}
};
