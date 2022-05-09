import { useSmartContractTransaction } from '@elementfi/react-query-typechain';
import { swapContracts } from 'core/contracts';
import { ContractReceipt, Signer } from 'ethers';
import { UseMutationResult } from 'react-query';
import { StableSwap4Pool } from 'types/contracts/exchange';
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';

export default function useExchange(
	signer: Signer | undefined,
	swap: string
): UseMutationResult<ContractReceipt | undefined, unknown, Parameters<StableSwap4Pool['exchange']>> {
	const addRecentTransaction = useAddRecentTransaction();

	const swapContract = swapContracts.get(swap);

	const exchange = useSmartContractTransaction(swapContract, 'exchange', signer, {
		onTransactionSubmitted: (tx) => {
			addRecentTransaction({
				hash: tx.hash,
				description: 'Swapping tokens.'
			});
		}
	});
	return exchange;
}
