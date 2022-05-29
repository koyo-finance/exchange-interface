import { ERC20Permit, ERC20Permit__factory } from '@elementfi/elf-council-typechain';
import { ContractMethodArgs, useSmartContractReadCalls } from '@elementfi/react-query-typechain';
import { BigNumberish } from 'ethers';
import { getAddress } from 'ethers/lib/utils';
import { bobaReadonlyProvider } from 'hooks/useProviders';
import { QueryObserverResult } from 'react-query';

export default function useMultiTokenBalances(
	account: string | null | undefined,
	tokenAddresses: (string | undefined | null)[] = []
): QueryObserverResult<BigNumberish>[] {
	const tokenContracts: (ERC20Permit | undefined)[] = tokenAddresses.map((tokenAddress) =>
		tokenAddress ? ERC20Permit__factory.connect(tokenAddress, bobaReadonlyProvider) : undefined
	);

	return useSmartContractReadCalls(tokenContracts, 'balanceOf(address)' as 'balanceOf', {
		callArgs: [account as string].map((addr) => (addr ? getAddress(addr) : addr)) as ContractMethodArgs<ERC20Permit, 'balanceOf'>,
		enabled: Boolean(account && tokenContracts.length !== 0 && tokenContracts.every(Boolean))
	});
}
