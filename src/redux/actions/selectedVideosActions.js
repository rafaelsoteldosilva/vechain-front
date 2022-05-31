export const ADD_URL_TO_SELECTED_VIDEOS = 'ADD_URL_TO_SELECTED_VIDEOS';
export const REMOVE_URL_FROM_SELECTED_VIDEOS = 'REMOVE_URL_FROM_SELECTED_VIDEOS';
export const RESET_SELECTED_VIDEOS = 'RESET_SELECTED_VIDEOS';

export const addUrlToSelectedVideos = (url) => ({
	type: ADD_URL_TO_SELECTED_VIDEOS,
	payload: url
});

export const removeUrlFromSelectedVideos = (url) => ({
	type: REMOVE_URL_FROM_SELECTED_VIDEOS,
	payload: url
});

export const resetSelectedVideos = () => ({
	type: RESET_SELECTED_VIDEOS
});
