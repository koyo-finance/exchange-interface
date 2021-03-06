import { useSmartContractReadCall } from '@koyofinance/react-query-typechain';
import { votingEscrowContract } from 'core/contracts';
import { BigNumber } from 'ethers';
import { QueryObserverResult } from 'react-query';

export default function useGetLockTimeEscrow(account: string | null | undefined): QueryObserverResult<BigNumber> {
	return useSmartContractReadCall(votingEscrowContract, 'locked__end', {
		callArgs: [account as string],
		enabled: Boolean(account)
	});
}
