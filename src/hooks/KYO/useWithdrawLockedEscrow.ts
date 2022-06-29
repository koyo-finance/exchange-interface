import { useSmartContractTransaction } from '@koyofinance/react-query-typechain';
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import { votingEscrowContract } from 'core/contracts';
import { ContractReceipt, Signer } from 'ethers';
import { UseMutationResult } from 'react-query';
import { VotingEscrow } from 'types/contracts/koyo';

export function useWithdrawLockedEscrow(
	signer: Signer | undefined
): UseMutationResult<ContractReceipt | undefined, unknown, Parameters<VotingEscrow['withdraw']>> {
	const addRecentTransaction = useAddRecentTransaction();

	return useSmartContractTransaction(votingEscrowContract, 'withdraw', signer, {
		onTransactionSubmitted(tx) {
			addRecentTransaction({
				hash: tx.hash,
				description: 'Withdraw locked KYO tokens.'
			});
		}
	});
}
