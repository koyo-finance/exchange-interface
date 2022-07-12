export enum SupportedChainId {
	BOBA = 288
}

export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = Object.values(SupportedChainId).filter(
	(id) => typeof id === 'number'
) as SupportedChainId[];

export const HEX_CHAIN_IDS: { [K in SupportedChainId]: string } = {
	[SupportedChainId.BOBA]: '0x120'
};

export const BOBA_MAINNET_RPC_URL = 'https://mainnet.boba.network';
export const BOBA_MAINNET_READ_RPC_URL = 'https://lightning-replica.boba.network';
export const BOBA_RINKEBY_RPC_URL = 'https://rinkeby.boba.network/';

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

export enum NetworkType {
	L2
}

interface BaseChainInfo {
	readonly networkType: NetworkType;
	readonly blockWaitMsBeforeWarning?: number;
	readonly explorer: string;
	readonly label: string;
	readonly addNetworkInfo: AddNetworkInfo;
}

export interface L2ChainInfo extends BaseChainInfo {
	readonly networkType: NetworkType.L2;
}

export type ChainInfoMap = { readonly [chainId: number]: L2ChainInfo } & {
	readonly [chainId in SupportedChainId]: L2ChainInfo;
};

export const CHAIN_INFO: ChainInfoMap = {
	[SupportedChainId.BOBA]: {
		networkType: NetworkType.L2,
		// blockWaitMsBeforeWarning: ms`25m`,
		explorer: 'https://bobascan.com/',
		label: 'Boba L2',
		addNetworkInfo: {
			nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
			rpcUrl: 'https://mainnet.boba.network'
		}
	}
};
