-- Profiles: player product data, 1:1 with auth.users
-- Email stays in auth.users — never duplicated here
create table public.profiles (
  id                     uuid primary key references auth.users(id) on delete cascade,
  username               text unique,
  team_id                uuid references public.teams(id),
  wallet_balance         integer not null default 0,
  onboarding_completed_at timestamptz,
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now(),

  -- Globally unique, case-insensitive username
  constraint username_lowercase check (username = lower(username))
);

-- Case-insensitive unique index on username
create unique index profiles_username_ci_idx
  on public.profiles (lower(username))
  where username is not null;

-- wallet_balance must never go negative
alter table public.profiles
  add constraint wallet_balance_non_negative check (wallet_balance >= 0);

-- Auto-update updated_at on every row change
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Auto-create profile row when a new auth.users row is inserted
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- RLS: each user reads and updates only their own profile
alter table public.profiles enable row level security;

create policy "profiles_select_own"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);
