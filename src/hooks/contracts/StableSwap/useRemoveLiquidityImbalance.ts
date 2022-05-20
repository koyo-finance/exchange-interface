import { useSmartContractTransaction } from '@elementfi/react-query-typechain';
import { swapContracts } from 'core/contracts';
import { ContractReceipt, Signer } from 'ethers';
import { UseMutationResult } from 'react-query';
import { StableSwap4Pool } from 'types/contracts/exchange';
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';

export default function useRemoveLiquidityImbalance(
	signer: Signer | undefined,
	swap: string
): UseMutationResult<ContractReceipt | undefined, unknown, Parameters<StableSwap4Pool['remove_liquidity_imbalance']>> {
	const addRecentTransaction = useAddRecentTransaction();

	const swapContract = swapContracts.get(swap);

	const removeLiquidityImbalnce = useSmartContractTransaction(swapContract, 'remove_liquidity_imbalance', signer, {
		onTransactionSubmitted: (tx) => {
			addRecentTransaction({
				hash: tx.hash,
				description: 'Removing imbalanced liquidity.'
			});
		}
	});
	return removeLiquidityImbalnce;
}
