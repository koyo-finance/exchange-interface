import { PoolFilter, SOR, SwapTypes } from '@balancer-labs/sor';
import { MaxUint256 } from '@ethersproject/constants';
import { mergeDefault } from '@sapphire/utilities';
import { BigNumber, ContractReceipt, PayableOverrides, Signer } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';
import jpex from 'jpex';
import { useMutation } from 'react-query';
import { IVault } from 'types/contracts/exchange/Vault';
import { getLimits } from 'utils/exchange/router/limits';
import useBatchSwap from './contracts/exchange/useBatchSwap';

export interface SwapOptions {
	tokenIn: string;
	tokenOut: string;
	amount: BigNumber;
	funds: IVault.FundManagementStruct;
	maxHops?: number;
	gasPrice?: BigNumber;
	swapType?: SwapTypes;
	poolTypeFilter?: PoolFilter;
	forceRefresh?: boolean;
}
export type OptionalSwapOptions = Omit<SwapOptions, 'tokenIn' | 'tokenOut' | 'amount' | 'funds'>;

export const DEFAULT_SWAP_OPTIONS: OptionalSwapOptions = {
	maxHops: 5,
	gasPrice: parseUnits('1', 'gwei'),
	swapType: SwapTypes.SwapExactIn,
	poolTypeFilter: PoolFilter.All,
	forceRefresh: true
};

export interface SwapVariables {
	options: SwapOptions;
	overrides?: PayableOverrides;
}

export function useSwap(signer: Signer | undefined) {
	const { mutateAsync: batchSwap } = useBatchSwap(signer);
	const sor = jpex.resolve<SOR>();

	return useMutation({
		mutationFn: async (variables: SwapVariables): Promise<ContractReceipt> => {
			const { options, overrides } = variables;
			if (!options.tokenIn || !options.tokenOut || !options.amount) {
				console.warn('Tried to swap without appropriate parameters.');
				return undefined as unknown as ContractReceipt;
			}

			const poolsFetched = await sor.fetchPools();
			if (!poolsFetched) {
				console.warn('Failed to fetch pools.');
				return undefined as unknown as ContractReceipt;
			}

			const defaultedOptions: Required<SwapOptions> = mergeDefault(DEFAULT_SWAP_OPTIONS, options);
			const { tokenIn, tokenOut, amount, swapType } = defaultedOptions;

			const swapInfo = await sor.getSwaps(tokenIn, tokenOut, swapType, amount, {
				maxPools: defaultedOptions.maxHops,
				gasPrice: defaultedOptions.gasPrice,
				poolTypeFilter: defaultedOptions.poolTypeFilter,
				forceRefresh: defaultedOptions.forceRefresh
			});
			if (swapInfo.swaps.length === 0) {
				console.warn('No paths found.');
				return undefined as unknown as ContractReceipt;
			}

			const limits: string[] = getLimits(
				swapInfo.tokenIn,
				swapInfo.tokenOut,
				swapType,
				swapInfo.swapAmount,
				swapInfo.returnAmount,
				swapInfo.tokenAddresses
			);

			const tx = batchSwap([
				swapType, //
				swapInfo.swaps,
				swapInfo.tokenAddresses,
				defaultedOptions.funds,
				limits,
				MaxUint256,
				overrides
			]);

			return tx as unknown as ContractReceipt;
		}
	});
}