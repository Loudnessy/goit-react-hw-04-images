import axios from 'axios';
axios.defaults.baseURL = "https://pixabay.com/api"
export const getSearchedImages = async (search) => {
const getImages = await axios.get(`/?q=${search}&page=1&key=32382565-670e6ec0ac9c08ef1d2f74129&image_type=photo&orientation=horizontal&per_page=12`)
return getImages
}
export const loadMoreImages = async (search, page) => {
const getImages = await axios.get(`/?q=${search}&page=${page}&key=32382565-670e6ec0ac9c08ef1d2f74129&image_type=photo&orientation=horizontal&per_page=12`)
return getImages   
}