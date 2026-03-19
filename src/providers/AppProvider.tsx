'use client';

// ============================================
// AppProvider — Theme Context
// ============================================
// Single source of truth for theme (dark/light).
// Persists to localStorage, applies to <html>.
// ============================================

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';

// ============================================
// Context
// ============================================

interface ThemeContextValue {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  isDark: true,
  toggleTheme: () => {},
});

// ============================================
// Provider
// ============================================

function getStoredTheme(): boolean {
  if (typeof window === 'undefined') return true;
  const stored = localStorage.getItem('isDark');
  return stored !== null ? JSON.parse(stored) : true;
}

export default function AppProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(getStoredTheme);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  // Persist + apply to DOM
  useEffect(() => {
    localStorage.setItem('isDark', JSON.stringify(isDark));
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('light', !isDark);
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// ============================================
// Hook
// ============================================

export const useTheme = () => useContext(ThemeContext);
