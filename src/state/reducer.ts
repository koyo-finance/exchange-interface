import { combineReducers } from '@reduxjs/toolkit';
import listsReducer from './reducers/lists';
import selectedTokensReducer from './reducers/selectedTokens';

const reducer = combineReducers({
	lists: listsReducer,
	selectedTokens: selectedTokensReducer
});

export default reducer;
