import { useSmartContractReadCall } from '@koyofinance/react-query-typechain';
import { bobaReadonlyProvider } from 'hooks/useProviders';
import { QueryObserverResult } from 'react-query';
import { BasePool__factory } from 'types/contracts/exchange/factories/BasePool__factory';

export default function usePoolId(poolAddress: string | undefined | null): QueryObserverResult<string> {
	const pool = poolAddress ? BasePool__factory.connect(poolAddress, bobaReadonlyProvider) : undefined;

	return useSmartContractReadCall(pool, 'getPoolId', { enabled: Boolean(poolAddress && pool) });
}
