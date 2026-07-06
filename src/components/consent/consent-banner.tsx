"use client";

import Script from "next/script";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useConsent } from "./use-consent";

/**
 * Non-modal consent region (WCAG: last in DOM, no focus trap) gating the
 * ContentSquare behavioral analytics script. Vercel Analytics is cookieless
 * and stays ungated. Event analytics fund future events — explained on the
 * data-policy page the banner links to.
 */
export default function ConsentBanner() {
  const t = useTranslations();
  const { consent, setConsent, bannerVisible } = useConsent();

  return (
    <>
      {consent === "granted" ? (
        <Script
          src="https://t.contentsquare.net/uxa/b1b8e045f7fdb.js"
          strategy="afterInteractive"
        />
      ) : null}

      {bannerVisible ? (
        <div
          role="region"
          aria-label={t("consent.ariaLabel")}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-cream/20 bg-black/95 p-4 backdrop-blur-md"
        >
          <div className="mx-auto flex max-w-5xl flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-cream/90">
              {t("consent.message")}{" "}
              <Link href="/data-policy" className="underline underline-offset-2 hover:text-white">
                {t("consent.learnMore")}
              </Link>
            </p>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => setConsent("granted")}
                className="rounded-md bg-maroon px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-800"
              >
                {t("consent.accept")}
              </button>
              <button
                type="button"
                onClick={() => setConsent("denied")}
                className="rounded-md border border-cream/40 px-4 py-2 text-sm font-semibold text-cream transition-colors hover:border-cream hover:text-white"
              >
                {t("consent.decline")}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
