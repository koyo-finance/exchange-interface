import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import reducer from './reducer';
import { listsSlice } from './reducers/lists';
import { selectedTokensSlice } from './reducers/selectedTokens';
import storage from './storage';

const PERSISTED_KEYS: string[] = ['lists'];

const persistConfig = {
	key: 'root',
	whitelist: PERSISTED_KEYS,
	version: 1,
	storage
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
	reducer: persistedReducer,
	devTools: {
		actionCreators: {
			...listsSlice.actions,
			...selectedTokensSlice.actions
		}
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			thunk: true,
			immutableCheck: true,
			serializableCheck: false
		})
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppState = ReturnType<typeof persistedReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
