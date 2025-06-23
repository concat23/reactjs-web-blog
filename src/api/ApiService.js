import { apiRequest } from '../utils/apiClient';

export default class ApiService {
  constructor(baseUrl, tokenKey) {
    this.baseUrl = baseUrl;
    this.tokenKey = tokenKey;
  }

  getToken() {
    const token = localStorage.getItem(this.tokenKey);
    return token ? token.trim().replace(/[\r\n]+/g, '') : null;
  }

  /**
   * Main method xử lý tất cả loại HTTP request
   * @param {string} endpoint - Đường dẫn API, bắt đầu bằng "/"
   * @param {string} method - GET, POST, PUT, DELETE, PATCH,...
   * @param {any} data - Dữ liệu body
   * @param {object} options - Các tuỳ chọn mở rộng:
   *    - token: dùng token custom hoặc null nếu không cần
   *    - timeout: timeout ms
   *    - headers: thêm headers tuỳ chỉnh
   *    - retry: số lần retry nếu lỗi mạng
   *    - silent: true => không log lỗi
   */
  async request(endpoint, method = 'GET', data = null, options = {}) {
    const {
      timeout = 10000,
      token = this.getToken(),
      headers = {},
      retry = 0,
      silent = false,
    } = options;

    const url = `${this.baseUrl}${endpoint}`;

    const attemptRequest = async (retryCount = 0) => {
      try {
        const result = await apiRequest(url, method, data, token, timeout, headers);
        if (process.env.NODE_ENV === 'development') {
          console.info(`[API] ${method} ${endpoint}`, { data, result });
        }
        return result;
      } catch (error) {
        if (retryCount < retry) {
          console.warn(`[API] Retry ${retryCount + 1} for ${method} ${endpoint}`);
          return attemptRequest(retryCount + 1);
        }
        if (!silent) {
          console.error(`[API ERROR] ${method} ${endpoint}`, error);
        }
        throw error;
      }
    };

    return attemptRequest();
  }

  get(endpoint, options = {}) {
    return this.request(endpoint, 'GET', null, options);
  }

  post(endpoint, data, options = {}) {
    return this.request(endpoint, 'POST', data, options);
  }

  put(endpoint, data, options = {}) {
    return this.request(endpoint, 'PUT', data, options);
  }

  patch(endpoint, data, options = {}) {
    return this.request(endpoint, 'PATCH', data, options);
  }

  delete(endpoint, options = {}) {
    return this.request(endpoint, 'DELETE', null, options);
  }
}
