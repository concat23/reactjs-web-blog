import { handleUnauthorized } from './handleUnauthorized';

export async function apiRequest(endpoint, method = 'GET', data = null, token = null, timeout = 10000) {
  method = method.toUpperCase();

  // Log request info
  console.log(`[API REQUEST] ${method} ${endpoint}`, data);

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
      // Log lỗi chi tiết
      console.error(`[API ERROR] ${method} ${endpoint} - Status: ${response.status}`, result);

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      const errorMessage = (result && result.message) || response.statusText || 'API error';
      const error = new Error(errorMessage);
      error.status = response.status;
      error.response = result;
      throw error;
    }

    // Log response thành công
    console.log(`[API RESPONSE] ${method} ${endpoint}`, result);

    return result;

  } catch (error) {
    clearTimeout(id);
    if (error.name === 'AbortError') {
      console.error(`[API TIMEOUT] ${method} ${endpoint} - Request timed out after ${timeout}ms`);
      throw new Error('Request timed out');
    }
    console.error(`[API EXCEPTION] ${method} ${endpoint}`, error);
    throw error;
  }
}

