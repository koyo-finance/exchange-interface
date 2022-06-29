import { useSmartContractTransaction } from '@koyofinance/react-query-typechain';
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import { kyoMinterContract } from 'core/contracts';
import { ContractReceipt, Signer } from 'ethers';
import { UseMutationResult } from 'react-query';
import { Minter } from 'types/contracts/koyo';

export function useMintAndDistribute(
	signer: Signer | undefined
): UseMutationResult<ContractReceipt | undefined, unknown, Parameters<Minter['mint_and_distribute']>> {
	const addRecentTransaction = useAddRecentTransaction();

	return useSmartContractTransaction(kyoMinterContract, 'mint_and_distribute', signer, {
		onTransactionSubmitted: (tx) => {
			addRecentTransaction({
				hash: tx.hash,
				description: 'Minting and distributing KYO.'
			});
		}
	});
}
