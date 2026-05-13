-- Zones: H3 hexagonal map cells
-- Writes are backend-only (Edge Function / RPC) — no direct client writes
create table public.zones (
  h3_index       text primary key,
  owner_team_id  uuid references public.teams(id),
  boundary       extensions.geometry(Polygon, 4326) not null,
  centroid       extensions.geometry(Point, 4326) not null,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- Spatial index for map viewport queries
create index zones_boundary_gist_idx on public.zones using gist(boundary);
create index zones_centroid_gist_idx on public.zones using gist(centroid);

-- Expose geometry type in the public search path
grant usage on schema extensions to authenticated, anon;

create trigger zones_updated_at
  before update on public.zones
  for each row execute function public.set_updated_at();

-- RLS: open read; no client writes
alter table public.zones enable row level security;

create policy "zones_select"
  on public.zones for select
  to authenticated
  using (true);
