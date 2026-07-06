"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { routesBySection } from "@/lib/site-routes";
import LanguageSwitcher from "@/components/language-switcher";
import FooterChamberWidget from "./footer-chamber-widget";
import { openConsentBanner } from "@/components/consent/use-consent";

/** Evenly balanced 4-column footer: About · Explore · Legal · Partners. */
export default function Footer() {
  const t = useTranslations();
  const exploreRoutes = [
    ...routesBySection("main"),
    ...routesBySection("getInvolved"),
    ...routesBySection("programs"),
  ].filter((route) => route.path !== "/" && route.path !== "/special-event");
  const legalRoutes = routesBySection("legal");

  const headingClass =
    "mb-4 font-display text-lg uppercase tracking-wider text-white";
  const linkClass =
    "text-sm text-gray-300 transition-colors hover:text-white hover:underline";

  return (
    <div className="w-full border-t border-gray-700 bg-black text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-[var(--gutter)] py-10 sm:grid-cols-2 lg:grid-cols-4">
        <section>
          <h2 className={headingClass}>{t("footer.aboutHeading")}</h2>
          <div className="flex flex-col gap-2 text-sm leading-6 text-gray-300">
            <p>{t("footer.nonprofitInfo")}</p>
            <p>{t("footer.ein")}</p>
            <p>
              {t("footer.moreInfo")}{" "}
              <a
                href="mailto:organization@activeie.org"
                className="text-blue-400 hover:text-blue-300 hover:underline"
              >
                organization@activeie.org
              </a>
            </p>
          </div>
        </section>

        <nav aria-label={t("footer.exploreHeading")}>
          <h2 className={headingClass}>{t("footer.exploreHeading")}</h2>
          <ul className="flex flex-col gap-2">
            {exploreRoutes.map((route) => (
              <li key={route.path}>
                <Link href={route.path} className={linkClass}>
                  {t(route.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t("footer.legalHeading")}>
          <h2 className={headingClass}>{t("footer.legalHeading")}</h2>
          <ul className="flex flex-col gap-2">
            {legalRoutes.map((route) => (
              <li key={route.path}>
                <Link href={route.path} className={linkClass}>
                  {t(route.labelKey)}
                </Link>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={openConsentBanner}
                className={`${linkClass} text-left`}
              >
                {t("footer.manageCookies")}
              </button>
            </li>
          </ul>
          <div className="mt-6">
            <LanguageSwitcher />
          </div>
        </nav>

        <section>
          <h2 className={headingClass}>{t("footer.partnersHeading")}</h2>
          <div className="flex flex-col items-start gap-4">
            <a
              href="https://app.candid.org/profile/15951102"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://widgets.guidestar.org/prod/v1/pdp/transparency-seal/15951102/svg"
                alt={t("footer.guidestarAlt")}
                className="h-14 w-auto"
              />
            </a>
            <FooterChamberWidget />
          </div>
        </section>
      </div>

      <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Active: Inland Empire Inc
      </div>
    </div>
  );
}
