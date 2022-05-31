import * as selectedVideosActionsConsts from '../actions/selectedVideosActions';

const initialState = {
	selectedVideos: [],
	msg: ''
};

const selectedVideosReducer = (state = initialState, action) => {
	let newSelectedVideos = [];
	switch (action.type) {
		//
		case selectedVideosActionsConsts.ADD_URL_TO_SELECTED_VIDEOS:
			newSelectedVideos = [ ...state.selectedVideos ];
			newSelectedVideos.push(action.payload);
			return {
				...state,
				selectedVideos: newSelectedVideos
			};

		case selectedVideosActionsConsts.REMOVE_URL_FROM_SELECTED_VIDEOS:
			newSelectedVideos = [ ...state.selectedVideos ];
			newSelectedVideos = newSelectedVideos.filter((videoUrl) => videoUrl !== action.payload);
			return {
				...state,
				selectedVideos: newSelectedVideos
			};

		case selectedVideosActionsConsts.RESET_SELECTED_VIDEOS:
			return initialState;

		default:
			return state;
	}
};

export default selectedVideosReducer;
