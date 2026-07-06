-- Run once in the Supabase SQL editor for the Active IE project.

-- Single-row store for the current Instagram long-lived token.
-- The IG_ACCESS_TOKEN env var only bootstraps this; the weekly
-- /api/cron/refresh-ig-token keeps it fresh (60-day expiry).
create table if not exists ig_tokens (
  id int primary key default 1 check (id = 1),
  token text not null,
  expires_at timestamptz,
  refreshed_at timestamptz not null default now()
);

-- Latest scraped funding numbers per project (see /api/cron/update-funding-data).
create table if not exists funding_snapshots (
  project_slug text primary key,
  raised_cents bigint,
  goal_cents bigint,
  donor_count int,
  fetched_at timestamptz not null default now()
);

-- Service-role key bypasses RLS; keep RLS on so anon keys can't read tokens.
alter table ig_tokens enable row level security;
alter table funding_snapshots enable row level security;

-- Anonymous read access to funding numbers only.
create policy "public read funding" on funding_snapshots
  for select using (true);

-- ============================================================
-- Funding dashboard
-- ============================================================

-- Registry: which Google Drive spreadsheet feeds which project.
-- project_slug matches src/content/projects.ts; NULL = organization-wide.
create table if not exists funding_sheets (
  id uuid primary key default gen_random_uuid(),
  project_slug text unique,
  title text not null default '',
  sheet_id text not null,          -- Google Sheet document id
  sheet_gid text not null default '0', -- tab id within the document
  enabled boolean not null default true,
  last_synced_at timestamptz,
  last_error text
);

-- Cached line items parsed from each sheet by /api/cron/sync-funding-sheets.
-- kind 'contribution' rows carry one of the four funding categories;
-- kind 'metric' rows are summary figures (goal, spent, balance, fees).
create table if not exists funding_entries (
  id bigint generated always as identity primary key,
  sheet_ref uuid not null references funding_sheets(id) on delete cascade,
  label text not null,
  kind text not null check (kind in ('contribution', 'metric')),
  category text check (category in (
    'government_grant',
    'public_org_grant',
    'individual_contribution',
    'general_fund_allocation',
    'other'
  )),
  metric text check (metric in (
    'total_contributions', 'goal', 'spent', 'balance', 'fees', 'gross'
  )),
  amount_cents bigint not null,
  synced_at timestamptz not null default now(),
  unique (sheet_ref, label)
);

alter table funding_sheets enable row level security;
alter table funding_entries enable row level security;

-- Dashboards are public; writes go through the service-role key only.
create policy "public read funding sheets" on funding_sheets
  for select using (true);
create policy "public read funding entries" on funding_entries
  for select using (true);

-- Seed: the bike-ramps project fundraising summary sheet.
insert into funding_sheets (project_slug, title, sheet_id, sheet_gid)
values (
  'bike-ramps',
  'Bike Ramps — Project Fundraising Summary',
  '1kWE0HFz2KXdaCRHM2bzt7Rv-nn_bunUxXqSMGeeJrnk',
  '0'
)
on conflict (project_slug) do nothing;
