import { combineReducers } from '@reduxjs/toolkit';
import listsReducer from './reducers/lists';
import selectedTokensReducer from './reducers/selectedTokens';
import createPoolReducer from './reducers/createPool';

const reducer = combineReducers({
	lists: listsReducer,
	selectedTokens: selectedTokensReducer,
	createPool: createPoolReducer
});

export default reducer;
