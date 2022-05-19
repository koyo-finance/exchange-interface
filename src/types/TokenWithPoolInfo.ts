import { TokenInfo } from '@uniswap/token-lists';

export interface TokenWithPoolInfo extends TokenInfo {
	poolId: string;
	poolAddress: string;
}
