import { ERC20PermitWithMint, ERC20PermitWithMint__factory } from '@elementfi/elf-council-typechain';
import { ContractMethodArgs, useSmartContractReadCall } from '@koyofinance/react-query-typechain';
import { BigNumberish } from 'ethers';
import { getAddress } from 'ethers/lib/utils';
import { useWeb3 } from 'hooks/useWeb3';
import { useMemo } from 'react';
import { QueryObserverResult } from 'react-query';

export default function useTokenBalance(
	account: string | null | undefined,
	tokenAddress: string | null | undefined
): QueryObserverResult<BigNumberish> {
	const { defaultedProvider } = useWeb3();
	const tokenContract = useMemo(
		() => (tokenAddress ? ERC20PermitWithMint__factory.connect(tokenAddress, defaultedProvider) : undefined),
		[tokenAddress, defaultedProvider]
	);

	return useSmartContractReadCall(tokenContract, 'balanceOf(address)' as 'balanceOf', {
		callArgs: [account as string].map((addr) => (addr ? getAddress(addr) : addr)) as ContractMethodArgs<ERC20PermitWithMint, 'balanceOf'>,
		enabled: Boolean(account && tokenContract)
	});
}
