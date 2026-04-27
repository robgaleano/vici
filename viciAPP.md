# Vici — App Context

## Concept

Gamified running app. Users run real-world routes to conquer hexagonal map zones for their team, earning virtual currency. Core loop: **run → conquer zones → earn rewards**.
Tagline: _"Strava meets Pokémon GO"_. Comparable to Sweatcoin / WeWard in monetisation model.

## Core Mechanics

- World map divided into **H3 hexagonal zones** (Uber H3 library)
- Users join one of **3 teams** (Red / Blue / Yellow)
- Running through zones accumulates points for the user's team
- Zone ownership changes when a team's points exceed the opponent's
- Virtual currency earned per activity → redeemable in an in-app marketplace (discounts, coupons from brand partners)

## Anti-Cheat

- Reject activities with avg speed > 25 km/h
- Cross-validate GPS with accelerometer (step detection) to confirm real running

## Key Design Decisions

- **No blockchain in v1** — currency is a standard DB balance (Supabase). Tokenisation is a planned Phase 2 feature once user base is validated.
- **Maps: Mapbox** (not Google Maps) — better pricing at scale, supports custom game-style visual themes
- **No standalone smartwatch app in MVP** — reads from Apple Health / Google Fit via react-native-health

## Tech Stack

- **Mobile**: React Native + Expo (single codebase, iOS + Android)
- **Maps**: Mapbox GL (custom visual theme, cost-effective)
- **Hex grid**: Uber H3 (standard hexagonal indexing)
- **Backend**: Supabase (PostgreSQL + PostGIS) — auth, DB, edge functions, storage
- **State**: Zustand + TanStack Query
- **Notifications**: Expo Notifications (push alerts for zone attacks, challenges)
- **Analytics**: PostHog (open source, self-hostable)

## Data Model (core entities)

- **users** — id, team, wallet_balance, created_at
- **activities** — id, user_id, start/end timestamps, distance_km, avg_speed, route (geometry), points_earned
- **zones** — h3_index (PK), owner_team, points_red, points_blue, points_yellow, last_updated
- **challenges** — id, type, target_value, reward_amount
- **transactions** — id, user_id, amount, type (credit/debit), ref_activity_id

## Monetisation

- Brand partnerships: users redeem currency for real discounts
- Future: token launch (ERC-20 on Polygon or Base) with point migration from DB

## MVP Scope (≈16 weeks, 2 devs)

1. **Foundations** (wk 1–3): map, background GPS, H3 indexing, Supabase setup
2. **Game logic** (wk 4–7): auth, team selection, run tracking, zone conquest, basic anti-cheat
3. **Economy** (wk 8–10): wallet, marketplace UI, challenges, activity history
4. **Social & polish** (wk 11–13): leaderboards, push notifications, animations (Lottie/Reanimated)
5. **Beta** (wk 14–16): HealthKit integration, TestFlight / Play Console closed beta, analytics

## Deferred / Post-MVP

- Standalone smartwatch app
- Blockchain token (Web3 phase)
- NPC/bot zones for low-density areas
- Geo-located power-ups (loot boxes on the map)
- Privacy zones (mask start/end point near home)
