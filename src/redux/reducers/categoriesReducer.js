import * as categoriesActionConsts from '../actions/categoriesActions';

const initialState = {
	categories: [],
	categoriesError: null,
	categoriesLoading: false,
	categoriesLoaded: false
};

const categoriesReducer = (state = initialState, action) => {
	switch (action.type) {
		case categoriesActionConsts.SET_CATEGORIES_DIRTY:
			return initialState;

		case categoriesActionConsts.GET_CATEGORIES_BEGIN:
			return {
				...state,
				categories: [],
				categoriesLoading: true
			};

		case categoriesActionConsts.GET_CATEGORIES_SUCCESS:
			return {
				...state,
				categories: action.payload,
				categoriesLoading: false,
				categoriesLoaded: true
			};

		case categoriesActionConsts.GET_CATEGORIES_FAILURE:
			return {
				...state,
				categoriesLoading: false,
				categoriesLoaded: false,
				categoriesError: action.payload
			};

		default:
			return state;
	}
};

export default categoriesReducer;
