import axios from "axios";

export const GET_VIDEOCATEGORIES_BEGIN = "GET_VIDEOCATEGORIES_BEGIN";
export const GET_VIDEOCATEGORIES_SUCCESS = "GET_VIDEOCATEGORIES_SUCCESS";
export const GET_VIDEOCATEGORIES_FAILURE = "GET_VIDEOCATEGORIES_FAILURE";
export const SET_VIDEOCATEGORIES_DIRTY = "SET_VIDEOCATEGORIES_DIRTY";
export const CLEAN_VIDEOCATEGORIES_ERROR = "CLEAN_VIDEOCATEGORIES_ERROR";

export const setVideoCategoriesDirty = () => ({
   type: SET_VIDEOCATEGORIES_DIRTY,
});

export const getVideoCategoriesBegin = () => ({
   type: GET_VIDEOCATEGORIES_BEGIN,
});

export const getVideoCategoriesSuccess = (myCategories) => ({
   type: GET_VIDEOCATEGORIES_SUCCESS,
   payload: myCategories,
});

export const setVideoCategoriesFailure = (error) => ({
   type: GET_VIDEOCATEGORIES_FAILURE,
   payload: error,
});

export const cleanVideoCategoriesFailure = (error) => ({
   type: GET_VIDEOCATEGORIES_FAILURE,
   payload: error,
});

export function getAllVideoCategoriesWithoutTheirVideos() {
   return (dispatch) => {
      dispatch(getVideoCategoriesBegin);
      let apiUrl = "http://localhost:3000/api/v1/videoCategories/noVideos";
      axios
         .get(apiUrl)
         .then((res) => {
            dispatch(getVideoCategoriesSuccess(res.data));
         })
         .catch((error) => {
            dispatch(setVideoCategoriesFailure(error));
         });
   };
}

export function getOnlyVideoCategoriesThatHaveVideosWithTheirVideos() {
   return (dispatch) => {
      dispatch(getVideoCategoriesBegin);
      let apiUrl = "http://localhost:3000/api/v1/videoCategories/videos";
      axios
         .get(apiUrl)
         // Filter out the categories that don't have videos inside them
         .then((res) => {
            let videoCategories = res.data.videoCategories.filter(
               (videoCategory) => videoCategory.Videos.length > 0
            );
            dispatch(getVideoCategoriesSuccess(videoCategories));
         })
         .catch((error) => {
            dispatch(setVideoCategoriesFailure(error));
         });
   };
}

export function addVideo(videoObj) {
   let apiUrl = "http://localhost:3000/api/v1/videos/add";
   const request = axios.post(apiUrl, videoObj);

   return (dispatch) => {
      function onSuccess(success) {
         dispatch(setVideoCategoriesDirty());
         return success;
      }
      function onError(error) {
         dispatch(setVideoCategoriesFailure(error.request.response));
         return error;
      }
      request.then(
         (success) => onSuccess(success),
         (error) => onError(error)
      );
   };
}
