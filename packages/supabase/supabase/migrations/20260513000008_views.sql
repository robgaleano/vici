-- Convenience view: zones with all team scores and current owner
-- Useful for map rendering — single query instead of two joins on the client
create or replace view public.zones_with_scores as
select
  z.h3_index,
  z.owner_team_id,
  z.boundary,
  z.centroid,
  z.updated_at,
  coalesce(
    json_object_agg(zs.team_id::text, zs.score) filter (where zs.team_id is not null),
    '{}'::json
  ) as team_scores
from public.zones z
left join public.zone_scores zs on zs.zone_h3_index = z.h3_index
group by z.h3_index, z.owner_team_id, z.boundary, z.centroid, z.updated_at;
