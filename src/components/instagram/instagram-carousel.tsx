"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { IgPost } from "@/services/instagram";

/** Accessible Embla carousel of Instagram posts; each slide links to the post. */
export default function InstagramCarousel({ posts }: { posts: IgPost[] }) {
  const t = useTranslations();
  const reducedMotion = useReducedMotion();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    duration: reducedMotion ? 0 : 25,
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const arrowClass =
    "flex h-11 w-11 items-center justify-center rounded-full border border-cream/40 text-xl text-cream transition-colors hover:border-cream hover:text-white disabled:opacity-30 disabled:hover:border-cream/40";

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={t("instagram.carouselAria")}
    >
      <div ref={emblaRef} className="overflow-hidden">
        <ul className="flex gap-4">
          {posts.map((post, index) => (
            <li
              key={post.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} / ${posts.length}`}
              className="min-w-0 flex-[0_0_80%] sm:flex-[0_0_45%] lg:flex-[0_0_30%] xl:flex-[0_0_23%]"
            >
              <a
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden rounded-lg border border-cream/15"
              >
                <div className="relative aspect-square w-full bg-cream/5">
                  <Image
                    src={post.imageUrl}
                    alt={post.caption?.slice(0, 120) || t("instagram.postAlt")}
                    fill
                    sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  {post.mediaType === "VIDEO" ? (
                    <span
                      aria-hidden="true"
                      className="absolute right-3 top-3 rounded-full bg-black/70 px-2 py-1 text-xs text-white"
                    >
                      ▶
                    </span>
                  ) : null}
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <a
          href="https://www.instagram.com/actv_ie/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-cream underline-offset-4 hover:underline"
        >
          {t("instagram.follow")}
        </a>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canPrev}
            aria-label={t("instagram.previous")}
            className={arrowClass}
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canNext}
            aria-label={t("instagram.next")}
            className={arrowClass}
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
