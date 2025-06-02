import { apiRequest } from './../utils/apiClient';

export default class AuthService {
  constructor() {
    this.apiBaseUrl = 'http://localhost:8555/api';
    this.tokenKey = 'admin_token';
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  async login(email, password) {
    const data = await apiRequest(`${this.apiBaseUrl}/authentication/login`, 'POST', { email, password });
    const token = data.access_token?.accessToken; 
    if (!token) {
      throw new Error('Token not found in response');
    }
    localStorage.setItem(this.tokenKey, token);
    return token;
  }

  async logout() {
    const token = this.getToken();
    if (!token) {
      this.clearClientSession();
      return;
    }
    await apiRequest(`${this.apiBaseUrl}/authentication/logout`, 'POST', null, token);
    this.clearClientSession();
  }

  clearClientSession() {
    localStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem('progressHasRun');
  }

  isAuthenticated() {
    return !!this.getToken();
  }
}
