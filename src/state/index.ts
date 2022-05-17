import { configureStore } from '@reduxjs/toolkit';
import tokenListSlice from './reducers/tokens';

export const store = configureStore({
	reducer: {
		tokenList: tokenListSlice.reducer
	}
});
