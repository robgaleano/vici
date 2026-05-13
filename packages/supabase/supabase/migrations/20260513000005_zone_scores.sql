-- Zone scores: normalized per-zone per-team competitive points
-- Supports N teams without reshaping zones
create table public.zone_scores (
  zone_h3_index  text not null references public.zones(h3_index) on delete cascade,
  team_id        uuid not null references public.teams(id),
  score          integer not null default 0,
  updated_at     timestamptz not null default now(),

  primary key (zone_h3_index, team_id),
  constraint score_non_negative check (score >= 0)
);

create index zone_scores_zone_idx on public.zone_scores(zone_h3_index);
create index zone_scores_team_idx on public.zone_scores(team_id);

create trigger zone_scores_updated_at
  before update on public.zone_scores
  for each row execute function public.set_updated_at();

-- RLS: open read; no client writes
alter table public.zone_scores enable row level security;

create policy "zone_scores_select"
  on public.zone_scores for select
  to authenticated
  using (true);
