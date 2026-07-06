"use client";
import Screen from "@/components/screen/screen";
import NewsletterWidget from "./newsletter_subscribe";
import { Analytics } from "@vercel/analytics/react";
import { useTranslations } from "next-intl";
import Container from "@/components/layout/container";
import InstagramSection from "@/components/instagram/instagram-section";
import type { IgPost } from "@/services/instagram";

export default function Contact({ igPosts }: { igPosts: IgPost[] | null }) {
  const t = useTranslations();

  return (
    <Screen>
      <Container size="content" className="py-12">
        <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4">
          <h1 className="font-display text-display uppercase tracking-wide">
            {t("nav.contact")}
          </h1>
          <a
            href="mailto:organization@activeie.org"
            className="text-lg text-blue-400 hover:text-blue-300"
          >
            organization@activeie.org
          </a>
        </div>
        <div className="flex justify-center py-8">
          <NewsletterWidget />
        </div>
      </Container>
      <Container size="wide">
        <InstagramSection posts={igPosts} />
      </Container>
      <Analytics />
    </Screen>
  );
}
