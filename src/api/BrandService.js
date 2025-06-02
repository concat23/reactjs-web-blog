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
    return apiRequest(`${this.apiBaseUrl}/brands`, 'GET', null, token);
  }
}
