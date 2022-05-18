import { ChainId } from '@koyofinance/core-sdk';

export const KOYO_POOLS = { [ChainId.BOBA]: 'https://api.exchange.koyo.finance/pools/raw/boba' };

export const KOYO_POOL_LISTS = [...Object.values(KOYO_POOLS)];
