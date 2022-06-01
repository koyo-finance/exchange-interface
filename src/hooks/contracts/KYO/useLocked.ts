import { useSmartContractReadCall } from '@elementfi/react-query-typechain';
import { votingEscrowContract } from 'core/contracts';
import { QueryObserverResult } from 'react-query';
import { LockedBalance } from 'types/contracts/koyo/structs';

export default function useLocked(account: string | null | undefined): QueryObserverResult<LockedBalance> {
	return useSmartContractReadCall(votingEscrowContract, 'locked(address)', {
		callArgs: [account as string],
		enabled: Boolean(account)
	});
}
