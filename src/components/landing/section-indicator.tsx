"use client";

import { useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useSectionsOptional } from "./section-context";

/**
 * Rockstar-style right-edge rail: one dot per registered section, the
 * active one enlarged in maroon with its label revealed. Also the "where
 * am I" affordance for the landing scroll story.
 */
export default function SectionIndicator() {
  const ctx = useSectionsOptional();
  const reducedMotion = useReducedMotion();
  const t = useTranslations();

  if (!ctx || ctx.sections.length === 0) return null;
  const { sections, activeId } = ctx;

  const jumpTo = (el: HTMLElement) => {
    el.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
    el.focus({ preventScroll: true });
  };

  return (
    <nav
      aria-label={t("landing.sectionsAria")}
      className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
    >
      <ul className="flex flex-col items-end gap-3">
        {sections.map((section) => {
          const active = section.id === activeId;
          return (
            <li key={section.id} className="flex items-center justify-end gap-2">
              <span
                aria-hidden="true"
                className={`whitespace-nowrap font-display text-sm uppercase tracking-widest text-cream transition-opacity duration-150 ${
                  active ? "opacity-100" : "opacity-0"
                }`}
              >
                {section.label}
              </span>
              <button
                type="button"
                onClick={() => jumpTo(section.el)}
                aria-label={section.label}
                aria-current={active ? "true" : undefined}
                className="flex h-6 w-6 items-center justify-center"
              >
                <span
                  aria-hidden="true"
                  className={`block rounded-full transition-all duration-200 ${
                    active
                      ? "h-3.5 w-3.5 bg-maroon ring-2 ring-cream/60"
                      : "h-2 w-2 bg-cream/50 hover:bg-cream"
                  }`}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
