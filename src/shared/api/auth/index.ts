// ============================================
// Auth API Hooks — React Query Mutations
// ============================================
// Pattern: shared/api/{domain}/index.ts exports hooks
//          shared/api/{domain}/mutation/ contains mutationFn handlers
// ============================================

import { useMutation } from '@tanstack/react-query';
import { ILoginPayload } from '@/shared/types';
import { loginHandler, logoutHandler } from './mutation';
import { ACCESS_TOKEN, REFRESH_TOKEN, USER_NAME } from '@/shared/constant';

/**
 * useLogin — POST /v1/auth/login
 * Stores tokens on success
 */
export const useLogin = () => {
  return useMutation({
    mutationFn: ({ username, password }: ILoginPayload) =>
      loginHandler(username, password),
    onSuccess: (data) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem(ACCESS_TOKEN, data.token);
        localStorage.setItem(USER_NAME, data.username);
        if (data.refreshToken) {
          localStorage.setItem(REFRESH_TOKEN, data.refreshToken);
        }
      }
    },
  });
};

/**
 * useLogout — DELETE /v1/auth/logout
 * Clears tokens and redirects to sign-in
 */
export const useLogout = () => {
  return useMutation({
    mutationFn: logoutHandler,
    onSuccess: () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        localStorage.removeItem(USER_NAME);
        window.location.href = '/sign-in';
      }
    },
  });
};
