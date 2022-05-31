export const ADD_DRAWER_MENU_ITEM = 'ADD_DRAWER_MENU_ITEM';
export const RESET_DRAWER_MENU_ITEMS = 'RESET_DRAWER_MENU_ITEMS';

export const menuItemModel = {
	divider: false,
	text: '',
	icon: null,
	onClick: null,
	disabled: false
};

export const addDrawerMenuItem = (menuItem) => ({
	type: ADD_DRAWER_MENU_ITEM,
	payload: menuItem
});

export const resetDrawerMenuItems = () => ({
	type: RESET_DRAWER_MENU_ITEMS
});
