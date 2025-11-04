"use client";

import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";

// Supported locales
export type Locale = "en" | "es" | "tl";

// Translation context
type TranslationContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
};

const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined
);

// Simple translation hook
export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within TranslationProvider");
  }
  return context;
}

// Translation provider props
type TranslationProviderProps = {
  children: ReactNode;
  translations: Record<Locale, Record<string, string>>;
};

// Translation provider component
export function TranslationProvider({
  children,
  translations,
}: TranslationProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    // Load from localStorage on mount
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("locale") as Locale;
      if (saved && ["en", "es", "tl"].includes(saved)) {
        return saved;
      }
    }
    return "en";
  });

  // Save to localStorage when locale changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("locale", locale);
    }
  }, [locale]);

  // Translation function
  const t = (key: string): string => {
    const keys = key.split(".");
    let value = translations[locale];
    var retValue = "";

    for (const k of keys) {
      if (value && typeof value === "object") {
        retValue = value[k].toString();
      } else {
        return key; // Return key if translation not found
      }
    }

    return typeof value === "string" ? retValue : key;
  };

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
  };

  return (
    <TranslationContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </TranslationContext.Provider>
  );
}
