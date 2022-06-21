import { ContractMethodArgs, useSmartContractReadCall } from '@koyofinance/react-query-typechain';
import { vaultHelperContract } from 'core/contracts';
import { BigNumber } from 'ethers';
import { QueryObserverResult } from 'react-query';
import { KoyoHelpers } from 'types/contracts/exchange';

export default function useQueryExitPool(params: ContractMethodArgs<KoyoHelpers, 'queryExit'>): QueryObserverResult<[BigNumber, BigNumber[]]> {
	return useSmartContractReadCall(vaultHelperContract, 'queryExit', { callArgs: params, enabled: params.every(Boolean) });
}
