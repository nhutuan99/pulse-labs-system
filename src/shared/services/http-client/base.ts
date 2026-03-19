import axios, { AxiosError, AxiosResponse } from 'axios';
import { ACCESS_TOKEN } from '@/shared/constant';
import ServiceList from './service-list';

// ============================================
// Types
// ============================================

export interface RestParams {
  serviceName: string;
  params?: Record<string, any>;
  query?: Record<string, any>;
}

export interface SendParams extends RestParams {
  body?: Record<string, any>;
  timeout?: number;
  headers?: Record<string, string>;
}

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

// ============================================
// Pending request tracker (GET deduplication)
// ============================================

const pendingRequests: Record<string, AbortController> = {};

// ============================================
// Helper: stringify query params
// ============================================

function stringifyQuery(query: Record<string, any>): string {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value != null && value !== '') {
      params.append(key, String(value));
    }
  });
  return params.toString();
}

// ============================================
// ClientRestBase — Axios wrapper
// ============================================
// - Auto Bearer token injection
// - GET request deduplication (abort previous)
// - ServiceList-based endpoint resolution
// ============================================

class ClientRestBase {
  // Ensure interceptor is registered only once across all instances
  private static interceptorAttached = false;

  constructor() {
    if (!ClientRestBase.interceptorAttached) {
      axios.interceptors.request.use((request) => {
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem(ACCESS_TOKEN);
          if (token) {
            request.headers['Authorization'] = `Bearer ${token}`;
          }

          if (process.env.NEXT_PUBLIC_IS_LOCAL === 'true') {
            request.headers['x-local-dev'] = process.env.NEXT_PUBLIC_PASS_KEY || '';
          }
        }

        if (request.method?.toLowerCase() === 'post' && !request.headers['Content-Type']) {
          request.headers['Content-Type'] = 'application/json';
        }
        return request;
      });
      ClientRestBase.interceptorAttached = true;
    }
  }

  /**
   * Parse serviceName → { method, url }
   * Replaces :params in URL and appends query string
   */
  private static getService(args: RestParams): { method: Method; url: string } {
    if (!ServiceList[args.serviceName]) {
      throw new Error('Service not found: ' + args.serviceName);
    }

    const [method, uri] = ServiceList[args.serviceName].split(' ');
    let url = `${ServiceList.base_url}${uri}`;

    // Replace :params in URL
    if (args.params) {
      Object.keys(args.params).forEach((key) => {
        if (args.params && args.params[key] != null) {
          url = url.replace(`:${key}`, args.params[key].toString());
        }
      });
    }

    // Append query string
    if (args.query) {
      const qs = stringifyQuery(args.query);
      if (qs) {
        url = `${url}?${qs}`;
      }
    }

    return {
      method: method.toUpperCase() as Method,
      url,
    };
  }

  /**
   * Core request handler
   * - Aborts duplicate GET requests
   * - Interceptor handles auth headers (registered once in constructor)
   */
  protected sendRequestHandler(args: SendParams): Promise<any> {
    const { url, method } = ClientRestBase.getService({
      params: args.params,
      query: args.query,
      serviceName: args.serviceName,
    });

    return new Promise((resolve, reject) => {
      const controller = new AbortController();

      // GET deduplication: abort previous same-endpoint request
      const pendingRequestsKey = url + method;
      if (method === 'GET') {
        if (Object.prototype.hasOwnProperty.call(pendingRequests, pendingRequestsKey)) {
          pendingRequests[pendingRequestsKey].abort();
          delete pendingRequests[pendingRequestsKey];
        }
        pendingRequests[pendingRequestsKey] = controller;
      }

      const requestConfig = {
        method,
        url,
        data: args.body ?? {},
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...(args.headers || {}),
        } as Record<string, string>,
      };

      axios
        .request(requestConfig)
        .then((response: AxiosResponse) => {
          resolve(JSON.parse(JSON.stringify(response)));
        })
        .catch((err: AxiosError) => {
          if (err.name === 'AbortError' || err.name === 'CanceledError') {
            return;
          }
          reject(err);
        });
    });
  }
}

export default ClientRestBase;
