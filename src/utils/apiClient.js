export async function apiRequest(endpoint, method = 'GET', data = null, token = null) {
  method = method.toUpperCase();

  const headers = {
    'Accept': 'application/json',
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

  const response = await fetch(endpoint, config);

  let result = null;
  const contentType = response.headers.get('content-type');

  try {
    if (contentType && contentType.includes('application/json')) {
      result = await response.json();
    } else {
      result = await response.text();
    }
  } catch {
    result = null;
  }

  if (!response.ok) {
    const errorMessage = (result && result.message) || response.statusText || 'API error';
    const error = new Error(errorMessage);
    error.status = response.status;
    error.response = result;
    throw error;
  }

  return result;
}
