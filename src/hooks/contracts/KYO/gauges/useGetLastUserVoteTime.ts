import { useSmartContractReadCall } from '@koyofinance/react-query-typechain';
import { gaugeControllerContract } from 'core/contracts';
import { BigNumber } from 'ethers';
import { QueryObserverResult } from 'react-query';

export default function useGetLastUserVoteTime(
	account: string | null | undefined,
	gaugeAddress: string | null | undefined
): QueryObserverResult<BigNumber> {
	return useSmartContractReadCall(gaugeControllerContract, 'last_user_vote', {
		callArgs: [account as string, gaugeAddress as string],
		enabled: Boolean(account && gaugeAddress)
	});
}
