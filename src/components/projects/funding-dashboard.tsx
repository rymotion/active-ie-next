"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { formatPrice } from "@/lib/format-price";
import type { FundingCategory } from "@/lib/funding-sheet-parser";
import type { FundingDashboardData } from "@/services/funding-dashboard";

const CATEGORY_ORDER: FundingCategory[] = [
  "government_grant",
  "public_org_grant",
  "individual_contribution",
  "general_fund_allocation",
  "other",
];

const CATEGORY_COLOR: Record<FundingCategory, string> = {
  government_grant: "bg-blue-700",
  public_org_grant: "bg-teal-700",
  individual_contribution: "bg-maroon",
  general_fund_allocation: "bg-amber-700",
  other: "bg-gray-600",
};

/**
 * Funding dashboard fed by the daily Google-Sheet sync: total vs goal,
 * breakdown across the four funding categories, and line items.
 */
export default function FundingDashboard({
  data,
}: {
  data: FundingDashboardData;
}) {
  const t = useTranslations();
  const locale = useLocale();
  const reducedMotion = useReducedMotion();

  const money = (cents: number) => formatPrice(cents / 100, "USD", locale);

  const total =
    data.metrics.total_contributions ??
    Object.values(data.categories).reduce((sum, cents) => sum + cents, 0);
  const goal = data.metrics.goal ?? null;
  const percent =
    goal && goal > 0 ? Math.min(100, Math.round((total / goal) * 100)) : null;
  const maxCategory = Math.max(1, ...Object.values(data.categories));

  return (
    <section
      aria-label={t("fundingDashboard.title")}
      className="rounded-lg border border-cream/15 bg-black/60 p-6"
    >
      <h3 className="mb-1 font-display text-title uppercase tracking-wide">
        {t("fundingDashboard.title")}
      </h3>
      {data.lastSyncedAt ? (
        <p className="mb-6 text-xs text-gray-400">
          {t("fundingDashboard.lastUpdated", {
            date: new Intl.DateTimeFormat(locale, {
              dateStyle: "medium",
            }).format(new Date(data.lastSyncedAt)),
          })}
        </p>
      ) : null}

      {/* Total vs goal */}
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <span className="font-display text-3xl tracking-wide text-white">
          {money(total)}
        </span>
        {goal ? (
          <span className="text-sm text-cream/70">
            {t("funding.ofGoal", { goal: money(goal) })}
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
          className="mb-8 h-3 w-full overflow-hidden rounded-full bg-cream/20"
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

      {/* Category breakdown */}
      <ul className="flex flex-col gap-3">
        {CATEGORY_ORDER.filter(
          (category) => (data.categories[category] ?? 0) > 0
        ).map((category) => {
          const cents = data.categories[category]!;
          return (
            <li key={category}>
              <div className="mb-1 flex items-baseline justify-between gap-2 text-sm">
                <span className="text-cream/90">
                  {t(`fundingDashboard.categories.${category}`)}
                </span>
                <span className="font-semibold text-white">{money(cents)}</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-cream/10">
                <motion.div
                  initial={
                    reducedMotion
                      ? { width: `${(cents / maxCategory) * 100}%` }
                      : { width: 0 }
                  }
                  whileInView={{ width: `${(cents / maxCategory) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className={`h-full rounded-full ${CATEGORY_COLOR[category]}`}
                />
              </div>
            </li>
          );
        })}
      </ul>

      {/* Line items */}
      {data.lineItems.length > 0 ? (
        <details className="mt-6">
          <summary className="cursor-pointer text-sm font-semibold text-cream/80 hover:text-white">
            {t("fundingDashboard.lineItems")}
          </summary>
          <table className="mt-3 w-full text-sm">
            <tbody>
              {data.lineItems.map((item) => (
                <tr key={item.label} className="border-t border-cream/10">
                  <td className="py-2 pr-2 text-cream/80">{item.label}</td>
                  <td className="py-2 text-right font-medium text-white">
                    {money(item.amountCents)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>
      ) : null}
    </section>
  );
}
