import * as videoCategoriesActionConsts from '../actions/videoCategoriesActions';

const initialState = {
	videoCategories: [],
	videoCategoriesError: '',
	videoCategoriesLoading: false,
	videoCategoriesLoaded: false
};

const videoCategoriesReducer = (state = initialState, action) => {
	switch (action.type) {
		case videoCategoriesActionConsts.SET_VIDEOCATEGORIES_DIRTY:
			return initialState;

		case videoCategoriesActionConsts.GET_VIDEOCATEGORIES_BEGIN:
			return {
				...state,
				videoCategories: [],
				videoCategoriesLoading: true
			};

		case videoCategoriesActionConsts.GET_VIDEOCATEGORIES_SUCCESS:
			return {
				...state,
				videoCategories: action.payload,
				videoCategoriesLoading: false,
				videoCategoriesLoaded: true
			};

		case videoCategoriesActionConsts.GET_VIDEOCATEGORIES_FAILURE:
			return {
				...state,
				videoCategoriesLoading: false,
				videoCategoriesLoaded: false,
				videoCategoriesError: action.payload
			};

		case videoCategoriesActionConsts.CLEAN_VIDEOCATEGORIES_ERROR:
			return {
				...state,
				videoCategoriesLoading: false,
				videoCategoriesLoaded: false,
				videoCategoriesError: ''
			};

		default:
			return state;
	}
};

export default videoCategoriesReducer;
