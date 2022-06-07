import { ContractMethodArgs, useSmartContractReadCalls } from '@koyofinance/react-query-typechain';
import { BigNumber } from 'ethers';
import { getAddress } from 'ethers/lib/utils';
import { bobaReadonlyProvider } from 'hooks/useProviders';
import { QueryObserverResult } from 'react-query';
import { Gauge, Gauge__factory } from 'types/contracts/koyo';

export default function useCheckClaimableTokens(
	account: string | null | undefined,
	gaugeAddresses: (string | undefined | null)[] = []
): QueryObserverResult<BigNumber>[] {
	const gaugeContracts: (Gauge | undefined)[] = gaugeAddresses.map((gaugeAddress) =>
		gaugeAddress ? Gauge__factory.connect(gaugeAddress, bobaReadonlyProvider) : undefined
	);

	return useSmartContractReadCalls(gaugeContracts, 'claimable_tokens(address)', {
		callArgs: [account as string].map((addr) => (addr ? getAddress(addr) : addr)) as ContractMethodArgs<Gauge, 'claimable_tokens(address)'>,
		enabled: Boolean(account && gaugeContracts.length !== 0 && gaugeContracts.every(Boolean))
	});
}
