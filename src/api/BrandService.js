import ApiService from './ApiService';

export default class BrandService {
  constructor() {
    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    const tokenKey = process.env.REACT_APP_TOKEN_KEY;
    this.api = new ApiService(baseUrl, tokenKey);
  }

  getAll(options = {}) {
    return this.api.get('/brand', options);
  }

  getById(brandId, options = {}) {
    return this.api.get(`/brand/${brandId}`, options);
  }

  create(brandData, options = {}) {
    return this.api.post('/brand/create', brandData, options);
  }
}
