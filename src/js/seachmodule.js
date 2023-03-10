import axios from 'axios';
import Notiflix from 'notiflix';

const API_KEY = '34264308-22057ffdb03c712e66af4a89b';
const BASE_URL = 'https://pixabay.com/api/';
const imageType = 'photo';
const orientation = 'horizontal';
const safesearch = 'true';
const per_page = '40';

export default class SearchApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  async catchImage() {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          key: API_KEY,
          q: this.searchQuery,
          image_type: imageType,
          orientation: orientation,
          safesearch: safesearch,
          per_page: per_page,
          page: this.page,
        },
      });

      this.incrementPage();
      const responseData = {
        hits: response.data.hits,
        totalHits: response.data.totalHits,
        totalPage: response.data.totalHits / per_page,
      };
      return responseData;
    } catch {
      console.log(error);
    }
  }
  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }
  set query(newSearch) {
    this.searchQuery = newSearch;
  }
}
