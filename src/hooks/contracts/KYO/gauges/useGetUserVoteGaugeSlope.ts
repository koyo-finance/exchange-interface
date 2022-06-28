import { useSmartContractReadCall } from '@koyofinance/react-query-typechain';
import { gaugeControllerContract } from 'core/contracts';
import { BigNumber } from 'ethers';
import { QueryObserverResult } from 'react-query';

export default function useGetUserVoteGaugeSlope(
	account: string | null | undefined,
	guage: string | null | undefined
): QueryObserverResult<[BigNumber, BigNumber, BigNumber]> {
	return useSmartContractReadCall(gaugeControllerContract, 'vote_user_slopes', {
		callArgs: [account as string, guage as string],
		enabled: Boolean(account && guage)
	});
}
