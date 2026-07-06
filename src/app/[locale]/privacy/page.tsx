"use client";
import Screen from "@/components/screen/screen";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Container from "@/components/layout/container";

export default function Privacy() {
  const t = useTranslations();

  return (
    <Screen>
      <Container size="prose" className="py-12">
        <h1 className="mb-6 font-display text-display uppercase tracking-wide">
          {t("privacy.title")}
        </h1>
        <p className="text-base leading-relaxed">{t("privacy.content")}</p>
        <p className="mt-8">
          <Link
            href="/data-policy"
            className="text-blue-400 underline-offset-4 hover:text-blue-300 hover:underline"
          >
            {t("nav.dataPolicy")} →
          </Link>
        </p>
      </Container>
    </Screen>
  );
}
