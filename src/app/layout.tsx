import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/cart-context";
import IntlProvider from "@/providers/intl-provider";
import { getMessages, defaultLocale } from '@/lib/i18n';

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get the locale from the request or default to 'en'
  const locale = defaultLocale;
  const messages = await getMessages(locale);

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <IntlProvider locale={locale} messages={messages}>
          <CartProvider>{children}</CartProvider>
        </IntlProvider>
      </body>
    </html>
  );
}
