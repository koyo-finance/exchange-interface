import { BigNumber } from 'ethers';

export type LockedBalance = [BigNumber, BigNumber] & { amount: BigNumber; end: BigNumber };
