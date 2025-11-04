"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { type Locale, defaultLocale } from "@/i18n/config";

type LocaleContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

type LocaleProviderProps = {
  initialLocale: Locale;
  children: ReactNode;
};

export function LocaleProvider({ initialLocale, children }: LocaleProviderProps) {
  const [locale, setLocale] = useState<Locale>(initialLocale || defaultLocale);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocaleContext() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error("useLocaleContext must be used within a LocaleProvider");
  }
  return context;
}
