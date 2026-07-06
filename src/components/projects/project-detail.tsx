"use client";

import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import type { ProjectContent } from "@/content/projects";
import type { FundingNumbers } from "@/services/funding";
import FundingProgress from "./funding-progress";
import ShareCta from "./share-cta";

/**
 * One full-funnel project section:
 * Discovery (hook) → Connection (story + real numbers + evidence)
 * → Conversion (one primary ask, micro-asks after).
 */
export default function ProjectDetail({
  project,
  funding,
  /** Evidence for the Connection stage: forms, slideshows, embeds. */
  children,
}: {
  project: ProjectContent;
  funding: FundingNumbers;
  children?: ReactNode;
}) {
  const t = useTranslations();
  const base = `projects.items.${project.i18nKey}`;
  const shareUrl = `https://activeie.org/projects#${project.anchor}`;

  return (
    <section
      id={project.anchor}
      className="scroll-mt-24 border-b border-cream/10 py-16 last:border-b-0"
    >
      {/* Discovery */}
      <h2 className="mb-4 font-display text-display uppercase tracking-wide">
        {t(`${base}.hook`)}
      </h2>

      {/* Connection */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="mb-4 text-lg text-cream/90">{t(`${base}.summary`)}</p>
          <p className="mb-8 text-cream/80">{t(`${base}.story`)}</p>
          {children}
        </div>

        {/* Conversion */}
        <div className="lg:col-span-5">
          <div className="flex flex-col gap-6 rounded-lg border border-cream/15 bg-black/60 p-6 lg:sticky lg:top-28">
            <FundingProgress funding={funding} />
            {project.funding?.donateUrl ? (
              <a
                href={project.funding.donateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-maroon px-6 py-4 text-center text-lg font-bold text-white transition-colors hover:bg-red-800"
              >
                {t(`${base}.cta`)}
              </a>
            ) : null}
            <div className="flex flex-wrap items-center gap-3">
              <ShareCta
                title={t(`${base}.hook`)}
                text={t(`${base}.shareText`)}
                url={shareUrl}
              />
              <a
                href="https://www.instagram.com/actv_ie/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-cream/40 px-5 py-2.5 font-semibold text-cream transition-colors hover:border-cream hover:text-white"
              >
                {t("instagram.follow")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
