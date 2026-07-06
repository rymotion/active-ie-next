import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Screen from "@/components/screen/screen";
import Container from "@/components/layout/container";
import { Link } from "@/i18n/navigation";
import { routesBySection, type SiteSection } from "@/lib/site-routes";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return { title: t("sitemapPage.title") };
}

const SECTIONS: SiteSection[] = ["main", "getInvolved", "programs", "legal"];

export default async function SitemapPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <Screen>
      <Container size="content" className="py-12">
        <h1 className="mb-2 font-display text-display uppercase tracking-wide">
          {t("sitemapPage.title")}
        </h1>
        <p className="mb-10 text-cream/80">{t("sitemapPage.description")}</p>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {SECTIONS.map((section) => (
            <nav key={section} aria-label={t(`sitemapPage.sections.${section}`)}>
              <h2 className="mb-4 font-display text-title uppercase tracking-wide">
                {t(`sitemapPage.sections.${section}`)}
              </h2>
              <ul className="flex flex-col gap-2">
                {routesBySection(section).map((route) => (
                  <li key={route.path}>
                    <Link
                      href={route.path}
                      className="text-cream/90 underline-offset-4 hover:text-white hover:underline"
                    >
                      {t(route.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </Container>
    </Screen>
  );
}
