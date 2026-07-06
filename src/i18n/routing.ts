import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es", "tl", "zh"],
  defaultLocale: "en",
  // English stays unprefixed so all existing URLs keep working.
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
