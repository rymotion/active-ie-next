import "server-only";
import { getSupabaseRead } from "@/lib/supabase/server";
import type {
  FundingCategory,
  FundingMetric,
} from "@/lib/funding-sheet-parser";

export type FundingDashboardData = {
  /** null slug = organization-wide aggregate across all tracked sheets */
  projectSlug: string | null;
  title: string;
  categories: Partial<Record<FundingCategory, number>>; // cents
  metrics: Partial<Record<FundingMetric, number>>; // cents
  lineItems: Array<{ label: string; category: FundingCategory; amountCents: number }>;
  lastSyncedAt: string | null;
};

type EntryRow = {
  label: string;
  kind: "contribution" | "metric";
  category: FundingCategory | null;
  metric: FundingMetric | null;
  amount_cents: number;
  synced_at: string;
  funding_sheets: {
    project_slug: string | null;
    title: string;
    enabled: boolean;
  };
};

/**
 * Cached funding-dashboard data for one project, or the organization-wide
 * aggregate when no slug is given. Returns null when nothing is cached yet
 * (pages simply omit the dashboard).
 */
export async function getFundingDashboard(
  projectSlug?: string
): Promise<FundingDashboardData | null> {
  const supabase = getSupabaseRead();
  if (!supabase) return null;

  let query = supabase
    .from("funding_entries")
    .select(
      "label, kind, category, metric, amount_cents, synced_at, funding_sheets!inner(project_slug, title, enabled)"
    )
    .eq("funding_sheets.enabled", true);
  if (projectSlug) {
    query = query.eq("funding_sheets.project_slug", projectSlug);
  }

  const { data, error } = await query;
  if (error || !data || data.length === 0) return null;
  const rows = data as unknown as EntryRow[];

  const dashboard: FundingDashboardData = {
    projectSlug: projectSlug ?? null,
    title: projectSlug ? rows[0].funding_sheets.title : "",
    categories: {},
    metrics: {},
    lineItems: [],
    lastSyncedAt: null,
  };

  for (const row of rows) {
    if (row.kind === "contribution" && row.category) {
      dashboard.categories[row.category] =
        (dashboard.categories[row.category] ?? 0) + row.amount_cents;
      dashboard.lineItems.push({
        label: row.label,
        category: row.category,
        amountCents: row.amount_cents,
      });
    } else if (row.kind === "metric" && row.metric) {
      dashboard.metrics[row.metric] =
        (dashboard.metrics[row.metric] ?? 0) + row.amount_cents;
    }
    if (!dashboard.lastSyncedAt || row.synced_at > dashboard.lastSyncedAt) {
      dashboard.lastSyncedAt = row.synced_at;
    }
  }

  dashboard.lineItems.sort((a, b) => b.amountCents - a.amountCents);
  return dashboard;
}
