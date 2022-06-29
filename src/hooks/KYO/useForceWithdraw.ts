import { useSmartContractTransaction } from '@koyofinance/react-query-typechain';
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import { votingEscrowContract } from 'core/contracts';
import { ContractReceipt, Signer } from 'ethers';
import { UseMutationResult } from 'react-query';
import { VotingEscrow } from 'types/contracts/koyo';

export function useForceWithdrawLockedEscrow(
	signer: Signer | undefined
): UseMutationResult<ContractReceipt | undefined, unknown, Parameters<VotingEscrow['force_withdraw']>> {
	const addRecentTransaction = useAddRecentTransaction();

	return useSmartContractTransaction(votingEscrowContract, 'force_withdraw', signer, {
		onTransactionSubmitted(tx) {
			addRecentTransaction({
				hash: tx.hash,
				description: 'Force Withdraw locked KYO tokens.'
			});
		}
	});
}
