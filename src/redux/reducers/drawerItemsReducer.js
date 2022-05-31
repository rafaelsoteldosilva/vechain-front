import * as drawerItemsActionsConsts from '../actions/drawerItemsActions';

const initialState = {
	drawerItems: [],
	drawerEmpty: true,

	msg: ''
};

const drawerItemsReducer = (state = initialState, action) => {
	let newDrawerItems = [];
	switch (action.type) {
		//
		case drawerItemsActionsConsts.ADD_DRAWER_MENU_ITEM:
			newDrawerItems = [ ...state.drawerItems ];
			newDrawerItems.push(action.payload);
			return {
				...state,
				drawerItems: newDrawerItems,
				drawerEmpty: false
			};

		case drawerItemsActionsConsts.RESET_DRAWER_MENU_ITEMS:
			return initialState;

		default:
			return state;
	}
};

export default drawerItemsReducer;
