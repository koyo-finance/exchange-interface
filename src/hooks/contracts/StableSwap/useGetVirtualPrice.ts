import { useSmartContractReadCall } from '@elementfi/react-query-typechain';
import { swapContracts } from 'core/contracts';
import { BigNumberish } from 'ethers';
import { QueryObserverResult } from 'react-query';

export default function useGetVirtualPrice(swap: string): QueryObserverResult<BigNumberish> {
	const swapContract = swapContracts.get(swap);

	return useSmartContractReadCall(swapContract, 'get_virtual_price', {
		enabled: Boolean(swapContract)
	});
}
