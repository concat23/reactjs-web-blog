import { apiRequest } from '../utils/apiClient';

export default class NailPolishProductService {
  constructor() {
    this.apiBaseUrl = 'http://localhost:8555/api';
    this.tokenKey = 'admin_token';
  }

  // Lấy token từ localStorage mỗi lần gọi để đảm bảo token luôn mới nhất
  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  async getAll() {
    return apiRequest(`${this.apiBaseUrl}/nail-polish-products`, 'GET', null, this.getToken());
  }

  async getById(productId) {
    return apiRequest(`${this.apiBaseUrl}/nail-polish-products/${productId}`, 'GET', null, this.getToken());
  }

  async create(productData) {
    return apiRequest(`${this.apiBaseUrl}/nail-polish-products`, 'POST', productData, this.getToken());
  }

  async update(productId, productData) {
    return apiRequest(`${this.apiBaseUrl}/nail-polish-products/${productId}`, 'PUT', productData, this.getToken());
  }

  async delete(productId) {
    return apiRequest(`${this.apiBaseUrl}/nail-polish-products/${productId}`, 'DELETE', null, this.getToken());
  }
}
