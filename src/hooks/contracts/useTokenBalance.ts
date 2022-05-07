import { ERC20PermitWithMint, ERC20PermitWithMint__factory } from '@elementfi/elf-council-typechain';
import { useSmartContractReadCall } from '@elementfi/react-query-typechain';
import { BigNumberish } from 'ethers';
import { bobaProvider } from 'hooks/useProviders';
import { QueryObserverResult } from 'react-query';

export default function useTokenBalance(
	account: string | null | undefined,
	tokenAddress: string | null | undefined
): QueryObserverResult<BigNumberish> {
	const tokenContract: ERC20PermitWithMint | undefined = tokenAddress
		? ERC20PermitWithMint__factory.connect(tokenAddress, bobaProvider)
		: undefined;

	return useSmartContractReadCall(tokenContract, 'balanceOf(address)' as 'balanceOf', {
		callArgs: [account as string],
		enabled: Boolean(account && tokenContract)
	});
}
