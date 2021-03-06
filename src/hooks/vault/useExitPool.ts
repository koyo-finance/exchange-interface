import { useSmartContractTransaction } from '@koyofinance/react-query-typechain';
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import { ContractReceipt, Signer } from 'ethers';
import useVaultContract from 'hooks/contracts/useVaultContract';
import { UseMutationResult } from 'react-query';
import { Vault } from 'types/contracts/exchange';

export default function useExitPool(
	signer: Signer | undefined
): UseMutationResult<ContractReceipt | undefined, unknown, Parameters<Vault['exitPool']>> {
	const addRecentTransaction = useAddRecentTransaction();
	const vaultContract = useVaultContract();

	const exitPool = useSmartContractTransaction(vaultContract, 'exitPool', signer, {
		onTransactionSubmitted: (tx) => {
			addRecentTransaction({
				hash: tx.hash,
				description: 'Exiting pool.'
			});
		},
		blockConfirmations: 2
	});

	return exitPool;
}
