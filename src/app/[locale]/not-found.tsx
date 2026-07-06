"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="font-display text-display">404</h1>
      <p className="max-w-prose text-lg text-gray-300">
        {t("common.notFound")}
      </p>
      <Link
        href="/"
        className="rounded bg-maroon px-6 py-3 font-semibold text-white transition-colors hover:bg-red-700"
      >
        {t("nav.home")}
      </Link>
    </main>
  );
}
