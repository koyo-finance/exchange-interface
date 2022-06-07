import { ERC20Permit } from '@elementfi/elf-council-typechain';
import { makeSmartContractReadCallQueryKey, useSmartContractTransaction } from '@koyofinance/react-query-typechain';
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import { swapContracts } from 'core/contracts';
import { ContractReceipt, Signer } from 'ethers';
import { getAddress } from 'ethers/lib/utils';
import { UseMutationResult, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { selectAllPools } from 'state/reducers/lists';
import { StableSwap4Pool } from 'types/contracts/exchange';

export default function useExchange(
	signer: Signer | undefined,
	swap: string
): UseMutationResult<ContractReceipt | undefined, unknown, Parameters<StableSwap4Pool['exchange']>> {
	const queryClient = useQueryClient();
	const pools = useSelector(selectAllPools());
	const addRecentTransaction = useAddRecentTransaction();

	const swapContract = swapContracts.get(swap);

	const exchange = useSmartContractTransaction(swapContract, 'exchange', signer, {
		onTransactionSubmitted: (tx) => {
			addRecentTransaction({
				hash: tx.hash,
				description: 'Swapping tokens.'
			});
		},
		onTransactionMined: async (tx, [i, j]) => {
			if (swapContract) {
				const pool = pools.find((pool) => pool.addresses.swap.toLowerCase() === swapContract.address.toLowerCase());

				for (const tIndex of [i, j]) {
					await queryClient.invalidateQueries(
						makeSmartContractReadCallQueryKey<ERC20Permit, 'balanceOf'>(
							pool ? getAddress(pool.coins[tIndex as number].address) : '',
							'balanceOf(address)' as 'balanceOf',
							[getAddress(tx.from)]
						)
					);
				}
			}
		}
	});
	return exchange;
}
