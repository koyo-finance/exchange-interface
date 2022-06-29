import { useSmartContractTransaction } from '@koyofinance/react-query-typechain';
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import { gaugeControllerContract } from 'core/contracts';
import { ContractReceipt, Signer } from 'ethers';
import { UseMutationResult } from 'react-query';
import { GaugeController } from 'types/contracts/koyo';

export function useVoteForGaugeWeights(
	signer: Signer | undefined
): UseMutationResult<ContractReceipt | undefined, unknown, Parameters<GaugeController['vote_for_gauge_weights']>> {
	const addRecentTransaction = useAddRecentTransaction();

	return useSmartContractTransaction(gaugeControllerContract, 'vote_for_gauge_weights', signer, {
		onTransactionSubmitted(tx) {
			addRecentTransaction({
				hash: tx.hash,
				description: 'Voted for gauge weight.'
			});
		}
	});
}
