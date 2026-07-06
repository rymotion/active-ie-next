import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { getInstagramToken } from "@/services/instagram";

/**
 * Weekly cron (vercel.json): refreshes the Instagram long-lived token
 * (60-day expiry; refreshable after 24h) and persists it in Supabase —
 * Vercel env vars can't be rewritten at runtime.
 */
export async function GET(request: Request) {
  const auth = request.headers.get("authorization");
  if (!process.env.CRON_SECRET || auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const current = await getInstagramToken();
  if (!current) {
    return NextResponse.json({ error: "no token configured" }, { status: 503 });
  }

  const response = await fetch(
    "https://graph.instagram.com/refresh_access_token" +
      `?grant_type=ig_refresh_token&access_token=${encodeURIComponent(current)}`
  );
  if (!response.ok) {
    return NextResponse.json(
      { error: `refresh failed: ${response.status}` },
      { status: 502 }
    );
  }

  const json = (await response.json()) as {
    access_token: string;
    expires_in: number;
  };

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { error: "supabase not configured; token refreshed but not persisted" },
      { status: 503 }
    );
  }

  const { error } = await supabase.from("ig_tokens").upsert({
    id: 1,
    token: json.access_token,
    expires_at: new Date(Date.now() + json.expires_in * 1000).toISOString(),
    refreshed_at: new Date().toISOString(),
  });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
