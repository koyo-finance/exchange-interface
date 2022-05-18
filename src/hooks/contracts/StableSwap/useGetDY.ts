import { useSmartContractReadCall } from '@elementfi/react-query-typechain';
import { swapContracts } from 'core/contracts';
import { BigNumberish } from 'ethers';
import { QueryObserverResult } from 'react-query';

export default function useGetDY(
	i: BigNumberish | null | undefined,
	j: BigNumberish | null | undefined,
	dx: BigNumberish | null | undefined,
	swap: string
): QueryObserverResult<BigNumberish> {
	const iValid = i !== undefined && i !== null && i !== -1;
	const jValid = j !== undefined && j !== null && j !== -1;

	const swapContract = swapContracts.get(swap);

	return useSmartContractReadCall(swapContract, 'get_dy', {
		callArgs: [i as BigNumberish, j as BigNumberish, dx as BigNumberish],
		enabled: Boolean(iValid && jValid && dx && swapContract)
	});
}
