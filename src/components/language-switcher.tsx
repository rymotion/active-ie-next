"use client";

import { useTranslation, Locale } from '@/hooks/useTranslation';

const localeInfo: Record<Locale, { name: string; flag: string }> = {
  en: { name: "English", flag: "🇺🇸" },
  es: { name: "Español", flag: "🇪🇸" },
  tl: { name: "Tagalog", flag: "🇵🇭" },
};

export default function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation();

  return (
    <div className="flex gap-2 flex-wrap">
      {(Object.keys(localeInfo) as Locale[]).map((loc) => (
        <button
          key={loc}
          onClick={() => setLocale(loc)}
          className={`px-3 py-1 rounded transition-all duration-200 flex items-center gap-1 ${
            locale === loc
              ? "bg-white text-black font-bold shadow-md"
              : "bg-gray-800 text-white hover:bg-gray-700"
          }`}
          aria-label={`Switch to ${localeInfo[loc].name}`}
          title={localeInfo[loc].name}
        >
          <span>{localeInfo[loc].flag}</span>
          <span>{loc.toUpperCase()}</span>
        </button>
      ))}
    </div>
  );
}
