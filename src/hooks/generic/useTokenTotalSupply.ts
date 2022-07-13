import { ERC20PermitWithMint__factory } from '@elementfi/elf-council-typechain';
import { useSmartContractReadCall } from '@koyofinance/react-query-typechain';
import { BigNumberish } from 'ethers';
import { useWeb3 } from 'hooks/useWeb3';
import { QueryObserverResult } from 'react-query';

export default function useTokenTotalSupply(tokenAddress: string | null | undefined): QueryObserverResult<BigNumberish> {
	const { defaultedProvider, chainId } = useWeb3();
	const tokenContract = tokenAddress ? ERC20PermitWithMint__factory.connect(tokenAddress, defaultedProvider) : undefined;

	return useSmartContractReadCall(tokenContract, 'totalSupply()' as 'totalSupply', {
		chainId,
		enabled: Boolean(tokenContract)
	});
}
