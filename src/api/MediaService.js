import { apiRequest } from '../utils/apiClient';

export default class MediaService {
  constructor() {
    this.apiBaseUrl = 'http://localhost:8555/api/cloudinary';
    this.tokenKey = 'admin_token';
  }

  getToken() {
    const token = localStorage.getItem(this.tokenKey);
    return token ? token.trim().replace(/[\r\n]+/g, '') : null;
  }

  async upload(formData) {
    return apiRequest(`${this.apiBaseUrl}/upload`, 'POST', formData, this.getToken(),30000);
  }

  async getAll() {
    return apiRequest(`${this.apiBaseUrl}/files`, 'GET', null, this.getToken());
  }

  async get(publicId) {
    return apiRequest(`${this.apiBaseUrl}/files/${publicId}`, 'GET', null, this.getToken());
  }

  async delete(publicId) {
    return apiRequest(`${this.apiBaseUrl}/files/${publicId}`, 'DELETE', null, this.getToken());
  }
}
