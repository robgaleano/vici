# [4] 🎮 EPIC: Gameplay & Running

[Back to index](../roadmap.md)

## 🎮 Gameplay

- **Priority:** P0 - Critical
- **Label:** Mobile
- **Status:** Not started

#### Objective

Implement the full running gameplay loop with direct impact on the game map.

#### Definition of Done

- [ ] User can start/pause/finish an activity
- [ ] Every kilometer run affects the H3 zones crossed by the route
- [ ] The map changes color when zones are conquered
- [ ] Power-ups appear on the map and can be collected while running

#### [4.1] Task: Real-time activity screen (runner HUD)

- **Priority:** P0 - Critical
- **Label:** Mobile
- **Status:** Not started

#### Steps

- [ ] Create an `ActivityScreen` with an HUD overlaid on top of the map
- [ ] Floating button: Start / Pause / Finish activity
- [ ] Show in real time: distance (`km`), elapsed time, pace (`min/km`), conquered zones
- [ ] "Zone conquered" animation when a hexagon changes color
- [ ] Optimize renders: HUD data changes every second, but it must not re-render the map

#### Senior Learning 🎓

Week 4 - Performance: Apply `React.memo`, `useMemo`, and `useCallback`. The distinction between the map (expensive) and the HUD (cheap) is a real case of component splitting. Measure it with the React DevTools Profiler.

---

#### 📚 Extras — From Zero to Hero

- Web Performance (Week 4): Measure HUD rendering with the React DevTools Profiler before and after applying `React.memo`. Document the improvement. This is exactly the kind of story you will be asked about in interviews: how did you detect and solve a performance problem?
- React evolution (Weeks 5/6): `useMemo` and `useCallback` are React tools. Understand when **not** to use them, because memoization has a cost. The rule is: only use them when the profiler proves there is a real issue.
- React Native - New Architecture (Week 8): "Zone conquered" animations should run on the UI thread with Reanimated. If they run on the JS thread, the HUD will freeze while the user is running.
- TypeScript (Week 1): Activity state is a finite-state machine: `'IDLE' | 'TRACKING' | 'PAUSED' | 'FINISHED'`. Use a discriminated union so TypeScript forces you to handle every case.

#### [4.2] Task: Zone scoring algorithm

- **Priority:** P0 - Critical
- **Label:** Backend
- **Status:** Not started

#### Steps

- [ ] Create the `process-activity` Edge Function
- [ ] Input: `{ user_id, route: LatLng[], distance_m, duration_s }`
- [ ] Convert every route point to an H3 index (resolution 9) and deduplicate them
- [ ] For each unique zone crossed: `UPDATE zones SET team_points[team_id] = team_points[team_id] + points_earned`
- [ ] If `team_points[my_team] > team_points[enemy_team]` => update `owner_team_id`
- [ ] Calculate earned points: `base_points * (1 + power_up_multiplier)`
- [ ] Return a summary: `zones_conquered`, `points_earned`, `coins_earned`

#### Senior Learning 🎓

Week 14 - Algorithms: Deduplicating H3 indexes is a classic HashSet problem. Complexity is `O(n)` instead of `O(n^2)` with an array-based approach. That is exactly the kind of optimization discussed in LeetCode Medium interviews.

---

#### 📚 Extras — From Zero to Hero

- Algorithms and Data Structures (Week 14): `new Set(h3Indices)` is `O(n)` for deduplication. Explain in a code comment why you are not using `Array.filter` with `indexOf` (`O(n^2)`). That kind of reasoning is what separates mid-level from senior candidates in interviews.
- Node.js Architecture (Week 9): This Edge Function is the core domain of VICI. Apply SOLID principles: the main function orchestrates, while sub-functions have a single responsibility (`calculatePoints`, `updateZone`, `creditWallet`).
- Databases (Week 10): Updating `zones` inside a loop can generate `N` queries. Optimize it with `UPDATE ... FROM unnest($1) AS h3_list` to do it in a single query. That is senior-level database thinking.
- Testing (Week 7): This is the most critical function in the project. It needs exhaustive tests: route with 1 zone, route with 100 zones, zone already owned by the same team, enemy zone with more points. Use `describe` + `it` to organize them.

#### [4.3] Task: Geolocated power-up system

- **Priority:** P1 - High
- **Label:** Backend
- **Status:** Not started

#### Steps

- [ ] Create a `power_ups` table (`id`, `h3_index`, `type`, `multiplier`, `expires_at`, `claimed_by`, `claimed_at`)
- [ ] Create a Supabase Cron Job that generates 3-5 random power-ups every 6 hours
- [ ] Show power-ups on the map as animated icons (Lottie)
- [ ] In `process-activity`, detect whether any traversed H3 has an active power-up
- [ ] Apply the multiplier and mark the power-up as claimed
- [ ] Send a push notification when the user gets close to an unclaimed power-up

#### Senior Learning 🎓

Week 13 - System Design: Cron Jobs are scheduled serverless functions. Research the "at-least-once delivery" problem: what happens if the cron runs twice? You need idempotency.

---

#### 📚 Extras — From Zero to Hero

- System Design (Week 13): Cron idempotency is a critical concept in distributed systems. Implement `ON CONFLICT DO NOTHING` on the `INSERT` into `power_ups` to guarantee that running the cron twice does not create duplicates.
- Node.js Architecture (Week 9): Background jobs (cron) are processes with no user waiting for them. They need detailed logging, retry-aware error handling, and alerts if they fail. Build all of that in from the start.
- Algorithms (Week 14): Detecting whether the runner's H3 matches an active power-up is a `Set` lookup. If you have 50 active power-ups, `powerUpSet.has(h3Index)` is `O(1)`. Do not use `Array.find` (`O(n)`).
- React Native (Week 8): Lottie power-up icons are JSON animations that run natively. Understand the performance difference between animating with CSS/JS on the web versus Lottie on native.

#### [4.4] Task: NPC / Bot system for inactive zones

- **Priority:** P2 - Medium
- **Label:** Backend
- **Status:** Not started

#### Steps

- [ ] Daily cron job: find zones where `last_activity > 72h`
- [ ] Reduce zone points by 20% (degradation from inactivity)
- [ ] If points drop below a minimum threshold, the zone becomes neutral again
- [ ] Create a bot called `The Sloth` that attacks neutral zones to motivate users
- [ ] Push notification: `Your zone in Malasana is being attacked by The Sloth`

#### Senior Learning 🎓

Week 9 - Node.js: Background vs foreground process architecture. How do you handle errors in a job no one is actively watching? You need logging, alerts, and retries.

---

#### 📚 Extras — From Zero to Hero

- Node.js Architecture (Week 9): Implement this cron with exponential backoff retries: if it fails, retry in 1 minute, then 2 minutes, then 4 minutes. That prevents a temporary database issue from leaving zones undegraded.
- Databases (Week 10): The query for `zones with last_activity > 72h` needs an index on `last_activity`. Without an index, PostgreSQL does a full table scan. With millions of zones, that is critical. Add the index in the migration.
- System Design (Week 13): `The Sloth` is a system actor. Design its behavior as a state machine: select neutral zone -> calculate attack -> apply points -> notify nearby users. What happens if there are 10k neutral zones?
- Engineering Management (Week 15): Failed background jobs are silent and dangerous. Configure alerts in Sentry or PostHog to detect when this job has not run in more than 25 hours.
