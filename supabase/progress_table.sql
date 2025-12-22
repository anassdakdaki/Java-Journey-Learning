-- One-and-done script to create the progress table with RLS and indexes.
-- Copy/paste this into the Supabase SQL editor and run once.

-- UUID generation (generally enabled in Supabase projects, but make sure).
create extension if not exists "pgcrypto";

-- Start clean (drops existing table + policies).
drop table if exists public.progress cascade;

create table public.progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  lesson_id text not null,
  step_id text not null,
  completed_at timestamptz not null default now(),
  is_completed boolean not null default true
);

-- Keep each user/lesson/step unique so upserts work.
create unique index progress_user_lesson_step_uidx on public.progress (user_id, lesson_id, step_id);

-- Tie progress to an auth user (remove on user delete).
alter table public.progress
  add constraint progress_user_fk
  foreign key (user_id) references auth.users(id) on delete cascade;

-- Enable Row Level Security (required for policies below).
alter table public.progress enable row level security;

-- Only allow a user to read/write their own rows.
create policy "progress_select_own"
  on public.progress for select
  using (auth.uid() = user_id);

create policy "progress_insert_own"
  on public.progress for insert
  with check (auth.uid() = user_id);

create policy "progress_update_own"
  on public.progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
