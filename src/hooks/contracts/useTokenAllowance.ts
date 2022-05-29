import { ERC20Permit, ERC20Permit__factory } from '@elementfi/elf-council-typechain';
import { ContractMethodArgs, useSmartContractReadCall } from '@elementfi/react-query-typechain';
import { BigNumberish } from 'ethers';
import { getAddress } from 'ethers/lib/utils';
import { bobaReadonlyProvider } from 'hooks/useProviders';
import { QueryObserverResult } from 'react-query';

export default function useTokenAllowance(
	account: string | null | undefined,
	spender: string | null | undefined,
	tokenAddress: string | null | undefined
): QueryObserverResult<BigNumberish> {
	const tokenContract: ERC20Permit | undefined = tokenAddress ? ERC20Permit__factory.connect(tokenAddress, bobaReadonlyProvider) : undefined;

	return useSmartContractReadCall(tokenContract, 'allowance', {
		callArgs: [account as string, spender as string].map((addr) => (addr ? getAddress(addr) : addr)) as ContractMethodArgs<
			ERC20Permit,
			'allowance'
		>,
		enabled: Boolean(account && spender && tokenAddress)
	});
}
