import { useSmartContractReadCall } from '@koyofinance/react-query-typechain';
import { BigNumber } from 'ethers';
import { bobaReadonlyProvider } from 'hooks/useProviders';
import { QueryObserverResult } from 'react-query';
import { Gauge, Gauge__factory } from 'types/contracts/koyo';

export default function useCheckClaimableTokens(
	account: string | null | undefined,
	gaugeAddress: string | null | undefined
): QueryObserverResult<BigNumber> {
	const gaugeContract: Gauge | undefined = gaugeAddress ? Gauge__factory.connect(gaugeAddress, bobaReadonlyProvider) : undefined;

	return useSmartContractReadCall(gaugeContract, 'claimable_tokens(address)', {
		callArgs: [account as string],
		enabled: Boolean(account && gaugeAddress && gaugeContract)
	});
}
