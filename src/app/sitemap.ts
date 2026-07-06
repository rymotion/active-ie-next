import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { siteRoutes } from "@/lib/site-routes";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://activeie.org";

// en is unprefixed (localePrefix: "as-needed"); other locales get /xx.
const urlFor = (locale: string, path: string) =>
  locale === routing.defaultLocale
    ? `${BASE_URL}${path === "/" ? "" : path}`
    : `${BASE_URL}/${locale}${path === "/" ? "" : path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  return siteRoutes
    .filter((route) => route.includeInSitemap)
    .map((route) => ({
      url: urlFor(routing.defaultLocale, route.path),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: Object.fromEntries([
          ...routing.locales.map((locale) => [
            locale,
            urlFor(locale, route.path),
          ]),
          ["x-default", urlFor(routing.defaultLocale, route.path)],
        ]),
      },
    }));
}
