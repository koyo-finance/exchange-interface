import { combineReducers } from '@reduxjs/toolkit';
import listsReducer from './reducers/lists';

const reducer = combineReducers({
	listsReducer
});

export default reducer;
