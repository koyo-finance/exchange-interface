import { useSmartContractTransaction } from '@koyofinance/react-query-typechain';
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import { weightedPoolFactoryContract } from 'core/contracts';
import { ContractReceipt, Signer } from 'ethers';
import { UseMutationResult } from 'react-query';
import { WeightedPoolFactory } from 'types/contracts/exchange';

export default function useCreateWeightedPool(
	signer: Signer | undefined
): UseMutationResult<ContractReceipt | undefined, unknown, Parameters<WeightedPoolFactory['create']>> {
	const addRecentTransaction = useAddRecentTransaction();

	const createWeightedPool = useSmartContractTransaction(weightedPoolFactoryContract, 'create', signer, {
		onTransactionSubmitted: (tx) => {
			addRecentTransaction({
				hash: tx.hash,
				description: 'Creating weighted pool.'
			});
		}
	});

	return createWeightedPool;
}
