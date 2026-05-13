-- Teams: catalog of playable factions
-- Not hardcoded to 3 teams — supports N teams
create table public.teams (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  name         text not null,
  motto        text not null,
  description  text,
  primary_color  text not null,
  accent_color   text not null,
  logo_url     text,
  is_active    boolean not null default true,
  created_at   timestamptz not null default now()
);

-- RLS: any authenticated user can read teams; no client-side writes
alter table public.teams enable row level security;

create policy "teams_select"
  on public.teams for select
  to authenticated
  using (true);
