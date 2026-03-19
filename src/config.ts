// ============================================
// App Config — Default settings
// ============================================

export interface Config {
  appName: string;
  version: string;
  defaultLanguage: 'en' | 'vi';
  pagination: {
    defaultPage: number;
    defaultLimit: number;
    limitOptions: number[];
  };
  theme: {
    default: 'light' | 'dark';
  };
  api: {
    timeout: number;
    retryCount: number;
    staleTime: number;
  };
}

export const appConfig: Config = {
  appName: process.env.NEXT_PUBLIC_APP_NAME || 'Pulse Labs',
  version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
  defaultLanguage: 'vi',
  pagination: {
    defaultPage: 1,
    defaultLimit: 50,
    limitOptions: [10, 25, 50, 100],
  },
  theme: {
    default: 'light',
  },
  api: {
    timeout: 30000,
    retryCount: 3,
    staleTime: 5 * 60 * 1000, // 5 minutes
  },
};
