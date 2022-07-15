import { useSmartContractTransaction } from '@koyofinance/react-query-typechain';
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import { ContractReceipt, Signer } from 'ethers';
import useOracleWeigtedPoolFactoryContract from 'hooks/contracts/useOracleWeigtedPoolFactoryContract';
import { UseMutationResult } from 'react-query';
import { OracleWeightedPoolFactory } from 'types/contracts/exchange';

export default function useCreateOracleWeightedPool(
	signer: Signer | undefined
): UseMutationResult<ContractReceipt | undefined, unknown, Parameters<OracleWeightedPoolFactory['create']>> {
	const addRecentTransaction = useAddRecentTransaction();
	const oracleWeightedPoolFactoryContract = useOracleWeigtedPoolFactoryContract();

	const createOracleWeightedPool = useSmartContractTransaction(oracleWeightedPoolFactoryContract, 'create', signer, {
		onTransactionSubmitted: (tx) => {
			addRecentTransaction({
				hash: tx.hash,
				description: 'Creating oracle weighted pool.'
			});
		},
		blockConfirmations: 2
	});

	return createOracleWeightedPool;
}
