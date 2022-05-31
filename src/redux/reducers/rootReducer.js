import { combineReducers } from 'redux';

import videoCategoriesReducer from './videoCategoriesReducer';
import selectedVideosReducer from './selectedVideosReducer';
import categoriesReducer from './categoriesReducer';
import drawerItemsReducer from './drawerItemsReducer';

let rootReducer = combineReducers({
	videoCategoriesReducer,
	categoriesReducer,
	selectedVideosReducer,
	drawerItemsReducer
});

export default rootReducer;
