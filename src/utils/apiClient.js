import { handleUnauthorized } from './handleUnauthorized';

function redirectByStatus(status) {
  const redirectMap = {
    400: '/admin/error/400',
    403: '/admin/error/403',
    404: '/admin/error/404',
    500: '/admin/error/500',
    502: '/admin/error/502',
    503: '/admin/error/503',
    504: '/admin/error/504',
    505: '/admin/error/505',
  };

  const redirectPath = redirectMap[status];
  if (redirectPath && typeof window !== 'undefined') {
    window.location.href = redirectPath;
  }
}

export async function apiRequest(endpoint, method = 'GET', data = null, token = null, timeout = 10000) {
  method = method.toUpperCase();

  const headers = {
    'Accept': 'application/json',
    'Connection': 'keep-alive',
  };

  const isFormData = data instanceof FormData;

  if (!isFormData && ['POST', 'PUT', 'PATCH'].includes(method)) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token.trim().replace(/[\r\n]+/g, '')}`;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  const config = {
    method,
    headers,
    signal: controller.signal,
    body: isFormData
      ? data
      : ['POST', 'PUT', 'PATCH'].includes(method)
        ? JSON.stringify(data)
        : null,
  };

  try {
    const response = await fetch(endpoint, config);
    clearTimeout(timeoutId);

    const contentType = response.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');
    const result = isJson ? await response.json() : await response.text();

    if (!response.ok) {
      const currentPath = window?.location?.pathname || '';

      if (response.status === 401) {
        // ❌ Không gọi handleUnauthorized nếu đang ở trang login
        if (!currentPath.includes('/login')) {
          handleUnauthorized(); // Thực hiện logout hoặc redirect login
        }
        return result; // Trả lỗi về component login để xử lý
      }

      // ✅ Chỉ redirect nếu không phải trang login
      if (!currentPath.includes('/login')) {
        redirectByStatus(response.status);
      }

      const errorMsg = result?.message || response.statusText || 'API error';
      const error = new Error(errorMsg);
      error.status = response.status;
      error.response = result;
      throw error;
    }

    return result;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error.name === 'AbortError') {
      console.error(`[API TIMEOUT] ${method} ${endpoint} after ${timeout}ms`);
      throw new Error('Request timed out');
    }

    console.error(`[API ERROR] ${method} ${endpoint}:`, error);
    throw error;
  }
}
