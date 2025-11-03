"use client";

import { locales, type Locale } from "@/i18n/config";
import { useLocaleContext } from "@/contexts/locale-context";
import { useState } from 'react';

const languageNames: Record<Locale, string> = {
  en: "English",
  es: "Español",
  tl: "Tagalog",
};

const languageFlags: Record<Locale, string> = {
  en: "🇺🇸",
  es: "🇪🇸",
  tl: "🇵🇭",
};

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocaleContext();
  const [isChanging, setIsChanging] = useState(false);

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;
    
    setIsChanging(true);
    setLocale(newLocale);
    
    // Reset changing state after animation
    setTimeout(() => setIsChanging(false), 300);
  };

  return (
    <div className="flex gap-2 flex-wrap">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          disabled={isChanging}
          className={`px-3 py-1 rounded transition-all duration-200 flex items-center gap-1 ${
            locale === loc
              ? "bg-white text-black font-bold shadow-md scale-105"
              : "bg-gray-800 text-white hover:bg-gray-700 hover:scale-105"
          } ${isChanging ? "opacity-50 cursor-wait" : "cursor-pointer"}`}
          aria-label={`Switch to ${languageNames[loc]}`}
          title={languageNames[loc]}
        >
          <span>{languageFlags[loc]}</span>
          <span>{loc.toUpperCase()}</span>
        </button>
      ))}
    </div>
  );
}
