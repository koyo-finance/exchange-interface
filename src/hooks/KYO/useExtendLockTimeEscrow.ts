import { useSmartContractTransaction } from '@koyofinance/react-query-typechain';
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import { votingEscrowContract } from 'core/contracts';
import { ContractReceipt, Signer } from 'ethers';
import { UseMutationResult } from 'react-query';
import { VotingEscrow } from 'types/contracts/koyo';

export function useExtendLockTimeEscrow(
	signer: Signer | undefined
): UseMutationResult<ContractReceipt | undefined, unknown, Parameters<VotingEscrow['increase_unlock_time']>> {
	const addRecentTransaction = useAddRecentTransaction();

	return useSmartContractTransaction(votingEscrowContract, 'increase_unlock_time', signer, {
		onTransactionSubmitted(tx) {
			addRecentTransaction({
				hash: tx.hash,
				description: 'Extend the unlock time of KYO Locker.'
			});
		}
	});
}
