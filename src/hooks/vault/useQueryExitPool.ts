import { ContractMethodArgs, useSmartContractReadCall } from '@koyofinance/react-query-typechain';
import { BigNumber } from 'ethers';
import useVaultHelpersContract from 'hooks/contracts/useVaultHelpersContract';
import { QueryObserverResult } from 'react-query';
import { KoyoHelpers } from 'types/contracts/exchange';

export default function useQueryExitPool(params: ContractMethodArgs<KoyoHelpers, 'queryExit'>): QueryObserverResult<[BigNumber, BigNumber[]]> {
	const vaultHelperContract = useVaultHelpersContract();

	return useSmartContractReadCall(vaultHelperContract, 'queryExit', { callArgs: params, enabled: params.every(Boolean) });
}
