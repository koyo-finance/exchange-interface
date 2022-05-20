import { useSmartContractTransaction } from '@elementfi/react-query-typechain';
import { swapContracts } from 'core/contracts';
import { ContractReceipt, Signer } from 'ethers';
import { UseMutationResult } from 'react-query';
import { StableSwap4Pool } from 'types/contracts/exchange';
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';

export default function useRemoveSingleCoinLiquidity(
	signer: Signer | undefined,
	swap: string
): UseMutationResult<ContractReceipt | undefined, unknown, Parameters<StableSwap4Pool['remove_liquidity_one_coin']>> {
	const addRecentTransaction = useAddRecentTransaction();

	const swapContract = swapContracts.get(swap);

	const removeLiquidityOneCoin = useSmartContractTransaction(swapContract, 'remove_liquidity_one_coin', signer, {
		onTransactionSubmitted: (tx) => {
			addRecentTransaction({
				hash: tx.hash,
				description: 'Removing single coin liquidity.'
			});
		}
	});
	return removeLiquidityOneCoin;
}
