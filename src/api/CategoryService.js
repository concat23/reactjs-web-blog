import ApiService from './ApiService';

export default class CategoryService {
  constructor() {
    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    const tokenKey = process.env.REACT_APP_TOKEN_KEY;
    this.api = new ApiService(baseUrl, tokenKey);
  }

  getAll() {
    return this.api.get('/category');
  }

  getById(categoryId) {
    return this.api.get(`/category/${categoryId}`);
  }

  create(categoryData) {
    return this.api.post('/category/create', categoryData);
  }
}
