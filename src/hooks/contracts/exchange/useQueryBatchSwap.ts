import { ContractMethodArgs, useSmartContractReadCall } from '@koyofinance/react-query-typechain';
import { vaultContract } from 'core/contracts';
import { BigNumber } from 'ethers';
import { QueryObserverResult } from 'react-query';
import { Vault } from 'types/contracts/exchange';

export default function useQueryBatchSwap(params: ContractMethodArgs<Vault, 'queryBatchSwap'>): QueryObserverResult<BigNumber[]> {
	return useSmartContractReadCall(vaultContract, 'queryBatchSwap', { callArgs: params, enabled: params.every(Boolean) });
}
