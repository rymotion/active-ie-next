"use client";
import Image from "next/image";
import Screen from "@/components/screen/screen";
import { Analytics } from "@vercel/analytics/react";
import { useTranslations } from "next-intl";
import Container from "@/components/layout/container";

const D2D_URL = "https://www.instagram.com/death2detox/";

export default function Addc() {
  const t = useTranslations();

  return (
    <>
      <Analytics />
      <Screen>
        <Container size="content" className="flex min-h-[70vh] flex-col items-center justify-center gap-6 py-12 text-center">
          <Image
            src="https://cdn.shopify.com/s/files/1/0638/5536/2102/files/be-wave-sticker-band-aid-brand.png?v=1754035334"
            alt={t("addc.title")}
            width={240}
            height={240}
          />
          <h1 className="font-display text-display uppercase tracking-wide">
            {t("addc.title")}
          </h1>
          <p className="max-w-xl text-lg text-cream/80">{t("addc.description")}</p>
          <a
            href={D2D_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-maroon px-6 py-3 font-semibold text-white transition-colors hover:bg-red-800"
          >
            @death2detox
          </a>
        </Container>
      </Screen>
    </>
  );
}
