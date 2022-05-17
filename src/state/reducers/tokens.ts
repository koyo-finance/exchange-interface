import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FetchResultTypes } from '@sapphire/fetch';
import { DispatchProp } from 'react-redux';
import { Token } from 'types/TokenObject';

export interface TokenListState {
	tokenList: Token[];
}

const initialState: TokenListState = {
	tokenList: []
};

const tokenListSlice = createSlice({
	name: 'Token List',
	initialState,
	reducers: {
		setTokenList(state, action) {
			state.tokenList = action.payload.tokenList;
		}
	}
});

export const fetchTokenList = createAsyncThunk('tokens/fetchTokenList', async () => {
	let data;

	const fetchData = async () => {
		data = await fetch('https://raw.githubusercontent.com/koyo-finance/default-token-list/main/src/tokens/boba.json', FetchResultTypes.JSON);
	};

	try {
		fetchData();
	} catch {}

	return data;
});

export const tokenListActions = tokenListSlice.actions;

export default tokenListSlice;
