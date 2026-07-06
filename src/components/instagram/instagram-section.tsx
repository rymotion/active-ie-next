"use client";

import { useTranslations } from "next-intl";
import type { IgPost } from "@/services/instagram";
import InstagramCarousel from "./instagram-carousel";
import InstagramFallback from "./instagram-fallback";

/**
 * Drop-in Instagram block: heading + carousel, or the branded fallback
 * when the feed is unavailable. Posts are fetched by each page's server
 * shell (getInstagramMedia) and passed down.
 */
export default function InstagramSection({
  posts,
  heading,
}: {
  posts: IgPost[] | null;
  heading?: string;
}) {
  const t = useTranslations();

  return (
    <section className="w-full py-12">
      <h2 className="mb-8 text-center font-display text-title uppercase tracking-wide">
        {heading ?? t("instagram.title")}
      </h2>
      {posts && posts.length > 0 ? (
        <InstagramCarousel posts={posts} />
      ) : (
        <InstagramFallback />
      )}
    </section>
  );
}
