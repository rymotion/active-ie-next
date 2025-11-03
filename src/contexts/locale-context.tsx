"use client";

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { type Locale, defaultLocale, locales } from '@/i18n/config';

type LocaleContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ 
  children, 
  initialLocale = defaultLocale 
}: { 
  children: ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    // Try to load saved locale from localStorage on initial mount
    if (typeof window !== 'undefined') {
      const savedLocale = localStorage.getItem('locale') as Locale;
      if (savedLocale && locales.includes(savedLocale)) {
        return savedLocale;
      }
    }
    return initialLocale;
  });

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    // Store in localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', newLocale);
    }
  }, []);

  // Sync with localStorage changes from other tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'locale' && e.newValue) {
        const newLocale = e.newValue as Locale;
        if (locales.includes(newLocale)) {
          setLocaleState(newLocale);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocaleContext() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocaleContext must be used within a LocaleProvider');
  }
  return context;
}
