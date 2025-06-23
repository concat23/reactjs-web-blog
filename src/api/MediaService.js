import ApiService from './ApiService';

export default class MediaService {
  constructor() {
    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    const tokenKey = process.env.REACT_APP_TOKEN_KEY;
    this.api = new ApiService(baseUrl, tokenKey);
  }

  upload(formData) {

    return this.api.post('/cloudinary/upload', formData, 30000);
  }

  getAll() {
    return this.api.get('/cloudinary/files');
  }

  get(publicId) {
    return this.api.get(`/cloudinary/files/${publicId}`);
  }

  delete(publicId) {
    return this.api.delete(`/cloudinary/files/${publicId}`);
  }
}
