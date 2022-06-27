import { ContractMethodArgs } from '@koyofinance/react-query-typechain';
import { ContractReceipt, Signer } from 'ethers';
import { useMutation } from 'react-query';
import { PoolType } from 'state/reducers/createPool';
import { OracleWeightedPoolFactory, StablePoolFactory, WeightedPoolFactory } from 'types/contracts/exchange';
import useCreateOracleWeightedPool from './contracts/exchange/useCreateOracleWeightedPool';
import useCreateStablePool from './contracts/exchange/useCreateStablePool';
import useCreateWeightedPool from './contracts/exchange/useCreateWeightedPool';

export type CreateWeightedPoolParameters = ContractMethodArgs<WeightedPoolFactory, 'create'>;
export type CreateOracleWeightedPoolParameters = ContractMethodArgs<OracleWeightedPoolFactory, 'create'>;
export type CreateStablePoolParameters = ContractMethodArgs<StablePoolFactory, 'create'>;

export function useCreatePool(signer: Signer | undefined) {
	const { mutateAsync: createWeightedPool } = useCreateWeightedPool(signer);
	const { mutateAsync: createOracleWeightedPool } = useCreateOracleWeightedPool(signer);
	const { mutateAsync: createStablePool } = useCreateStablePool(signer);

	return useMutation({
		mutationFn: async (
			variables: [
				poolType: PoolType,
				creationParameters?: CreateWeightedPoolParameters | CreateOracleWeightedPoolParameters | CreateStablePoolParameters
			]
		): Promise<ContractReceipt> => {
			const [poolType, creationParameters] = variables;
			if (!poolType || !creationParameters) {
				console.warn('Tried to create pool without appropriate parameters.');
				return undefined as unknown as ContractReceipt;
			}

			switch (poolType) {
				case PoolType.WEIGHTED: {
					const tx = await createWeightedPool(creationParameters as CreateWeightedPoolParameters);
					return tx as ContractReceipt;
				}
				case PoolType.ORACLE_WEIGHTED: {
					const tx = await createOracleWeightedPool(creationParameters as CreateOracleWeightedPoolParameters);
					return tx as ContractReceipt;
				}
				case PoolType.STABLE: {
					const tx = await createStablePool(creationParameters as CreateStablePoolParameters);
					return tx as ContractReceipt;
				}
			}
		}
	});
}
