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

  async uploadImages(productId, imageFiles) {
   
    if (!productId || typeof productId !== 'number') {
      throw new Error('Invalid product ID');
    }

    if (!Array.isArray(imageFiles) || imageFiles.length === 0) {
      throw new Error('No images provided for upload');
    }

    const formData = new FormData();

    for (const file of imageFiles) {
      if (!(file instanceof File)) {
        throw new Error('Invalid file provided');
      }

      // Tuỳ chọn: kiểm tra loại file
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        throw new Error(`File type ${file.type} is not allowed`);
      }

      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        throw new Error(`File ${file.name} is too large (max 5MB)`);
      }

      formData.append('images[]', file);
    }

    try {
      const response = await fetch(`${this.apiBaseUrl}/nail-polish-products/${productId}/upload-images`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.getToken()}`
        },
        body: formData,
      });

      if (!response.ok) {
        const errorResponse = await response.json().catch(() => ({}));
        const message = errorResponse.message || `Server error (${response.status})`;
        throw new Error(message);
      }

      return await response.json();

    } catch (error) {
      console.error('Image upload failed:', error);
      throw new Error(`Upload failed: ${error.message}`);
    }
  }

}
