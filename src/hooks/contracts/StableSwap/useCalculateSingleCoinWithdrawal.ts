import { useSmartContractReadCall } from '@elementfi/react-query-typechain';
import { swapContracts } from 'core/contracts';
import { BigNumberish } from 'ethers';
import { QueryObserverResult } from 'react-query';

export default function useCalculateSingleCoinWithdrawal(
	i: BigNumberish | null | undefined,
	amount: BigNumberish | null | undefined,
	swap: string
): QueryObserverResult<BigNumberish> {
	const iValid = i !== undefined && i !== null && i !== -1;

	const swapContract = swapContracts.get(swap);

	return useSmartContractReadCall(swapContract, 'calc_withdraw_one_coin', {
		callArgs: [amount as BigNumberish, i as BigNumberish],
		enabled: Boolean(iValid && amount && swapContract)
	});
}
