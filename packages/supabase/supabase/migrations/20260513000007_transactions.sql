-- Transaction type enum
create type public.transaction_type as enum (
  'activity_reward',
  'manual_adjustment',
  'team_change_fee',      -- reserved for future
  'marketplace_spend'     -- reserved for future
);

-- Transactions: wallet ledger
-- amount is always positive; direction is encoded by type
-- Creation is restricted to backend logic only — no direct client inserts
create table public.transactions (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references public.profiles(id) on delete cascade,
  amount          integer not null,
  type            public.transaction_type not null,
  ref_activity_id uuid references public.activities(id),
  description     text,
  created_at      timestamptz not null default now(),

  constraint amount_positive check (amount > 0)
);

create index transactions_user_idx on public.transactions(user_id);
create index transactions_activity_idx on public.transactions(ref_activity_id);

-- RLS: each user reads only their own transactions; no client inserts
alter table public.transactions enable row level security;

create policy "transactions_select_own"
  on public.transactions for select
  to authenticated
  using (auth.uid() = user_id);
