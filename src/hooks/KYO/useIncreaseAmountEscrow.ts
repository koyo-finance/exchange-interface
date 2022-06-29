import { useSmartContractTransaction } from '@koyofinance/react-query-typechain';
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import { votingEscrowContract } from 'core/contracts';
import { ContractReceipt, Signer } from 'ethers';
import { UseMutationResult } from 'react-query';
import { VotingEscrow } from 'types/contracts/koyo';

export function useIncreaseAmountEscrow(
	signer: Signer | undefined
): UseMutationResult<ContractReceipt | undefined, unknown, Parameters<VotingEscrow['increase_amount']>> {
	const addRecentTransaction = useAddRecentTransaction();

	return useSmartContractTransaction(votingEscrowContract, 'increase_amount', signer, {
		onTransactionSubmitted(tx) {
			addRecentTransaction({
				hash: tx.hash,
				description: 'Increasing locked KYO.'
			});
		}
	});
}
