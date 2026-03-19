// ============================================
// URL Helpers
// ============================================

/**
 * Build redirect query string when user is logged out
 * So after login, user is returned to the page they were on
 */
export const getRedirectUrlForLoggedOut = (): string => {
  if (typeof window === 'undefined') return '';

  const currentPath = window.location.pathname + window.location.search;
  if (currentPath === '/' || currentPath.includes('/sign-in')) {
    return '';
  }
  return `?redirect=${encodeURIComponent(currentPath)}`;
};

/**
 * Get redirect URL from query params after login
 */
export const getRedirectAfterLogin = (): string => {
  if (typeof window === 'undefined') return '/';

  const params = new URLSearchParams(window.location.search);
  return params.get('redirect') || '/';
};
