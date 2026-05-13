-- Enable PostGIS for geospatial geometry (zone boundaries, centroids, routes)
create extension if not exists postgis with schema extensions;

-- Make PostGIS types accessible without schema prefix
alter database postgres set search_path to public, extensions;

-- Note: h3 and h3_postgis must be enabled via the Supabase Dashboard (Pro plan)
-- Database → Extensions → search "h3" → enable both h3 and h3_postgis
