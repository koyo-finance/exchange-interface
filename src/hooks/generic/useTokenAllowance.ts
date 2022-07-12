import { ERC20Permit, ERC20Permit__factory } from '@elementfi/elf-council-typechain';
import { ContractMethodArgs, useSmartContractReadCall } from '@koyofinance/react-query-typechain';
import { BigNumberish } from 'ethers';
import { getAddress } from 'ethers/lib/utils';
import { useWeb3 } from 'hooks/useWeb3';
import { useMemo } from 'react';
import { QueryObserverResult } from 'react-query';

export default function useTokenAllowance(
	account: string | null | undefined,
	spender: string | null | undefined,
	tokenAddress: string | null | undefined
): QueryObserverResult<BigNumberish> {
	const { defaultedProvider } = useWeb3();
	const tokenContract = useMemo(
		() => (tokenAddress ? ERC20Permit__factory.connect(tokenAddress, defaultedProvider) : undefined),
		[tokenAddress, defaultedProvider]
	);

	return useSmartContractReadCall(tokenContract, 'allowance', {
		callArgs: [account as string, spender as string].map((addr) => (addr ? getAddress(addr) : addr)) as ContractMethodArgs<
			ERC20Permit,
			'allowance'
		>,
		enabled: Boolean(account && spender && tokenAddress)
	});
}
