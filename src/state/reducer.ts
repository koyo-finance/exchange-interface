import { combineReducers } from '@reduxjs/toolkit';
import listsReducer from './reducers/lists';

const reducer = combineReducers({
	lists: listsReducer
});

export default reducer;
