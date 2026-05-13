-- Seed: 3 launch teams
-- logo_url is null until brand assets are ready
insert into public.teams (slug, name, motto, description, primary_color, accent_color, logo_url, is_active)
values
  (
    'speed',
    'Speed',
    'First to arrive, first to conquer',
    'Built for runners who lead the charge. Speed claims zones before anyone else can react.',
    '#E63946',
    '#FF9F1C',
    null,
    true
  ),
  (
    'endurance',
    'Endurance',
    'The city belongs to those who endure the longest',
    'Built for runners who outlast everyone. Endurance controls zones through sheer persistence.',
    '#457B9D',
    '#A8DADC',
    null,
    true
  ),
  (
    'tactics',
    'Tactics',
    'Every step, calculated down to the millimeter',
    'Built for runners who think before they move. Tactics wins through strategy, not speed.',
    '#2D6A4F',
    '#74C69D',
    null,
    true
  );
