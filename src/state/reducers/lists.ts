import { ChainId } from '@koyofinance/core-sdk';
import { AugmentedPool } from '@koyofinance/swap-sdk';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetch, FetchResultTypes } from '@sapphire/fetch';
import { TokenList, TokenInfo } from '@uniswap/token-lists';
import { KOYO_POOL_LISTS } from 'config/pool-lists';
import { DEFAULT_ACTIVE_LIST_URLS } from 'config/token-lists';
import { RootState } from 'state';

export interface ListsState {
	lists: string[];
	fetchedLists: TokenList[];
	tokens: TokenInfo[];
	poolLists: string[];
	pools: AugmentedPool[];
}

const initialState: ListsState = {
	lists: DEFAULT_ACTIVE_LIST_URLS,
	fetchedLists: [],
	tokens: [],
	poolLists: KOYO_POOL_LISTS,
	pools: []
};

export const fetchTokenLists = createAsyncThunk('tokens/fetchTokenList', async (_, { getState }) => {
	const state = getState() as RootState;

	const tokenListPromises = await Promise.allSettled(state.lists.lists.map((list) => fetch<TokenList>(list, 'json' as FetchResultTypes.JSON)));
	const tokenLists = tokenListPromises.filter((promise) => promise.status === 'fulfilled') as PromiseFulfilledResult<TokenList>[];

	return tokenLists.map((promiseResult) => promiseResult.value);
});

export const fetchPoolLists = createAsyncThunk('tokens/fetchPoolList', async (_, { getState }) => {
	const state = getState() as RootState;

	const poolListPromises = await Promise.allSettled(
		state.lists.poolLists.map((list) => fetch<{ data: { [K: string]: AugmentedPool } }>(list, 'json' as FetchResultTypes.JSON))
	);
	const poolLists = poolListPromises.filter((promise) => promise.status === 'fulfilled') as PromiseFulfilledResult<{
		data: { [K: string]: AugmentedPool };
	}>[];

	return poolLists.map((promiseResult) => Object.values(promiseResult.value.data));
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
		builder
			.addCase(fetchTokenLists.fulfilled, (state, action) => {
				state.fetchedLists = action.payload;
				state.tokens = action.payload.flatMap((list) => list.tokens);
			})
			.addCase(fetchPoolLists.fulfilled, (state, action) => {
				state.pools = action.payload.flat() || [];
				state.pools = state.pools.filter((pool) => !['3pool'].includes(pool.id));
			});
	}
});

export const { setLists } = listsSlice.actions;

export const selectAllTokens = () => (state: RootState) => state.lists.tokens;
export const selectAllTokensByChainId = (chainId: ChainId) => (state: RootState) => state.lists.tokens.filter((token) => token.chainId === chainId);

export const selectAllPools = () => (state: RootState) => state.lists.pools;
export const selectPoolBySwapAndChainId = (swap: string, chainId: ChainId) => (state: RootState) =>
	state.lists.pools.find((pool) => pool.addresses.swap === swap && pool.chainId === chainId);
export const selectAllPoolsByChainId = (chainId: ChainId) => (state: RootState) => state.lists.pools.filter((pool) => pool.chainId === chainId);

export default listsSlice.reducer;
