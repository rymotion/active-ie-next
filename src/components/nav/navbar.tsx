"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import Logo from "@/assets/logo.png";
import { navRoutes } from "@/lib/site-routes";
import HamburgerButton from "./hamburger-button";
import MobileMenu from "./mobile-menu";
import { useScrollDirection } from "./use-scroll-direction";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { useFocusTrap } from "@/hooks/use-focus-trap";

type NavbarProps = {
  /** Landing page: transparent over the hero until the page is scrolled. */
  transparent?: boolean;
};

export default function Navbar({ transparent = false }: NavbarProps) {
  const t = useTranslations();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuId = useId();
  const { hidden, scrolled } = useScrollDirection(80);

  useScrollLock(menuOpen);
  useFocusTrap(headerRef, menuOpen);

  // Never hide the banner while the menu is open or a keyboard user is in it.
  const isHidden = hidden && !menuOpen && !focusWithin;
  const solid = scrolled || menuOpen || !transparent;

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  return (
    // The outer header must never carry a transform: the fullscreen menu is
    // position:fixed and a transformed ancestor would become its containing
    // block, clipping it to the bar. Only the inner bar animates.
    <header
      ref={headerRef}
      onFocusCapture={() => setFocusWithin(true)}
      onBlurCapture={(event) => {
        if (!headerRef.current?.contains(event.relatedTarget as Node)) {
          setFocusWithin(false);
        }
      }}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 text-white"
    >
      <motion.div
        animate={{ y: isHidden ? "-100%" : "0%" }}
        transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
        className={`pointer-events-auto relative z-50 flex h-20 items-center justify-between px-[var(--gutter)] transition-colors duration-300 ${
          solid ? "bg-black/80 shadow-xl backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src={Logo}
            alt=""
            width={56}
            height={56}
            className="h-14 w-14 object-contain"
            priority
          />
          <span className="font-display text-xl tracking-wide sm:text-2xl">
            {t("nav.organizationName")}
          </span>
        </Link>

        {/* Desktop links */}
        <nav
          aria-label={t("nav.organizationName")}
          className="hidden lg:block"
        >
          <ul className="flex items-center gap-6 xl:gap-8">
            {navRoutes.map((route) => (
              <li key={route.path} className="relative">
                <Link
                  href={route.path}
                  aria-current={isActive(route.path) ? "page" : undefined}
                  className={`py-2 text-sm font-semibold uppercase tracking-wider transition-colors xl:text-base ${
                    isActive(route.path)
                      ? "text-white"
                      : "text-cream/80 hover:text-white"
                  }`}
                >
                  {t(route.labelKey)}
                </Link>
                {isActive(route.path) ? (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-maroon"
                  />
                ) : null}
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile: hamburger on the right */}
        <div className="lg:hidden">
          <HamburgerButton
            open={menuOpen}
            onToggle={() => setMenuOpen((v) => !v)}
            openLabel={t("common.menu")}
            closeLabel={t("common.close")}
            controlsId={menuId}
          />
        </div>
      </motion.div>

      <MobileMenu id={menuId} open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
