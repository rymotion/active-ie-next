import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { projects, type ProjectContent } from "@/content/projects";

export type FundingNumbers = {
  raisedCents: number | null;
  goalCents: number | null;
  donorCount: number | null;
  fetchedAt: string | null;
};

/**
 * Latest funding numbers per project slug. Fallback chain:
 * Supabase snapshot (12h cron) → content-file numbers → nulls (UI hides bar).
 */
export async function getFundingNumbers(): Promise<
  Record<string, FundingNumbers>
> {
  const bySlug: Record<string, FundingNumbers> = {};
  for (const project of projects) {
    bySlug[project.slug] = fallbackFor(project);
  }

  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { data } = await supabase
      .from("funding_snapshots")
      .select("project_slug, raised_cents, goal_cents, donor_count, fetched_at");
    for (const row of data ?? []) {
      if (row.raised_cents == null) continue; // never clobber with nulls
      bySlug[row.project_slug] = {
        raisedCents: row.raised_cents,
        goalCents: row.goal_cents ?? bySlug[row.project_slug]?.goalCents ?? null,
        donorCount: row.donor_count,
        fetchedAt: row.fetched_at,
      };
    }
  }

  return bySlug;
}

function fallbackFor(project: ProjectContent): FundingNumbers {
  return {
    raisedCents: project.funding?.fallbackRaisedCents ?? null,
    goalCents: project.funding?.fallbackGoalCents ?? null,
    donorCount: null,
    fetchedAt: null,
  };
}
