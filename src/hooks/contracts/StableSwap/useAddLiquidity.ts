import { useSmartContractTransaction } from '@elementfi/react-query-typechain';
import { swapContracts } from 'core/contracts';
import { ContractReceipt, Signer } from 'ethers';
import { UseMutationResult } from 'react-query';
import { StableSwap3Pool } from 'types/contracts/exchange';

export default function useAddLiquidity(
	signer: Signer | undefined,
	swap: string
): UseMutationResult<ContractReceipt | undefined, unknown, Parameters<StableSwap3Pool['add_liquidity']>> {
	const swapContract = swapContracts.get(swap);

	const addLiquidity = useSmartContractTransaction(swapContract, 'add_liquidity', signer);
	return addLiquidity;
}
