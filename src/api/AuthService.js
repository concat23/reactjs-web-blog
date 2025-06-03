    import { apiRequest } from './../utils/apiClient';

    const TOKEN_LIFETIME_MS = 60 * 60 * 1000;
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
  // const expiresIn = data.access_token?.expiresIn;

  if (!token ) {
    throw new Error('Token or expiration not found in response');
  }

  localStorage.setItem(this.tokenKey, token);

  // const expireAt = Date.now() + expiresIn * 1000;
  // localStorage.setItem('token_expire_at', expireAt.toString());

  return token;
}

async refreshToken() {
  const token = this.getToken();
  if (!token) {
    throw new Error('No token found for refresh');
  }
  const data = await apiRequest(`${this.apiBaseUrl}/authentication/refresh`, 'POST', null, token);
  const newToken = data.access_token?.accessToken;
  const expiresIn = data.access_token?.expiresIn;

  if (!newToken || !expiresIn) {
    throw new Error('New token or expiration not found in response');
  }

  localStorage.setItem(this.tokenKey, newToken);

  const expireAt = Date.now() + expiresIn * 1000;
  localStorage.setItem('token_expire_at', expireAt.toString());

  return newToken;
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
