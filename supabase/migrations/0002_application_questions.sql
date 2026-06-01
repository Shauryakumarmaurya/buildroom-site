-- Migration: expand the applications table for the 9-question cohort form.
-- Run this in the Supabase SQL editor if your `applications` table was created
-- with the original 5 columns (name, college, email, pitch, role).
--
-- These columns are added as nullable so the existing row(s) stay valid; the
-- app validates required answers before inserting.

alter table public.applications
  add column if not exists unfair_advantage text,
  add column if not exists hardest_thing text,
  add column if not exists commitment text,
  add column if not exists links text;
