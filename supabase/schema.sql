-- Buildroom — applications table
-- Run this in the Supabase SQL editor (Dashboard → SQL Editor → New query).

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  college text not null,
  email text not null,
  pitch text not null,
  role text not null,
  track text,           -- 'founder' | 'builder'
  linkedin text,
  data jsonb            -- full structured answers for the chosen track
);

-- If you already created the table from an earlier version, run these to add
-- the new columns (safe to run repeatedly):
alter table public.applications add column if not exists track text;
alter table public.applications add column if not exists linkedin text;
alter table public.applications add column if not exists data jsonb;

-- Row Level Security is enabled, with NO public policies. The app writes via
-- the service role key (server-side only), which bypasses RLS. This means the
-- table cannot be read or written using the public anon key from the browser.
alter table public.applications enable row level security;

-- Helpful index for sorting newest-first in the dashboard.
create index if not exists applications_created_at_idx
  on public.applications (created_at desc);
