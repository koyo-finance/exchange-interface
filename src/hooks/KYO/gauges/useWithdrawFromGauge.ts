import { useSmartContractTransaction } from '@koyofinance/react-query-typechain';
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import { ContractReceipt, Signer } from 'ethers';
import { bobaReadonlyProvider } from 'hooks/useProviders';
import { UseMutationResult } from 'react-query';
import { Gauge, Gauge__factory } from 'types/contracts/koyo';

export function useWithdrawFromGauge(
	signer: Signer | undefined,
	gaugeAddress: string | undefined
): UseMutationResult<ContractReceipt | undefined, unknown, Parameters<Gauge['withdraw(uint256)']>> {
	const addRecentTransaction = useAddRecentTransaction();

	const gaugeContract: Gauge | undefined = gaugeAddress ? Gauge__factory.connect(gaugeAddress, bobaReadonlyProvider) : undefined;

	return useSmartContractTransaction(gaugeContract, 'withdraw(uint256)', signer, {
		onTransactionSubmitted(tx) {
			addRecentTransaction({
				hash: tx.hash,
				description: 'Withdrawing from gauge.'
			});
		}
	});
}
