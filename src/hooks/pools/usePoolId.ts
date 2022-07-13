import { ChainId } from '@koyofinance/core-sdk';
import { useSmartContractReadCall } from '@koyofinance/react-query-typechain';
import useProviders from 'hooks/useProviders';
import { useWeb3 } from 'hooks/useWeb3';
import { QueryObserverResult } from 'react-query';
import { BasePool__factory } from 'types/contracts/exchange/factories/BasePool__factory';

export default function usePoolId(poolAddress: string | undefined | null, chainId?: ChainId): QueryObserverResult<string> {
	const { defaultedProvider, chainId: activeChainId } = useWeb3();
	const providers = useProviders();

	const pool = poolAddress
		? BasePool__factory.connect(
				poolAddress, //
				providers[activeChainId || chainId] || defaultedProvider
		  )
		: undefined;

	return useSmartContractReadCall(pool, 'getPoolId', { enabled: Boolean(poolAddress && pool) });
}
