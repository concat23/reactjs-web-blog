// src/utils/apiClient.js

export async function apiRequest(endpoint, method = 'GET', data = null, token = null) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const config = {
    method,
    headers,
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(endpoint, config);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'API error');
  }

  return result;
}
