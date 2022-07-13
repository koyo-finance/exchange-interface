import { useSmartContractTransaction } from '@koyofinance/react-query-typechain';
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import { ContractReceipt, Signer } from 'ethers';
import useStablePoolFactoryContract from 'hooks/contracts/useStablePoolFactoryContract';
import { UseMutationResult } from 'react-query';
import { StablePoolFactory } from 'types/contracts/exchange/StablePoolFactory';

export default function useCreateStablePool(
	signer: Signer | undefined
): UseMutationResult<ContractReceipt | undefined, unknown, Parameters<StablePoolFactory['create']>> {
	const addRecentTransaction = useAddRecentTransaction();
	const stablePoolFactoryContract = useStablePoolFactoryContract();

	const createStablePool = useSmartContractTransaction(stablePoolFactoryContract, 'create', signer, {
		onTransactionSubmitted: (tx) => {
			addRecentTransaction({
				hash: tx.hash,
				description: 'Creating stable pool.'
			});
		},
		blockConfirmations: 2
	});

	return createStablePool;
}
