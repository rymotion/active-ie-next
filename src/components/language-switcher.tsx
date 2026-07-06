"use client";

import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, localeFlags, localeNames, type Locale } from "@/i18n/config";

export default function LanguageSwitcher() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const switchTo = (next: Locale) => {
    // Re-render the current route under the chosen locale. next-intl also
    // persists the choice in the NEXT_LOCALE cookie for future visits.
    router.replace(
      // @ts-expect-error -- params are compatible with the current pathname
      { pathname, params },
      { locale: next }
    );
  };

  return (
    <div role="group" aria-label={t("common.language")} className="flex gap-2 flex-wrap">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchTo(loc)}
          aria-pressed={locale === loc}
          className={`px-3 py-1 rounded transition-all duration-200 flex items-center gap-1 ${
            locale === loc
              ? "bg-white text-black font-bold shadow-md"
              : "bg-gray-800 text-white hover:bg-gray-700"
          }`}
          title={localeNames[loc]}
        >
          <span aria-hidden="true">{localeFlags[loc]}</span>
          <span>{localeNames[loc]}</span>
        </button>
      ))}
    </div>
  );
}
