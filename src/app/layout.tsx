import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { bebe } from "./fonts";
import { CartProvider } from "@/contexts/cart-context";
import { TranslationProvider } from "@/hooks/useTranslation";
import { translations } from "@/i18n/translations";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Active Inland Empire",
  description:
    "Active Inland Empire is the nonprofit building community through sport, lowering financial barriers to participate in sports, health, and wellness activites.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://t.contentsquare.net/uxa/b1b8e045f7fdb.js"
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bebe.variable} antialiased`}
      >
        <TranslationProvider translations={translations}>
          <CartProvider>{children}</CartProvider>
        </TranslationProvider>
      </body>
    </html>
  );
}
