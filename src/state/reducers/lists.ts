import { ChainId } from '@koyofinance/core-sdk';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetch as sFetch, FetchResultTypes } from '@sapphire/fetch';
import { TokenInfo, TokenList } from '@uniswap/token-lists';
import { DEFAULT_ACTIVE_LIST_URLS, DEFAULT_TOKEN_LISTS } from 'config/token-lists';
import { RootState } from 'state';
import { Gauge } from 'types/contracts/koyo';

export interface ListsState {
	lists: string[];
	selectedLists: string[];
	fetchedLists: TokenList[];
	tokens: TokenInfo[];
	gaugeList: Gauge[];
}

const initialState: ListsState = {
	lists: DEFAULT_TOKEN_LISTS,
	selectedLists: [...DEFAULT_ACTIVE_LIST_URLS],
	fetchedLists: [],
	tokens: [],
	gaugeList: []
};

export const fetchTokenLists = createAsyncThunk('tokens/fetchTokenList', async (_, { getState }) => {
	const state = getState() as RootState;

	const tokenListPromises = await Promise.allSettled(
		state.lists.selectedLists.map((list) => sFetch<TokenList>(list, 'json' as FetchResultTypes.JSON))
	);
	const tokenLists = tokenListPromises.filter((promise) => promise.status === 'fulfilled').flat() as PromiseFulfilledResult<TokenList>[];

	return tokenLists.map((promiseResult) => promiseResult.value);
});

export const listsSlice = createSlice({
	name: 'lists',
	initialState,
	reducers: {
		setLists(state, action: PayloadAction<string[]>) {
			state.lists = action.payload;
		},
		setSelectedLists(state, action: PayloadAction<string>) {
			state.selectedLists = [...state.selectedLists, action.payload];
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchTokenLists.fulfilled, (state, action) => {
			state.fetchedLists = action.payload;
			state.tokens = action.payload.flatMap((list) => list.tokens);
		});
	}
});

export const { setLists, setSelectedLists } = listsSlice.actions;

export const selectAllTokens = () => (state: RootState) => state.lists.tokens;
export const selectAllTokensByChainId = (chainId: ChainId) => (state: RootState) => state.lists.tokens.filter((token) => token.chainId === chainId);
export const selectSelectedLists = () => (state: RootState) => state.lists.selectedLists;
export const selectFetchedLists = () => (state: RootState) => state.lists.fetchedLists;

export default listsSlice.reducer;
