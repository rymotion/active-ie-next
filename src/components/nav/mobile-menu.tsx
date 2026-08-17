"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { navRoutes } from "@/lib/site-routes";
import LanguageSwitcher from "@/components/language-switcher";

type MobileMenuProps = {
  id: string;
  open: boolean;
  onClose: () => void;
};

// apple.com-style: panel expands down from the header, links stagger in.
const easing = [0.32, 0.72, 0, 1] as const;

export default function MobileMenu({ id, open, onClose }: MobileMenuProps) {
  const t = useTranslations();
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();

  // Close on Escape; make the rest of the page inert for assistive tech.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const main = document.querySelector("main");
    main?.setAttribute("inert", "");
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      main?.removeAttribute("inert");
    };
  }, [open, onClose]);

  const panelVariants = reducedMotion
    ? {
        open: { opacity: 1, transition: { duration: 0.15 } },
        closed: { opacity: 0, transition: { duration: 0.15 } },
      }
    : {
        open: {
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          transition: { duration: 0.48, ease: easing },
        },
        closed: {
          opacity: 1,
          clipPath: "inset(0% 0% 100% 0%)",
          transition: { duration: 0.32, ease: easing },
        },
      };

  const listVariants = {
    open: {
      transition: { delayChildren: 0.15, staggerChildren: 0.05 },
    },
    closed: {
      transition: { staggerChildren: 0.02, staggerDirection: -1 },
    },
  };

  const itemVariants = reducedMotion
    ? {
        open: { opacity: 1 },
        closed: { opacity: 0 },
      }
    : {
        open: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.32, ease: [0.25, 0.1, 0.25, 1] as const },
        },
        closed: { opacity: 0, y: 16, transition: { duration: 0.15 } },
      };

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id={id}
          initial="closed"
          animate="open"
          exit="closed"
          variants={panelVariants}
          className="pointer-events-auto fixed inset-0 z-40 flex flex-col overflow-y-auto bg-black/85 pb-10 pt-24 backdrop-blur-xl lg:hidden"
        >
          <nav aria-label={t("nav.organizationName")} className="px-8">
            <motion.ul variants={listVariants} className="flex flex-col gap-2">
              {navRoutes.map((route) => (
                <motion.li key={route.path} variants={itemVariants}>
                  <Link
                    href={route.path}
                    onClick={onClose}
                    aria-current={isActive(route.path) ? "page" : undefined}
                    className={`block py-2 font-display text-title uppercase tracking-wide transition-colors ${
                      isActive(route.path)
                        ? "text-white underline decoration-maroon decoration-4 underline-offset-8"
                        : "text-cream hover:text-white"
                    }`}
                  >
                    {t(route.labelKey)}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </nav>

          <motion.div
            variants={itemVariants}
            initial="closed"
            animate="open"
            transition={{ delay: 0.35 }}
            className="mt-auto flex flex-col gap-6 px-8 pt-10"
          >
            <LanguageSwitcher />
            <Link href="/ritual" onClick={onClose} className="w-fit">
              <Image
                src="https://cdn.shopify.com/s/files/1/0638/5536/2102/files/be-wave-sticker-band-aid-brand.png?v=1754035334"
                alt={t("nav.ritual")}
                width={160}
                height={160}
              />
            </Link>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
