-- Validation status enum for activities
create type public.activity_validation_status as enum (
  'pending',
  'valid',
  'invalid'
);

-- Activities: validated running sessions
-- Private by default — only the owner can read their own activities
create table public.activities (
  id                       uuid primary key default gen_random_uuid(),
  user_id                  uuid not null references public.profiles(id) on delete cascade,
  started_at               timestamptz not null,
  ended_at                 timestamptz not null,
  distance_km              numeric(8, 3) not null,
  duration_seconds         integer not null,
  avg_speed_kmh            numeric(5, 2) not null,
  max_speed_kmh            numeric(5, 2),
  gps_point_count          integer,
  -- Simplified route geometry for map display and zone traceability
  route                    extensions.geometry(LineString, 4326),
  -- Anti-cheat summary (no raw telemetry in MVP)
  validation_status        public.activity_validation_status not null default 'pending',
  validation_reason        text,
  detected_anomalies       text,
  -- Economic and competitive output
  wallet_credits_earned    integer not null default 0,
  competitive_points_earned integer not null default 0,
  created_at               timestamptz not null default now(),

  constraint duration_positive check (duration_seconds > 0),
  constraint distance_non_negative check (distance_km >= 0),
  constraint credits_non_negative check (wallet_credits_earned >= 0),
  constraint points_non_negative check (competitive_points_earned >= 0)
);

create index activities_user_idx on public.activities(user_id);
create index activities_started_at_idx on public.activities(started_at);
create index activities_route_gist_idx on public.activities using gist(route) where route is not null;

-- RLS: each user creates and reads only their own activities
alter table public.activities enable row level security;

create policy "activities_select_own"
  on public.activities for select
  to authenticated
  using (auth.uid() = user_id);

create policy "activities_insert_own"
  on public.activities for insert
  to authenticated
  with check (auth.uid() = user_id);
