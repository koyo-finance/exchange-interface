import { useSmartContractTransaction } from '@koyofinance/react-query-typechain';
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import { vaultContract } from 'core/contracts';
import { ContractReceipt, Signer } from 'ethers';
import { UseMutationResult } from 'react-query';
import { Vault } from 'types/contracts/exchange';

export default function useSwap(signer: Signer | undefined): UseMutationResult<ContractReceipt | undefined, unknown, Parameters<Vault['swap']>> {
	const addRecentTransaction = useAddRecentTransaction();

	const swap = useSmartContractTransaction(vaultContract, 'swap', signer, {
		onTransactionSubmitted: (tx) => {
			addRecentTransaction({
				hash: tx.hash,
				description: 'Swapping assets.'
			});
		}
	});

	return swap;
}
