-- Buildroom — applications table
-- Run this in the Supabase SQL editor (Dashboard → SQL Editor → New query)
-- for a FRESH project. If your table already exists, run the migration in
-- supabase/migrations/0002_application_questions.sql instead.

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,                 -- full name
  college text not null,              -- college & graduation year
  email text not null,
<<<<<<< HEAD
  role text not null,                 -- looking / joining / either
  pitch text not null,                -- what are you building / want to build
  unfair_advantage text,              -- prior wins, technical depth, insight, network
  hardest_thing text,                 -- hardest thing done outside academics/startups
  commitment text,                    -- hours/week + what they're giving up
  links text                          -- optional proof-of-work links
=======
  pitch text not null,
  role text not null,
  track text,           -- 'founder' | 'builder'
  linkedin text,
  data jsonb            -- full structured answers for the chosen track
>>>>>>> 3372158 (Restructure landing page, add /apply form page and build imagery)
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

-- ---------------------------------------------------------------------------
-- Saved application drafts (for logged-in users who want to finish later).
-- One row per user; the browser writes here with the user's own session, so
-- row-level security restricts each user to only their own draft.
-- ---------------------------------------------------------------------------
create table if not exists public.application_drafts (
  user_id uuid primary key references auth.users (id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  step int not null default 0,
  updated_at timestamptz not null default now()
);

alter table public.application_drafts enable row level security;

create policy "drafts_select_own" on public.application_drafts
  for select using (auth.uid() = user_id);
create policy "drafts_insert_own" on public.application_drafts
  for insert with check (auth.uid() = user_id);
create policy "drafts_update_own" on public.application_drafts
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "drafts_delete_own" on public.application_drafts
  for delete using (auth.uid() = user_id);
