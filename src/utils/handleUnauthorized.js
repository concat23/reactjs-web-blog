export function handleUnauthorized() {
  localStorage.removeItem('admin_token');
  sessionStorage.removeItem('progressHasRun');
  window.location.href = '/login';
}
