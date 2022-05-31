import axios from 'axios';

export function consultIfCategoryHasVideos(categoryName) {
	let apiUrl = 'http://localhost:3000/api/v1/videoCategories/hasVideos/' + categoryName;
	return axios.get(apiUrl);
}
