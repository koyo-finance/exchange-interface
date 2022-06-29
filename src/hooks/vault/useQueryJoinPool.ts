import { ContractMethodArgs, useSmartContractReadCall } from '@koyofinance/react-query-typechain';
import { vaultHelperContract } from 'core/contracts';
import { BigNumber } from 'ethers';
import { QueryObserverResult } from 'react-query';
import { KoyoHelpers } from 'types/contracts/exchange';

export default function useQueryJoinPool(params: ContractMethodArgs<KoyoHelpers, 'queryJoin'>): QueryObserverResult<[BigNumber, BigNumber[]]> {
	return useSmartContractReadCall(vaultHelperContract, 'queryJoin', { callArgs: params, enabled: params.every(Boolean) });
}
