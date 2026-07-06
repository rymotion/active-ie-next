import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { GOFUNDME_CAMPAIGN_URL } from "@/content/projects";

/**
 * 12-hourly cron (vercel.json): scrapes the GoFundMe campaign page for the
 * embedded Money JSON and stores a snapshot. GoFundMe has no public API, so
 * this is intentionally defensive — on any parse failure the previous
 * snapshot stays and the UI falls back to content-file numbers.
 */
export async function GET(request: Request) {
  const auth = request.headers.get("authorization");
  if (!process.env.CRON_SECRET || auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: "supabase not configured" }, { status: 503 });
  }

  const response = await fetch(GOFUNDME_CAMPAIGN_URL, {
    headers: { "user-agent": "Mozilla/5.0 (compatible; ActiveIE-site/1.0)" },
    cache: "no-store",
  });
  if (!response.ok) {
    return NextResponse.json(
      { error: `gofundme fetch failed: ${response.status}` },
      { status: 502 }
    );
  }

  const html = await response.text();
  const current = html.match(
    /"currentAmount":\{"__typename":"Money","amount":([0-9.]+)/
  );
  const goal = html.match(
    /"goalAmount":\{"__typename":"Money","amount":([0-9.]+)/
  );
  const donors = html.match(/"donationCount":([0-9]+)/);

  if (!current) {
    // Page layout changed — keep the last snapshot rather than writing nulls.
    return NextResponse.json({ error: "parse failed, snapshot kept" }, { status: 200 });
  }

  const { error } = await supabase.from("funding_snapshots").upsert({
    project_slug: "bike-ramps",
    raised_cents: Math.round(Number.parseFloat(current[1]) * 100),
    goal_cents: goal ? Math.round(Number.parseFloat(goal[1]) * 100) : null,
    donor_count: donors ? Number.parseInt(donors[1], 10) : null,
    fetched_at: new Date().toISOString(),
  });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
