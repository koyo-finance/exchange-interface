import { pools } from 'constants/pools';
import { bobaProvider } from 'hooks/useProviders';
import { StableSwap4Pool, StableSwap4Pool__factory } from 'types/contracts/exchange';

export const swapContracts: Map<string, StableSwap4Pool> = new Map(
	pools.map((pool) => [pool.deploy.name, StableSwap4Pool__factory.connect(pool.deploy.swap_address, bobaProvider)])
);
