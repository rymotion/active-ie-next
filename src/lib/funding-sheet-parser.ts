/**
 * Parses the "Project Fundraising Summary" CSV exported from Google Sheets
 * (label,value rows) into categorized funding entries. Pure — no I/O — so
 * the daily sync cron stays thin and this stays unit-testable.
 */

export type FundingCategory =
  | "government_grant"
  | "public_org_grant"
  | "individual_contribution"
  | "general_fund_allocation"
  | "other";

export type FundingMetric =
  | "total_contributions"
  | "goal"
  | "spent"
  | "balance"
  | "fees"
  | "gross";

export type ParsedFundingEntry = {
  label: string;
  amountCents: number;
} & (
  | { kind: "contribution"; category: FundingCategory; metric?: undefined }
  | { kind: "metric"; metric: FundingMetric; category?: undefined }
);

/** Label → category/metric mapping (case-insensitive substring match, in order). */
const CONTRIBUTION_RULES: Array<[RegExp, FundingCategory]> = [
  [/government/i, "government_grant"],
  [/grant/i, "public_org_grant"],
  [/matching|general fund/i, "general_fund_allocation"],
  [/gofundme|givebutter|donation|individual/i, "individual_contribution"],
];

const METRIC_RULES: Array<[RegExp, FundingMetric]> = [
  [/total contributions/i, "total_contributions"],
  [/fundraising goal/i, "goal"],
  [/total spent/i, "spent"],
  [/balance/i, "balance"],
  [/fees/i, "fees"],
  [/gross/i, "gross"],
];

/** Derivable rows we deliberately don't store (goal - total, percentages). */
const SKIP_RULES: RegExp[] = [/remaining/i];

/** "$6,050.29" → 605029; returns null for "-", "", percentages, non-numbers. */
export function parseMoneyToCents(raw: string): number | null {
  const value = raw.trim();
  if (!value || value === "-" || value.endsWith("%")) return null;
  const numeric = Number.parseFloat(value.replace(/[$,\s]/g, ""));
  if (!Number.isFinite(numeric)) return null;
  return Math.round(numeric * 100);
}

/** Minimal CSV line splitter handling quoted fields ("$6,050.29"). */
function splitCsvLine(line: string): string[] {
  const fields: string[] = [];
  let current = "";
  let inQuotes = false;
  for (const char of line) {
    if (char === '"') inQuotes = !inQuotes;
    else if (char === "," && !inQuotes) {
      fields.push(current);
      current = "";
    } else current += char;
  }
  fields.push(current);
  return fields;
}

export function parseFundingSheetCsv(csv: string): ParsedFundingEntry[] {
  const entries: ParsedFundingEntry[] = [];

  for (const line of csv.split(/\r?\n/)) {
    const [rawLabel, rawValue = ""] = splitCsvLine(line);
    const label = rawLabel?.trim();
    if (!label) continue;

    const amountCents = parseMoneyToCents(rawValue);
    if (amountCents === null) continue; // headers, "-", percentages
    if (SKIP_RULES.some((pattern) => pattern.test(label))) continue;

    const metricRule = METRIC_RULES.find(([pattern]) => pattern.test(label));
    if (metricRule) {
      entries.push({ label, kind: "metric", metric: metricRule[1], amountCents });
      continue;
    }

    const contributionRule = CONTRIBUTION_RULES.find(([pattern]) =>
      pattern.test(label)
    );
    entries.push({
      label,
      kind: "contribution",
      category: contributionRule?.[1] ?? "other",
      amountCents,
    });
  }

  return entries;
}
