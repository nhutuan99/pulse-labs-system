// ============================================
// i18n Configuration — i18next (EN/VI)
// ============================================

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation resources
import en from '@/shared/locales/en/common.json';
import vi from '@/shared/locales/vi/common.json';

const resources = {
  en: { translation: en },
  vi: { translation: vi },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'vi', // Default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React already escapes
  },
  react: {
    useSuspense: false, // Disable suspense for SSR compatibility
  },
});

export default i18n;
