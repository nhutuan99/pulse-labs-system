import ClientRestBase, { SendParams } from './base';
import { getRedirectUrlForLoggedOut } from '@/shared/helpers/url';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/shared/constant';
import { AxiosError } from 'axios';

// ============================================
// Custom Error class
// ============================================

export class AppError implements Error {
  public name: string;
  public message: string;

  constructor(name: string, error: string | Error) {
    this.message = typeof error === 'string' ? error : error.message;
    this.name = name;
  }
}

// ============================================
// API Error response shape
// ============================================

interface ApiError {
  code: string;
  type: string;
  message?: string;
}

// ============================================
// RestService — HTTP Client
// ============================================
// Extends ClientRestBase with:
// - Auto refresh token on 401
// - Error handling & classification
// - Request retry after token refresh
// ============================================

class RestService extends ClientRestBase {
  private isRefreshing = false;
  private refreshTokenPromise: Promise<void> | null = null;

  /**
   * Main entry point — send an API request
   * Handles status codes, auto-refresh on 401
   */
  public send = (args: SendParams) => {
    return super
      .sendRequestHandler(args)
      .then((response) => {
        if (200 <= response.status && response.status <= 300) {
          return { data: response.data, status: response.status };
        }

        switch (response.status) {
          case 401:
            return this.handle401AndRetry(args);
          case 400:
            return { error: response.data, status: response.status };
          case 422:
            return { error: response.data, status: response.status };
          case 403:
            throw new AppError('AUTHORISATION', 'E003_PERMISSION_DENIED');
          case 500:
            throw new AppError('INTERNAL', 'E003_INTERNAL_ERROR');
        }
      })
      .catch((err) => this.handleRequestError(args, err));
  };

  /**
   * Handle 401 — refresh token and retry original request
   * Uses a shared promise to prevent multiple concurrent refreshes
   */
  private handle401AndRetry = async (args: SendParams) => {
    try {
      if (!this.isRefreshing) {
        this.isRefreshing = true;
        this.refreshTokenPromise = this.refreshAccessToken();
      }

      await this.refreshTokenPromise;
      this.isRefreshing = false;
      this.refreshTokenPromise = null;

      // Retry original request with new token
      return await super.sendRequestHandler(args);
    } catch (e) {
      this.isRefreshing = false;
      this.refreshTokenPromise = null;

      // Refresh failed → redirect to sign-in
      if (typeof window !== 'undefined') {
        window.location.href = `/sign-in${getRedirectUrlForLoggedOut()}`;
      }
      console.info('Auth refresh failed:', e);
    }
  };

  /**
   * Call refresh token API and update localStorage
   */
  private refreshAccessToken = async (): Promise<void> => {
    const response = await super.sendRequestHandler({
      serviceName: 'refresh',
    });

    if (response.status !== 200) {
      throw new AppError('AUTH', 'Token refresh failed');
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
      localStorage.setItem(REFRESH_TOKEN, response.data.refreshToken);
    }
  };

  /**
   * Classify and handle Axios errors
   */
  private handleRequestError = (args: SendParams, e: AxiosError<ApiError>) => {
    if (!e?.response) {
      throw new AppError('INTERNAL', 'E003_INTERNAL_ERROR');
    }

    switch (e.response.status) {
      case 401:
        return this.handle401AndRetry(args);
      case 403:
        throw new AppError('AUTHORISATION', 'E003_PERMISSION_DENIED');
      case 422:
        throw new AppError(
          e.response.data?.type || 'VALIDATION',
          e.response.data?.code || 'E003_VALIDATION_ERROR'
        );
      case 500:
        throw new AppError('INTERNAL', 'E003_INTERNAL_ERROR');
    }
  };
}

export default new RestService();
