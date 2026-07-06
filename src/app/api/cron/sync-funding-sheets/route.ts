import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { parseFundingSheetCsv } from "@/lib/funding-sheet-parser";

/**
 * Daily cron (vercel.json): for every enabled row in funding_sheets, pulls
 * the Google Sheet's public CSV export, parses it into categorized entries,
 * and replaces that sheet's cached rows in funding_entries. On any failure
 * the previous cache is kept and last_error records what happened.
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

  const { data: sheets, error: sheetsError } = await supabase
    .from("funding_sheets")
    .select("id, project_slug, sheet_id, sheet_gid")
    .eq("enabled", true);
  if (sheetsError) {
    return NextResponse.json({ error: sheetsError.message }, { status: 500 });
  }

  const results: Record<string, string> = {};

  for (const sheet of sheets ?? []) {
    const key = sheet.project_slug ?? sheet.id;
    try {
      const csvUrl =
        `https://docs.google.com/spreadsheets/d/${sheet.sheet_id}/export` +
        `?format=csv&gid=${sheet.sheet_gid ?? "0"}`;
      const response = await fetch(csvUrl, {
        cache: "no-store",
        redirect: "follow",
      });
      if (!response.ok) throw new Error(`sheet fetch ${response.status}`);

      const entries = parseFundingSheetCsv(await response.text());
      if (entries.length === 0) {
        // Empty parse means a layout change or lost permissions — keep cache.
        throw new Error("parsed 0 entries; cache kept");
      }

      // Replace this sheet's rows: delete then insert (unique on sheet+label).
      const { error: deleteError } = await supabase
        .from("funding_entries")
        .delete()
        .eq("sheet_ref", sheet.id);
      if (deleteError) throw new Error(deleteError.message);

      const { error: insertError } = await supabase
        .from("funding_entries")
        .insert(
          entries.map((entry) => ({
            sheet_ref: sheet.id,
            label: entry.label,
            kind: entry.kind,
            category: entry.kind === "contribution" ? entry.category : null,
            metric: entry.kind === "metric" ? entry.metric : null,
            amount_cents: entry.amountCents,
            synced_at: new Date().toISOString(),
          }))
        );
      if (insertError) throw new Error(insertError.message);

      await supabase
        .from("funding_sheets")
        .update({ last_synced_at: new Date().toISOString(), last_error: null })
        .eq("id", sheet.id);
      results[key] = `ok (${entries.length} entries)`;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      await supabase
        .from("funding_sheets")
        .update({ last_error: message })
        .eq("id", sheet.id);
      results[key] = `error: ${message}`;
    }
  }

  return NextResponse.json({ ok: true, results });
}
