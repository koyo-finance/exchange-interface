import { useSmartContractTransaction } from '@koyofinance/react-query-typechain';
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import { ContractReceipt, Signer } from 'ethers';
import useVaultContract from 'hooks/contracts/useVaultContract';
import { UseMutationResult } from 'react-query';
import { Vault } from 'types/contracts/exchange';

export default function useBatchSwap(
	signer: Signer | undefined
): UseMutationResult<ContractReceipt | undefined, unknown, Parameters<Vault['batchSwap']>> {
	const addRecentTransaction = useAddRecentTransaction();
	const vaultContract = useVaultContract();

	const batchSwap = useSmartContractTransaction(vaultContract, 'batchSwap', signer, {
		onTransactionSubmitted: (tx) => {
			addRecentTransaction({
				hash: tx.hash,
				description: 'Swapping assets.'
			});
		},
		blockConfirmations: 2
	});

	return batchSwap;
}
