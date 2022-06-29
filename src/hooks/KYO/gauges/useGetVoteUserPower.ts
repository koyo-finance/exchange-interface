import { useSmartContractReadCall } from '@koyofinance/react-query-typechain';
import { gaugeControllerContract } from 'core/contracts';
import { BigNumber } from 'ethers';
import { QueryObserverResult } from 'react-query';

export default function useGetVoteUserPower(account: string | null | undefined): QueryObserverResult<BigNumber> {
	return useSmartContractReadCall(gaugeControllerContract, 'vote_user_power', {
		callArgs: [account as string],
		enabled: Boolean(account)
	});
}
