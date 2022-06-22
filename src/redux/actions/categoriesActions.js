import axios from "axios";
import { setVideoCategoriesDirty } from "./videoCategoriesActions";

export const GET_CATEGORIES_BEGIN = "GET_CATEGORIES_BEGIN";
export const GET_CATEGORIES_SUCCESS = "GET_CATEGORIES_SUCCESS";
export const GET_CATEGORIES_FAILURE = "GET_CATEGORIES_FAILURE";
export const SET_CATEGORIES_DIRTY = "SET_CATEGORIES_DIRTY";

export const setCategoriesDirty = () => ({
   type: SET_CATEGORIES_DIRTY,
});

export const getCategoriesBegin = () => ({
   type: GET_CATEGORIES_BEGIN,
});

export const getCategoriesSuccess = (myVideos) => ({
   type: GET_CATEGORIES_SUCCESS,
   payload: myVideos,
});

export const getCategoriesFailure = (error) => ({
   type: GET_CATEGORIES_FAILURE,
   payload: error,
});

export function getAllVideoCategoriesWithoutTheirVideos() {
   return (dispatch) => {
      dispatch(getCategoriesBegin);
      let apiUrl = "http://localhost:3000/api/v1/videoCategories/noVideos";
      axios
         .get(apiUrl)
         .then((res) => {
            dispatch(getCategoriesSuccess(res.data.videoCategories));
         })
         .catch((error) => {
            dispatch(getCategoriesFailure(error));
         });
   };
}

export function addCategory(categoryName) {
   return (dispatch) => {
      let apiUrl = "http://localhost:3000/api/v1/videoCategories/add";
      axios
         .post(apiUrl, { categoryName })
         .then(() => {
            dispatch(setCategoriesDirty());
         })
         .catch((error) => console.log(error));
   };
}

export function deleteCategory(categoryName) {
   return (dispatch) => {
      let apiUrl =
         "http://localhost:3000/api/v1/videoCategories/del/" + categoryName;
      axios
         .delete(apiUrl)
         .then(() => {
            dispatch(setCategoriesDirty());
            dispatch(setVideoCategoriesDirty());
         })
         .catch((error) => console.log(error));
   };
}

export function moveCategoryUp(categoryName) {
   return (dispatch) => {
      let apiUrl =
         "http://localhost:3000/api/v1/videoCategories/up/" + categoryName;
      axios
         .put(apiUrl)
         .then(() => {
            dispatch(setCategoriesDirty());
            dispatch(setVideoCategoriesDirty());
         })
         .catch((error) => console.log(error));
   };
}

export function moveCategoryDown(categoryName) {
   return (dispatch) => {
      let apiUrl =
         "http://localhost:3000/api/v1/videoCategories/down/" + categoryName;
      axios
         .put(apiUrl)
         .then(() => {
            dispatch(setCategoriesDirty());
            dispatch(setVideoCategoriesDirty());
         })
         .catch((error) => console.log(error));
   };
}
