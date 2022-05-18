import { combineReducers } from '@reduxjs/toolkit';
import listsReducer from './reducers/lists';
import selectedTokens from './reducers/selectedTokens';

const reducer = combineReducers({
	lists: listsReducer,
	selectedTokens: selectedTokens
});

export default reducer;
