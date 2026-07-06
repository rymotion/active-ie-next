import type { SupabaseClient } from "@supabase/supabase-js";
import { parseFundingSheetCsv } from "./funding-sheet-parser";

/**
 * Core funding-sheet sync, shared by the daily cron route and the manual
 * CLI script (scripts/sync-funding-sheets.ts): for every enabled row in
 * funding_sheets, pull the Google Sheet's public CSV export, parse it into
 * categorized entries, and replace that sheet's cached funding_entries.
 * On any failure the previous cache is kept and last_error records why.
 */
export async function syncFundingSheets(
  supabase: SupabaseClient
): Promise<{ results: Record<string, string>; hadErrors: boolean }> {
  const { data: sheets, error: sheetsError } = await supabase
    .from("funding_sheets")
    .select("id, project_slug, sheet_id, sheet_gid")
    .eq("enabled", true);
  if (sheetsError) {
    throw new Error(`failed to list funding_sheets: ${sheetsError.message}`);
  }

  const results: Record<string, string> = {};
  let hadErrors = false;

  for (const sheet of sheets ?? []) {
    const key = sheet.project_slug ?? sheet.id;
    try {
      const baseUrl =
        `https://docs.google.com/spreadsheets/d/${sheet.sheet_id}/export?format=csv`;
      // Try the configured tab first; a wrong gid returns 400, so fall back
      // to the document default (first tab) rather than failing the sync.
      let response = sheet.sheet_gid
        ? await fetch(`${baseUrl}&gid=${sheet.sheet_gid}`, {
            cache: "no-store",
            redirect: "follow",
          })
        : null;
      if (!response || !response.ok) {
        response = await fetch(baseUrl, {
          cache: "no-store",
          redirect: "follow",
        });
      }
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

      const { error: insertError } = await supabase.from("funding_entries").insert(
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
      hadErrors = true;
      const message = error instanceof Error ? error.message : String(error);
      await supabase
        .from("funding_sheets")
        .update({ last_error: message })
        .eq("id", sheet.id);
      results[key] = `error: ${message}`;
    }
  }

  return { results, hadErrors };
}
