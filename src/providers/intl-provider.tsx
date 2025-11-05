"use client";

import { NextIntlClientProvider } from "next-intl";
import { ReactNode, useEffect, useState } from "react";
import { LocaleProvider, useLocaleContext } from "@/contexts/locale-context";
import { type Locale } from "@/i18n/config";

type IntlProviderProps = {
  locale: string;
  messages: Record<string, unknown>;
  children: ReactNode;
};

function IntlContent({
  initialLocale,
  initialMessages,
  children,
}: {
  initialLocale: Locale;
  initialMessages: Record<string, unknown>;
  children: ReactNode;
}) {
  const { locale } = useLocaleContext();
  const [messages, setMessages] = useState(initialMessages);
  const [currentLocale, setCurrentLocale] = useState(initialLocale);

  useEffect(() => {
    // Load new messages when locale changes
    if (locale !== currentLocale) {
      import(`../../website_strings/${locale}.json`)
        .then((newMessages) => {
          setMessages(newMessages.default);
          setCurrentLocale(locale);
        })
        .catch((error) => {
          console.error(`Failed to load messages for locale: ${locale}`, error);
        });
    }
  }, [locale, currentLocale]);

  return (
    <NextIntlClientProvider locale={currentLocale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}

export default function IntlProvider({
  locale,
  messages,
  children,
}: IntlProviderProps) {
  return (
    <LocaleProvider initialLocale={locale as Locale}>
      <IntlContent initialLocale={locale as Locale} initialMessages={messages}>
        {children}
      </IntlContent>
    </LocaleProvider>
  );
}
