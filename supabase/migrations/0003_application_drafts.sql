-- Migration: saved application drafts for logged-in users.
-- Run this in the Supabase SQL editor.
--
-- One draft per user. The browser writes here directly using the user's
-- session (anon/publishable key), so row-level security restricts every user
-- to only their own row.

create table if not exists public.application_drafts (
  user_id uuid primary key references auth.users (id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  step int not null default 0,
  updated_at timestamptz not null default now()
);

alter table public.application_drafts enable row level security;

-- Each policy is scoped to the currently authenticated user.
drop policy if exists "drafts_select_own" on public.application_drafts;
create policy "drafts_select_own" on public.application_drafts
  for select using (auth.uid() = user_id);

drop policy if exists "drafts_insert_own" on public.application_drafts;
create policy "drafts_insert_own" on public.application_drafts
  for insert with check (auth.uid() = user_id);

drop policy if exists "drafts_update_own" on public.application_drafts;
create policy "drafts_update_own" on public.application_drafts
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "drafts_delete_own" on public.application_drafts;
create policy "drafts_delete_own" on public.application_drafts
  for delete using (auth.uid() = user_id);
