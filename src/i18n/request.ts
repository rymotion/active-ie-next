import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
    // Mirror the legacy behavior: a missing key renders its key path
    // instead of crashing, so partially translated locales degrade softly.
    getMessageFallback: ({ namespace, key }) =>
      [namespace, key].filter(Boolean).join("."),
    onError: (error) => {
      if (process.env.NODE_ENV !== "production") {
        console.warn("[i18n]", error.message);
      }
    },
  };
});
