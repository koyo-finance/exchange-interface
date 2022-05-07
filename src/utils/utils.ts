import { CHAIN_INFO, SupportedChainId } from 'constants/chains';
import { BigNumberish } from 'ethers';
import { formatEther } from 'ethers/lib/utils';

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function noop() {}

export function shortenHex(hex: string, length = 4) {
	return `${hex.substring(0, length + 2)}…${hex.substring(hex.length - length)}`;
}

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

export function format18DecimalBalance(val: BigNumberish): string {
	return Number(formatEther(val)).toLocaleString('fullwide', {
		maximumFractionDigits: 5,
		minimumFractionDigits: 2
	});
}

export function calculate18DecimalPercentage(full: BigNumberish, part: BigNumberish): number {
	const fullNumber = Number(formatEther(full));
	const partNumber = Number(formatEther(part));

	const result = (100 * partNumber) / fullNumber;
	return Number.isNaN(result) ? 0 : result;
}
