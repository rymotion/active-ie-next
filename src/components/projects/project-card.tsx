"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { ProjectContent } from "@/content/projects";
import type { FundingNumbers } from "@/services/funding";
import FundingProgress from "./funding-progress";

/**
 * Discovery-stage card for cold audiences (landing, previews): hook,
 * one-line summary, compact progress, ONE action — read the full story.
 */
export default function ProjectCard({
  project,
  funding,
}: {
  project: ProjectContent;
  funding: FundingNumbers;
}) {
  const t = useTranslations();
  const base = `projects.items.${project.i18nKey}`;

  return (
    <div className="flex h-full flex-col gap-4 rounded-lg border border-cream/15 bg-black/60 p-6">
      <h3 className="font-display text-title uppercase tracking-wide text-white">
        {t(`${base}.hook`)}
      </h3>
      <p className="text-cream/80">{t(`${base}.summary`)}</p>
      <div className="mt-auto flex flex-col gap-4">
        <FundingProgress funding={funding} compact />
        <Link
          href={`/projects#${project.anchor}`}
          className="w-fit rounded-md bg-maroon px-6 py-3 font-semibold text-white transition-colors hover:bg-red-800"
        >
          {t(`${base}.cardCta`)}
        </Link>
      </div>
    </div>
  );
}
