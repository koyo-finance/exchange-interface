import { ContractMethodArgs, useSmartContractReadCall } from '@koyofinance/react-query-typechain';
import { BigNumber } from 'ethers';
import useVaultHelpersContract from 'hooks/contracts/useVaultHelpersContract';
import { useWeb3 } from 'hooks/useWeb3';
import { QueryObserverResult } from 'react-query';
import { KoyoHelpers } from 'types/contracts/exchange';

export default function useQueryExitPool(params: ContractMethodArgs<KoyoHelpers, 'queryExit'>): QueryObserverResult<[BigNumber, BigNumber[]]> {
	const { chainId } = useWeb3();
	const vaultHelperContract = useVaultHelpersContract();

	return useSmartContractReadCall(vaultHelperContract, 'queryExit', {
		callArgs: params, //
		chainId,
		enabled: params.every(Boolean)
	});
}
