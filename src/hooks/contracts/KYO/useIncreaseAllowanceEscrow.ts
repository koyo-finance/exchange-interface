import { useSmartContractTransaction } from '@elementfi/react-query-typechain';
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import { kyoContract } from 'core/contracts';
import { ContractReceipt, Signer } from 'ethers';
import { UseMutationResult } from 'react-query';
import { Koyo } from 'types/contracts/koyo';

export function useIncreaseAllowanceEscrow(
	signer: Signer | undefined
): UseMutationResult<ContractReceipt | undefined, unknown, Parameters<Koyo['increaseAllowance']>> {
	const addRecentTransaction = useAddRecentTransaction();

	return useSmartContractTransaction(kyoContract, 'increaseAllowance', signer, {
		onTransactionSubmitted(tx) {
			addRecentTransaction({
				hash: tx.hash,
				description: 'Increasing allowance of KYO for spender.'
			});
		}
	});
}
