import { CHAIN_INFO, SupportedChainId } from 'constants/chains';

export enum ExplorerType {
	Account,
	Transaction,
	Block
}

export type ExplorerData = [chainId: SupportedChainId, address: string];

export function formatExplorerLink(type: ExplorerType, data: ExplorerData) {
	switch (type) {
		case ExplorerType.Account: {
			const [chainId, address] = data;
			return `${CHAIN_INFO[chainId].explorer}/address/${address}`;
		}
		case ExplorerType.Transaction: {
			const [chainId, hash] = data;
			return `${CHAIN_INFO[chainId].explorer}/tx/${hash}`;
		}
		case ExplorerType.Block: {
			const [chainId, block] = data;
			return `${CHAIN_INFO[chainId].explorer}/block/${block}`;
		}
	}
}
