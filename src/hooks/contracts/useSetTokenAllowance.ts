import { ERC20Permit, ERC20Permit__factory } from '@elementfi/elf-council-typechain';
import { makeSmartContractReadCallQueryKey, useSmartContractTransaction } from '@elementfi/react-query-typechain';
import { ContractReceipt, Signer } from 'ethers';
import { UseMutationResult } from 'react-query';
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import { queryClient } from 'core/query';

export default function useSetTokenAllowance(
	signer: Signer | undefined,
	tokenAddress: string
): UseMutationResult<ContractReceipt | undefined, unknown, Parameters<ERC20Permit['approve']>> {
	const addRecentTransaction = useAddRecentTransaction();

	const tokenContract: ERC20Permit | undefined = signer ? ERC20Permit__factory.connect(tokenAddress, signer) : undefined;

	const approve = useSmartContractTransaction(tokenContract, 'approve', signer, {
		onTransactionSubmitted: (tx) => {
			addRecentTransaction({
				hash: tx.hash,
				description: 'Approving asset spending.'
			});
		},
		onTransactionMined: async (_, [spender]) => {
			if (tokenContract && signer && spender)
				queryClient.invalidateQueries(
					makeSmartContractReadCallQueryKey(tokenContract.address, 'allowance', [await signer.getAddress(), spender])
				);
		}
	});

	return approve;
}
