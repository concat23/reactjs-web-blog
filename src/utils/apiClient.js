import { handleUnauthorized } from './handleUnauthorized';

export async function apiRequest(endpoint, method = 'GET', data = null, token = null, timeout = 10000) {
  method = method.toUpperCase();

  // Chuẩn bị headers
  const headers = {
    'Accept': 'application/json',
    'Connection': 'keep-alive',
    ...(['POST', 'PUT', 'PATCH'].includes(method) ? { 'Content-Type': 'application/json' } : {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token.trim().replace(/[\r\n]+/g, '')}`;
  }

  // Tạo controller để abort nếu timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  const config = {
    method,
    headers,
    signal: controller.signal,
    ...(data && ['POST', 'PUT', 'PATCH'].includes(method) ? { body: JSON.stringify(data) } : {}),
  };

  try {
    const response = await fetch(endpoint, config);
    clearTimeout(timeoutId);

    // Xử lý response dựa trên content-type
    const contentType = response.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');

    const result = isJson ? await response.json() : await response.text();

    if (!response.ok) {
      if (response.status === 401) {
        handleUnauthorized();
        return;
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
