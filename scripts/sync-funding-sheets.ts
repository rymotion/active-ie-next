/**
 * Manual funding-sheet sync — pulls the Google Drive spreadsheets registered
 * in funding_sheets into Supabase right now, without waiting for the daily
 * cron. Runs the exact same logic as /api/cron/sync-funding-sheets.
 *
 *   npm run sync:funding
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
 * (read from .env.local automatically, or from the environment).
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { syncFundingSheets } from "../src/lib/sync-funding-sheets";

// Minimal .env.local loader — no dotenv dependency needed.
function loadEnvLocal() {
  try {
    const content = readFileSync(join(process.cwd(), ".env.local"), "utf8");
    for (const line of content.split("\n")) {
      const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (match && process.env[match[1]] === undefined) {
        process.env[match[1]] = match[2].trim();
      }
    }
  } catch {
    // No .env.local — rely on the ambient environment.
  }
}

async function main() {
  loadEnvLocal();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY (check .env.local)."
    );
    process.exit(1);
  }

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  console.log("Syncing funding sheets from Google Drive…");
  const { results, hadErrors } = await syncFundingSheets(supabase);

  for (const [sheet, outcome] of Object.entries(results)) {
    console.log(`  ${sheet}: ${outcome}`);
  }
  if (Object.keys(results).length === 0) {
    console.log("  (no enabled sheets found — has supabase/schema.sql been run?)");
  }

  process.exit(hadErrors ? 1 : 0);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
