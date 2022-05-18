import { ChainId } from '@koyofinance/core-sdk';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetch, FetchResultTypes } from '@sapphire/fetch';
import { TokenList, TokenInfo } from '@uniswap/token-lists';
import { DEFAULT_ACTIVE_LIST_URLS } from 'config/token-lists';
import { RootState } from 'state';

export interface ListsState {
	lists: string[];
	fetchedLists: TokenList[];
	tokens: TokenInfo[];
}

const initialState: ListsState = {
	lists: DEFAULT_ACTIVE_LIST_URLS,
	fetchedLists: [],
	tokens: []
};

export const fetchTokenLists = createAsyncThunk('tokens/fetchTokenList', async (_, { getState }) => {
	const state = getState() as RootState;

	const tokenListPromises = await Promise.allSettled(state.lists.lists.map((list) => fetch<TokenList>(list, 'json' as FetchResultTypes.JSON)));
	const tokenLists = tokenListPromises.filter((promise) => promise.status === 'fulfilled') as PromiseFulfilledResult<TokenList>[];

	return tokenLists.map((promiseResult) => promiseResult.value);
});

export const listsSlice = createSlice({
	name: 'lists',
	initialState,
	reducers: {
		setLists(state, action: PayloadAction<string[]>) {
			state.lists = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchTokenLists.fulfilled, (state, action) => {
			state.fetchedLists = action.payload;
			state.tokens = action.payload.flatMap((list) => list.tokens);
		});
	}
});

export const { setLists } = listsSlice.actions;

export const selectAllTokens = () => (state: RootState) => state.lists.tokens;
export const selectAllTokensByChainId = (chainId: ChainId) => (state: RootState) => state.lists.tokens.filter((token) => token.chainId === chainId);

export default listsSlice.reducer;
