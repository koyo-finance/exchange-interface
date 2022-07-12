import { ERC20Permit, ERC20Permit__factory } from '@elementfi/elf-council-typechain';
import { ContractMethodArgs, useSmartContractReadCalls } from '@koyofinance/react-query-typechain';
import { BigNumberish } from 'ethers';
import { getAddress } from 'ethers/lib/utils';
import { useWeb3 } from 'hooks/useWeb3';
import { useMemo } from 'react';
import { QueryObserverResult } from 'react-query';

export default function useMultiTokenBalances(
	account: string | null | undefined,
	tokenAddresses: (string | undefined | null)[] = []
): QueryObserverResult<BigNumberish>[] {
	const { defaultedProvider } = useWeb3();
	const tokenContracts = useMemo(
		() => tokenAddresses.map((tokenAddress) => (tokenAddress ? ERC20Permit__factory.connect(tokenAddress, defaultedProvider) : undefined)),
		[tokenAddresses, defaultedProvider]
	);

	return useSmartContractReadCalls(tokenContracts, 'balanceOf(address)' as 'balanceOf', {
		callArgs: [account as string].map((addr) => (addr ? getAddress(addr) : addr)) as ContractMethodArgs<ERC20Permit, 'balanceOf'>,
		enabled: Boolean(account && tokenContracts.length !== 0 && tokenContracts.every(Boolean))
	});
}
