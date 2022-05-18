import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducer from './reducer';
import listsReducer, { listsSlice } from './reducers/lists';

const PERSISTED_KEYS: string[] = ['lists'];

const persistConfig = {
	key: 'root',
	whitelist: PERSISTED_KEYS,
	version: 1,
	storage
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
	reducer: {
		lists: listsReducer
	},
	devTools: {
		actionCreators: {
			...listsSlice.actions
		}
	}
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppState = ReturnType<typeof persistedReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
