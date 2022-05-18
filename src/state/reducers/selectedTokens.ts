import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TokenInfo } from '@uniswap/token-lists';
import { RootState } from 'state';

export interface tokenTwoInfo {
	tokenData: TokenInfo;
	poolAddress: string;
}

export interface selectedTokensState {
	tokenOne: TokenInfo;
	tokenTwo: tokenTwoInfo;
	amount: number;
}

const initialState: selectedTokensState = {
	tokenOne: {
		name: 'Dai',
		address: '0xf74195Bb8a5cf652411867c5C2C5b8C2a402be35',
		symbol: 'DAI',
		decimals: 18,
		chainId: 288,
		logoURI: 'https://tassets.koyo.finance/logos/DAI/512x512.png'
	},
	tokenTwo: {
		tokenData: {
			name: 'Frax',
			address: '0x7562F525106F5d54E891e005867Bf489B5988CD9',
			symbol: 'FRAX',
			decimals: 18,
			chainId: 288,
			logoURI: 'https://tassets.koyo.finance/logos/FRAX/512x512.png'
		},
		poolAddress: '0x9f0a572be1fcfe96e94c0a730c5f4bc2993fe3f6'
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
		setTokenTwo(state, action: PayloadAction<tokenTwoInfo>) {
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
