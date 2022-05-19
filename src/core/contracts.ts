import { augmentedPools } from '@koyofinance/swap-sdk';
import { bobaProvider } from 'hooks/useProviders';
import { StableSwap4Pool, StableSwap4Pool__factory } from 'types/contracts/exchange';

export const swapContracts: Map<string, StableSwap4Pool> = new Map(
	augmentedPools.map((pool) => [pool.id, StableSwap4Pool__factory.connect(pool.addresses.swap, bobaProvider)])
);
