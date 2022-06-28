import { ChainId } from '@koyofinance/core-sdk';

export const KOYO_POOLS: { [chainId in ChainId]?: string } = { [ChainId.BOBA]: 'https://api.exchange.koyo.finance/pools/raw/boba' };

export const KOYO_POOL_LISTS = [...Object.values(KOYO_POOLS)];

export const EXCLUDED_POOLS = ['3pool'];
export const EXLUDED_POOL_IDS = ['0x59ae0fa469fb28e83bf922a75a738a3d1502fc3b000200000000000000000000'];
