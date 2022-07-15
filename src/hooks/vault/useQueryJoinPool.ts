import { ContractMethodArgs, useSmartContractReadCall } from '@koyofinance/react-query-typechain';
import { BigNumber } from 'ethers';
import useVaultHelpersContract from 'hooks/contracts/useVaultHelpersContract';
import { useWeb3 } from 'hooks/useWeb3';
import { QueryObserverResult } from 'react-query';
import { KoyoHelpers } from 'types/contracts/exchange';

export default function useQueryJoinPool(params: ContractMethodArgs<KoyoHelpers, 'queryJoin'>): QueryObserverResult<[BigNumber, BigNumber[]]> {
	const { chainId } = useWeb3();
	const vaultHelperContract = useVaultHelpersContract();

	return useSmartContractReadCall(vaultHelperContract, 'queryJoin', {
		callArgs: params, //
		chainId,
		enabled: params.every(Boolean)
	});
}
