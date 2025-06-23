import ApiService from './ApiService';

export default class NailPolishProductService {
  constructor() {
    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    const tokenKey = process.env.REACT_APP_TOKEN_KEY;
    this.api = new ApiService(baseUrl, tokenKey);
  }

  getAll() {
    return this.api.get('/nail-polish-products');
  }

  getById(productId) {
    return this.api.get(`/nail-polish-products/${productId}`);
  }

  create(productData) {
    return this.api.post('/nail-polish-products', productData);
  }

  update(productId, productData) {
    return this.api.put(`/nail-polish-products/${productId}`, productData);
  }

  delete(productId) {
    return this.api.delete(`/nail-polish-products/${productId}`);
  }

  async uploadImages(productId, imageFiles) {
    if (!productId || typeof productId !== 'number') {
      throw new Error('Invalid product ID');
    }

    if (!Array.isArray(imageFiles) || imageFiles.length === 0) {
      throw new Error('No images provided');
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024;

    const formData = new FormData();
    for (const file of imageFiles) {
      if (!(file instanceof File)) throw new Error('Invalid file');
      if (!allowedTypes.includes(file.type)) throw new Error(`File type ${file.type} not allowed`);
      if (file.size > maxSize) throw new Error(`File ${file.name} too large (max 5MB)`);
      formData.append('images[]', file);
    }

    return this.api.request(
      `/nail-polish-products/${productId}/upload-images`,
      'POST',
      formData,
      { timeout: 30000 } 
    );
  }
}
