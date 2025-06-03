import { handleUnauthorized } from './handleUnauthorized';

export async function apiRequest(endpoint, method = 'GET', data = null, token = null, timeout = 10000) {
  method = method.toUpperCase();

  const headers = {
    'Accept': 'application/json',
    'Connection': 'keep-alive',
  };

  if (token) {
    const cleanToken = token.trim().replace(/[\r\n]+/g, '');
    headers['Authorization'] = `Bearer ${cleanToken}`;
  }

  const methodsWithBody = ['POST', 'PUT', 'PATCH'];
  if (methodsWithBody.includes(method)) {
    headers['Content-Type'] = 'application/json';
  }

  const config = {
    method,
    headers,
  };

  if (data && methodsWithBody.includes(method)) {
    config.body = JSON.stringify(data);
  }

  // Tạo controller để timeout request
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  config.signal = controller.signal;

  try {
    const response = await fetch(endpoint, config);
    clearTimeout(id);

    const contentType = response.headers.get('content-type');
    let result = null;

    if (contentType && contentType.includes('application/json')) {
      result = await response.json();
    } else {
      result = await response.text();
    }

    if (!response.ok) {
      // Nếu lỗi 401 Unauthorized, gọi logout tự động
      if (response.status === 401) {
        handleUnauthorized();
        return;  // Ngừng xử lý tiếp
      }

      const errorMessage = (result && result.message) || response.statusText || 'API error';
      const error = new Error(errorMessage);
      error.status = response.status;
      error.response = result;
      throw error;
    }

    return result;

  } catch (error) {
    clearTimeout(id); // đảm bảo clear timeout dù có lỗi
    if (error.name === 'AbortError') {
      throw new Error('Request timed out');
    }
    throw error;
  }
}
