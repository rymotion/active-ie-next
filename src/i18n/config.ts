import { routing, type Locale } from "./routing";

export const locales = routing.locales;
export type { Locale };

export const defaultLocale: Locale = routing.defaultLocale;

export const localeNames: Record<Locale, string> = {
  en: "English",
  es: "Español",
  tl: "Tagalog",
  zh: "简体中文",
};

export const localeFlags: Record<Locale, string> = {
  en: "🇺🇸",
  es: "🇪🇸",
  tl: "🇵🇭",
  zh: "🇨🇳",
};
