import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Screen from "@/components/screen/screen";
import Container from "@/components/layout/container";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return { title: t("dataPolicy.title"), description: t("dataPolicy.intro") };
}

const SECTION_KEYS = [
  "collect",
  "why",
  "retention",
  "rights",
  "cookies",
  "contact",
] as const;

export default async function DataPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <Screen>
      <Container size="prose" className="py-12">
        <h1 className="mb-6 font-display text-display uppercase tracking-wide">
          {t("dataPolicy.title")}
        </h1>
        <p className="mb-10 text-lg text-cream/90">{t("dataPolicy.intro")}</p>
        {SECTION_KEYS.map((key) => (
          <section key={key} className="mb-8">
            <h2 className="mb-3 font-display text-title uppercase tracking-wide">
              {t(`dataPolicy.${key}Heading`)}
            </h2>
            <p className="whitespace-pre-line leading-7 text-cream/80">
              {t(`dataPolicy.${key}Body`)}
            </p>
          </section>
        ))}
        <p className="text-sm text-gray-400">
          {t("dataPolicy.contactEmailLabel")}{" "}
          <a
            href="mailto:organization@activeie.org"
            className="text-blue-400 hover:text-blue-300"
          >
            organization@activeie.org
          </a>
        </p>
      </Container>
    </Screen>
  );
}
