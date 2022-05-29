import { useSmartContractTransaction } from '@elementfi/react-query-typechain';
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import { votingEscrowContract } from 'core/contracts';
import { ContractReceipt, Signer } from 'ethers';
import { UseMutationResult } from 'react-query';
import { VotingEscrow } from 'types/contracts/koyo';

export function useCreateVotingEscrowLock(
	signer: Signer | undefined
): UseMutationResult<ContractReceipt | undefined, unknown, Parameters<VotingEscrow['create_lock']>> {
	const addRecentTransaction = useAddRecentTransaction();

	return useSmartContractTransaction(votingEscrowContract, 'create_lock', signer, {
		onTransactionSubmitted: (tx) => {
			addRecentTransaction({
				hash: tx.hash,
				description: 'Creating lock for KYO.'
			});
		}
	});
}
