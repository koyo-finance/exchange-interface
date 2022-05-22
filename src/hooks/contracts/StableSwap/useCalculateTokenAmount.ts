import { useSmartContractReadCall } from '@elementfi/react-query-typechain';
import { swapContracts } from 'core/contracts';
import { BigNumberish } from 'ethers';
import { QueryObserverResult } from 'react-query';

export default function useCalculateTokenAmount(
	amounts: BigNumberish[] | null | undefined,
	isDeposit: boolean | null | undefined,
	swap: string
): QueryObserverResult<BigNumberish> {
	const swapContract = swapContracts.get(swap);

	return useSmartContractReadCall(swapContract, 'calc_token_amount', {
		// @ts-expect-error This function can be used more fluidly.
		callArgs: [amounts as BigNumberish[], isDeposit as boolean],
		enabled: Boolean(amounts && amounts.length !== 0 && swapContract)
	});
}
