export const locales = ["en", "es", "tl"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
