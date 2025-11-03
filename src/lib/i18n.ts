import { locales, defaultLocale, type Locale } from "@/i18n/config";

export async function getMessages(locale: Locale = defaultLocale) {
  try {
    const messages = await import(`../../website_strings/${locale}.json`);
    return messages.default;
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error);
    // Fallback to default locale
    const fallbackMessages = await import(
      `../../website_strings/${defaultLocale}.json`
    );
    return fallbackMessages.default;
  }
}

export { locales, defaultLocale };
export type { Locale };
