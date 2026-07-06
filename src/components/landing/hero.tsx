"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import Logo from "@/assets/logo.png";
import { ScrollArrow } from "@/components/scroll-arrow";

/** Full-viewport opening frame of the scroll story. */
export default function Hero() {
  const t = useTranslations();
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-[var(--gutter)] text-center">
      <motion.div
        initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex flex-col items-center gap-6"
      >
        <Image
          src={Logo}
          alt=""
          priority
          className="h-28 w-28 object-contain sm:h-36 sm:w-36"
        />
        <h1 className="max-w-5xl font-display text-display-xl uppercase leading-none tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
          {t("nav.organizationName")}
        </h1>
        <p className="max-w-2xl text-lg text-cream/90 drop-shadow sm:text-xl">
          {t("landing.heroTagline")}
        </p>
      </motion.div>
      <ScrollArrow duration={5000} />
    </section>
  );
}
