import { ERC20PermitWithMint__factory } from '@elementfi/elf-council-typechain';
import { useSmartContractReadCall } from '@koyofinance/react-query-typechain';
import { BigNumberish } from 'ethers';
import { useWeb3 } from 'hooks/useWeb3';
import { useMemo } from 'react';
import { QueryObserverResult } from 'react-query';

export default function useTokenTotalSupply(tokenAddress: string | null | undefined): QueryObserverResult<BigNumberish> {
	const { defaultedProvider } = useWeb3();
	const tokenContract = useMemo(
		() => (tokenAddress ? ERC20PermitWithMint__factory.connect(tokenAddress, defaultedProvider) : undefined),
		[tokenAddress, defaultedProvider]
	);

	return useSmartContractReadCall(tokenContract, 'totalSupply()' as 'totalSupply', {
		enabled: Boolean(tokenContract)
	});
}
