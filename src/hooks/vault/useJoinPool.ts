import { useSmartContractTransaction } from '@koyofinance/react-query-typechain';
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import { ContractReceipt, Signer } from 'ethers';
import useVaultContract from 'hooks/contracts/useVaultContract';
import { UseMutationResult } from 'react-query';
import { Vault } from 'types/contracts/exchange';

export default function useJoinPool(
	signer: Signer | undefined
): UseMutationResult<ContractReceipt | undefined, unknown, Parameters<Vault['joinPool']>> {
	const addRecentTransaction = useAddRecentTransaction();
	const vaultContract = useVaultContract();

	const joinPool = useSmartContractTransaction(vaultContract, 'joinPool', signer, {
		onTransactionSubmitted: (tx) => {
			addRecentTransaction({
				hash: tx.hash,
				description: 'Joining pool.'
			});
		},
		blockConfirmations: 2
	});

	return joinPool;
}
