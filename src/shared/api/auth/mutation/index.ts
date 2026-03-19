// ============================================
// Auth Mutation Handlers
// ============================================
// Thin wrappers around RestService
// ============================================

import RestService from '@/shared/services/http-client';
import { ILoginResponse } from '@/shared/types';

export const loginHandler = async (
  username: string,
  password: string
): Promise<ILoginResponse> => {
  const response = await RestService.send({
    serviceName: 'login',
    body: { username, password },
  });

  if (response.status === 200) {
    return response.data;
  }

  throw new Error(response.error?.message || 'Login failed');
};

export const logoutHandler = async (): Promise<void> => {
  await RestService.send({
    serviceName: 'logout',
  });
};
