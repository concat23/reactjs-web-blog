import { apiRequest } from './../utils/apiClient';

export default class BrandService {
  constructor() {
    this.apiBaseUrl = 'http://localhost:8555/api';
    this.tokenKey = 'admin_token';
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  async getAll() {
    const token = this.getToken();
    return apiRequest(`${this.apiBaseUrl}/brand`, 'GET', null, token);
  }

  async getById(brandId) {
    const token = this.getToken();
    return apiRequest(`${this.apiBaseUrl}/brand/${brandId}`, 'GET', null, token);
  }

  async create(brandData) {
    const token = this.getToken();
    return apiRequest(`${this.apiBaseUrl}/brand/create`, 'POST', brandData, token);
  }
}
