import { apiRequest } from './../utils/apiClient';

export default class CategoryService {
  constructor() {
    this.apiBaseUrl = 'http://localhost:8555/api';
    this.tokenKey = 'admin_token';
    }

   getToken() {
  const token = localStorage.getItem(this.tokenKey);
  console.log('Token from localStorage:', token);
  return token;
}


    async getAll() {
        const token = this.getToken();
        console.log('Fetching all categories with token:', token);
        return apiRequest(`${this.apiBaseUrl}/category`, 'GET', null, token);
    }

    async getById(categoryId) {
        const token = this.getToken();
        return apiRequest(`${this.apiBaseUrl}/category/${categoryId}`, 'GET', null, token);
    }

    async create(categoryData) {
        const token = this.getToken();
        return apiRequest(`${this.apiBaseUrl}/category/create`, 'POST', categoryData, token);
    }

}