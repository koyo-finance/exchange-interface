import { useSmartContractTransaction } from '@koyofinance/react-query-typechain';
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import { vaultContract } from 'core/contracts';
import { ContractReceipt, Signer } from 'ethers';
import { UseMutationResult } from 'react-query';
import { Vault } from 'types/contracts/exchange';

export default function useBatchSwap(
	signer: Signer | undefined
): UseMutationResult<ContractReceipt | undefined, unknown, Parameters<Vault['batchSwap']>> {
	const addRecentTransaction = useAddRecentTransaction();

	const batchSwap = useSmartContractTransaction(vaultContract, 'batchSwap', signer, {
		onTransactionSubmitted: (tx) => {
			addRecentTransaction({
				hash: tx.hash,
				description: 'Swapping assets.'
			});
		}
	});

	return batchSwap;
}
