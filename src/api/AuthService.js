import ApiService from './ApiService';

const TOKEN_LIFETIME_MS = 60 * 60 * 1000; // 1 giờ fallback

export default class AuthService {
  constructor() {
    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    const tokenKey = process.env.REACT_APP_TOKEN_KEY;
    const tokenExpireKey = process.env.REACT_APP_TOKEN_EXPIRE_KEY;

    console.log('[ENV DEBUG]', { baseUrl, tokenKey, tokenExpireKey });

    if (!baseUrl || !tokenKey || !tokenExpireKey) {
      throw new Error('❌ Thiếu biến môi trường: API_BASE_URL, TOKEN_KEY, hoặc TOKEN_EXPIRE_KEY');
    }

    this.tokenKey = tokenKey;
    this.tokenExpireKey = tokenExpireKey;
    this.api = new ApiService(baseUrl, tokenKey);
  }

  getToken() {
    const token = localStorage.getItem(this.tokenKey);
    return token?.trim().replace(/[\r\n]+/g, '') || null;
  }

  getTokenExpireAt() {
    const expireAt = localStorage.getItem(this.tokenExpireKey);
    return expireAt ? parseInt(expireAt, 10) : null;
  }

  saveToken(token, expiresIn) {
    localStorage.setItem(this.tokenKey, token);
    const expireAt = Date.now() + (expiresIn ? expiresIn * 1000 : TOKEN_LIFETIME_MS);
    localStorage.setItem(this.tokenExpireKey, expireAt.toString());
  }

  expireTokenSoon(secondsFromNow = 5) {
    const token = this.getToken();
    if (!token) {
      console.warn('⚠️ Không có token để expire');
      return;
    }

    const expireAt = Date.now() + secondsFromNow * 1000;
    localStorage.setItem(this.tokenExpireKey, expireAt.toString());

    console.log(`⏳ Token sẽ hết hạn sau ${secondsFromNow} giây (${new Date(expireAt).toLocaleTimeString()})`);
  }


  clearClientSession() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.tokenExpireKey);
    sessionStorage.removeItem('progressHasRun');
  }

  isAuthenticated() {
    const token = this.getToken();
    const expireAt = this.getTokenExpireAt();
    return !!token && (!expireAt || Date.now() < expireAt);
  }

  async login(email, password) {
    try {
      const data = await this.api.post('/authentication/login', { email, password });
      const token = data.access_token?.accessToken;
      const expiresIn = data.access_token?.expiresIn;

      if (!token) throw new Error('❌ Không nhận được accessToken');

      this.saveToken(token, expiresIn);
      return token;
    } catch (error) {
      console.error('❌ Đăng nhập thất bại:', error.message);
      throw error;
    }
  }

  async refreshToken() {
    const token = this.getToken();
    if (!token) throw new Error('❌ Không tìm thấy token để refresh');

    try {
      const data = await this.api.post('/authentication/refresh', null, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const newToken = data.access_token?.accessToken;
      const expiresIn = data.access_token?.expiresIn;

      if (!newToken) throw new Error('❌ Không nhận được accessToken mới');

      this.saveToken(newToken, expiresIn);
      return newToken;
    } catch (error) {
      console.error('❌ Refresh token thất bại:', error.message);
      this.clearClientSession();
      throw error;
    }
  }

  async logout() {
    const token = this.getToken();

    try {
      if (token) {
        await this.api.post('/authentication/logout', null, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    } catch (error) {
      console.warn('⚠️ Gọi logout nhưng gặp lỗi:', error.message);
    } finally {
      this.clearClientSession();
    }
  }
}
