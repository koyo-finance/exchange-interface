import { combineReducers } from '@reduxjs/toolkit';
import listsReducer from './reducers/lists';
import selectedTokensReducer from './reducers/selectedTokens';
import createPoolReducer from './reducers/createPool';
import swapReducer from './reducers/swap';

const reducer = combineReducers({
	lists: listsReducer,
	selectedTokens: selectedTokensReducer,
	createPool: createPoolReducer,
	swap: swapReducer
});

export default reducer;
