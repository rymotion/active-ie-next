"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { formatPrice } from "@/lib/format-price";
import type { FundingNumbers } from "@/services/funding";

/**
 * Specificity converts: real numbers, a visible goal, and freshness.
 * Renders nothing when no numbers are known (never show an empty bar).
 */
export default function FundingProgress({
  funding,
  compact = false,
}: {
  funding: FundingNumbers;
  compact?: boolean;
}) {
  const t = useTranslations();
  const locale = useLocale();
  const reducedMotion = useReducedMotion();

  const { raisedCents, goalCents, donorCount } = funding;
  if (raisedCents == null) return null;

  const raised = formatPrice(raisedCents / 100, "USD", locale);
  const goal = goalCents != null ? formatPrice(goalCents / 100, "USD", locale) : null;
  const percent =
    goalCents != null && goalCents > 0
      ? Math.min(100, Math.round((raisedCents / goalCents) * 100))
      : null;

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <span className={`font-display tracking-wide text-white ${compact ? "text-xl" : "text-3xl"}`}>
          {raised}
        </span>
        {goal ? (
          <span className="text-sm text-cream/70">
            {t("funding.ofGoal", { goal })}
          </span>
        ) : null}
      </div>
      {percent != null ? (
        <div
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={t("funding.progressAria")}
          className="h-3 w-full overflow-hidden rounded-full bg-cream/20"
        >
          <motion.div
            initial={reducedMotion ? { width: `${percent}%` } : { width: 0 }}
            whileInView={{ width: `${percent}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="h-full rounded-full bg-maroon"
          />
        </div>
      ) : null}
      {!compact && donorCount != null ? (
        <p className="mt-2 text-sm text-cream/70">
          {t("funding.donorCount", { count: donorCount })}
        </p>
      ) : null}
    </div>
  );
}
