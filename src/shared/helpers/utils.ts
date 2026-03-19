// ============================================
// Utility Functions
// ============================================

/**
 * Get value from localStorage with fallback default
 */
export const getItemFromStore = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  
  try {
    const stored = localStorage.getItem(key);
    if (stored === null) return defaultValue;
    
    // Try to parse JSON, fallback to raw string
    try {
      return JSON.parse(stored) as T;
    } catch {
      return stored as unknown as T;
    }
  } catch {
    return defaultValue;
  }
};

/**
 * Set value in localStorage (auto-stringify objects)
 */
export const setItemToStore = <T>(key: string, value: T): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const serialized = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, serialized);
  } catch (error) {
    console.warn(`Failed to set localStorage key "${key}":`, error);
  }
};

/**
 * Get CSS custom property value from document
 */
export const getColor = (name: string): string => {
  if (typeof window === 'undefined') return '';
  
  const style = getComputedStyle(document.documentElement);
  return style.getPropertyValue(`--color-${name}`).trim();
};

/**
 * Debounce function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), wait);
  };
};

/**
 * Format date string to locale
 */
export const formatDate = (dateStr: string, locale: string = 'vi-VN'): string => {
  try {
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
};

/**
 * Classnames merge helper (simple version)
 */
export const cn = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(' ');
};
