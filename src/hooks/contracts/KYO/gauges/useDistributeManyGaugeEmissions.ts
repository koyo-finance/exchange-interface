import { useSmartContractTransaction } from '@koyofinance/react-query-typechain';
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import { gaugeDistributorContract } from 'core/contracts';
import { ContractReceipt, Signer } from 'ethers';
import { UseMutationResult } from 'react-query';
import { GaugeDistributor } from 'types/contracts/koyo';

export function useDistributeManyGaugeEmissions(
	signer: Signer | undefined
): UseMutationResult<ContractReceipt | undefined, unknown, Parameters<GaugeDistributor['distribute_many']>> {
	const addRecentTransaction = useAddRecentTransaction();

	return useSmartContractTransaction(gaugeDistributorContract, 'distribute_many', signer, {
		onTransactionSubmitted(tx) {
			addRecentTransaction({
				hash: tx.hash,
				description: 'Distributing emissions from multiple gauges.'
			});
		}
	});
}
