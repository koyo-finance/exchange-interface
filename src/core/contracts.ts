import { pools } from 'constants/pools';
import { bobaProvider } from 'hooks/useProviders';
import { StableSwap3Pool, StableSwap3Pool__factory } from 'types/contracts/exchange';

export const swapContracts: Map<string, StableSwap3Pool> = new Map(
	pools.map((pool) => [pool.deploy.name, StableSwap3Pool__factory.connect(pool.deploy.swap_address, bobaProvider)])
);
