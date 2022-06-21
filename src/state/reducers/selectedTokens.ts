import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TokenInfo } from '@uniswap/token-lists';
import { RootState } from 'state';

export interface SelectedTokensState {
	tokenOne: TokenInfo;
	tokenTwo: TokenInfo;
	amount: number;
}

const initialState: SelectedTokensState = {
	tokenOne: {
		name: 'Frax',
		address: '0x7562F525106F5d54E891e005867Bf489B5988CD9',
		symbol: 'FRAX',
		decimals: 18,
		chainId: 288,
		logoURI: 'https://tassets.koyo.finance/logos/FRAX/512x512.png',
		tags: ['stablecoin']
	},
	tokenTwo: {
		name: 'Boba',
		address: '0xa18bF3994C0Cc6E3b63ac420308E5383f53120D7',
		symbol: 'BOBA',
		decimals: 18,
		chainId: 288,
		logoURI: 'https://tassets.koyo.finance/logos/BOBA/512x512.png'
	},
	amount: 0
};

export const selectedTokensSlice = createSlice({
	name: 'Selected tokens',
	initialState,
	reducers: {
		setTokenOne(state, action: PayloadAction<TokenInfo>) {
			state.tokenOne = action.payload;
		},
		setTokenTwo(state, action: PayloadAction<TokenInfo>) {
			state.tokenTwo = action.payload;
		},
		setAmount(state, action) {
			state.amount = action.payload.amount;
		}
	}
});

export const { setTokenOne, setTokenTwo, setAmount } = selectedTokensSlice.actions;

export const selectTokenOne = (state: RootState) => state.selectedTokens.tokenOne;
export const selectTokenTwo = (state: RootState) => state.selectedTokens.tokenTwo;
export const selectAmount = (state: RootState) => state.selectedTokens.amount;

export default selectedTokensSlice.reducer;
