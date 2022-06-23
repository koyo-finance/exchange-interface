import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TokenInfo } from '@uniswap/token-lists';
import { RootState } from 'state';

export interface createPoolState {
	tokens: TokenInfo[];
	weights: number[];
}

const initialState: createPoolState = {
	tokens: [
		{
			name: 'Frax',
			address: '0x7562F525106F5d54E891e005867Bf489B5988CD9',
			symbol: 'FRAX',
			decimals: 18,
			chainId: 288,
			logoURI: 'https://tassets.koyo.finance/logos/FRAX/512x512.png',
			tags: ['stablecoin']
		},
		{
			name: 'Boba',
			address: '0xa18bF3994C0Cc6E3b63ac420308E5383f53120D7',
			symbol: 'BOBA',
			decimals: 18,
			chainId: 288,
			logoURI: 'https://tassets.koyo.finance/logos/BOBA/512x512.png'
		}
	],
	weights: [50, 50]
};

export const createPoolSlice = createSlice({
	name: 'Create Pool',
	initialState,
	reducers: {
		setTokens(state, action: PayloadAction<TokenInfo[]>) {
			state.tokens = action.payload;
		},
		setWeights(state, action: PayloadAction<number[]>) {
			state.weights = action.payload;
		}
	}
});

export const { setTokens, setWeights } = createPoolSlice.actions;

export const selectTokens = (state: RootState) => state.createPool.tokens;
export const selectWeights = (state: RootState) => state.createPool.weights;

export default createPoolSlice.reducer;
