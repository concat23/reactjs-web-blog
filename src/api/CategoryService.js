import { apiRequest } from './../utils/apiClient';

export default class CategoryService {
  constructor() {
    this.apiBaseUrl = 'http://localhost:8555/api';
    this.tokenKey = 'admin_token';
    this.token = this.getToken();
  }

  getToken() {
    const token = localStorage.getItem(this.tokenKey);
    return token ? token.trim().replace(/[\r\n]+/g, '') : null;
  }

  async getAll() {
    return apiRequest(`${this.apiBaseUrl}/category`, 'GET', null, this.token);
  }

  async getById(categoryId) {
    return apiRequest(`${this.apiBaseUrl}/category/${categoryId}`, 'GET', null, this.token);
  }

  async create(categoryData) {
    return apiRequest(`${this.apiBaseUrl}/category/create`, 'POST', categoryData, this.token);
  }
}
