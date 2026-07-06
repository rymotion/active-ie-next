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
