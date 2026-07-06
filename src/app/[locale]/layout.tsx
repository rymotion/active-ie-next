import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import "../globals.css";
import { bebe } from "../fonts";
import { routing } from "@/i18n/routing";
import { CartProvider } from "@/contexts/cart-context";
import ConsentBanner from "@/components/consent/consent-banner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://activeie.org";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  // hreflang alternates: en is unprefixed, other locales use /xx.
  const languages = Object.fromEntries([
    ...routing.locales.map((loc) => [
      loc,
      loc === routing.defaultLocale ? BASE_URL : `${BASE_URL}/${loc}`,
    ]),
    ["x-default", BASE_URL],
  ]);

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: t("meta.siteTitle"),
      template: `%s | ${t("meta.siteTitle")}`,
    },
    description: t("meta.siteDescription"),
    alternates: { languages },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bebe.variable} antialiased`}
      >
        <NextIntlClientProvider>
          <CartProvider>{children}</CartProvider>
          {/* GDPR: ContentSquare loads only after consent (inside the banner). */}
          <ConsentBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
