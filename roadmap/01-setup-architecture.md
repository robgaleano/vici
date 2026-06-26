# [1] 🏗️ EPIC: Project Setup & Architecture

[Back to index](../roadmap.md)

## 🏗️ Setup & Architecture

- **Priority:** P0 - Critical
- **Label:** Mobile
- **Status:** In progress

#### Objective

Set up the VICI project architecture from scratch in a professional way, with the tools, conventions, and structure a senior production team would use.

#### Definition of Done

- [x] GitHub repo with a defined branch strategy (trunk-based: all branches → `main` via PR)
- [ ] App runs in iOS Simulator and Android Emulator (builds + launches; runtime crash on Intel simulator tracked separately)
- [x] TypeScript in strict mode with no errors (all 3 packages pass `pnpm typecheck`)
- [x] Basic CI pipeline running on every PR (`ci.yml`: lint + typecheck, green on PR #3)

#### [1.1] Task: Initialize Expo project with strict TypeScript

- **Priority:** P0 - Critical
- **Label:** Mobile
- **Status:** Completed

#### Steps

- [x] `npx create-expo-app VICI --template expo-template-blank-typescript`
- [x] Configure `tsconfig.json` with `strict: true`
- [x] Install and configure ESLint + Prettier with team rules
- [x] Install Husky + lint-staged for pre-commit hooks
- [x] Create the initial folder structure: `src/screens`, `src/components`, `src/hooks`, `src/services`, `src/store`, `src/types`, `src/utils`

#### Work Log

- [Task log 1.1](01-setup-architecture/1.1-initialize-expo-project-with-strict-typescript.md)

#### Senior Learning 🎓

Week 1 - Advanced TypeScript: Use this task to create your first global types with Generics. Example: `type ApiResponse<T> = { data: T; error: string | null }`. Practice Utility Types such as `Pick`, `Omit`, and `Partial` on your data models.

---

#### 📚 Extras — From Zero to Hero

- Event Loop & Garbage Collection: Understand why strict TypeScript helps prevent dangling references. What happens in the Event Loop when GPS emits coordinates every 3 seconds while the UI keeps re-rendering?

  > When GPS emits coordinates every 3 seconds and the UI re-renders simultaneously, both are tasks on the JS thread's event loop. Strict TypeScript helps because it prevents type errors like passing a raw coordinate object where a typed `{ latitude: number; longitude: number }` is expected — errors that would only surface at runtime during a live run. With `strict: true`, the compiler catches these at build time.

- Utility Types: Create `src/types/api.ts` from day one with `ApiResponse<T>`, `PaginatedResult<T>`, and `Nullable<T>`. Use them in every project service.

  > Done. `ApiResponse<T>`, `PaginatedResult<T>`, and `Nullable<T>` were created in `packages/shared/src/index.ts` and are available across the monorepo via the `@vici/shared` workspace alias. Every Supabase call in the app should return an `ApiResponse<T>` so error handling is uniform.

- Generics: Define `type ApiResponse<T> = { data: T; error: string | null }` and use it in every Supabase call.

  > Defined in `packages/shared`. When used with the Supabase client (e.g. `supabase.from('profiles').select()`), `T` becomes `Database["public"]["Tables"]["profiles"]["Row"]` — a fully typed row from the generated schema in task 1.3.

- Type Guards: Implement `isUser(obj): obj is User` to validate server responses before using them.
  > In VICI this is critical on the onboarding gate: the app must confirm `profile.username !== null && profile.team_id !== null` before allowing entry to the main tabs. A type guard like `isOnboardingComplete(profile): profile is CompletedProfile` captures this check in a reusable, type-safe way.

#### [1.2] Task: Configure navigation with Expo Router

- **Priority:** P0 - Critical
- **Label:** Mobile
- **Status:** Completed

#### Steps

- [x] Migrate from npm to pnpm and upgrade Expo SDK 54 -> 55
- [x] Install Expo Router and its dependencies (`react-native-screens`, `safe-area-context`, `expo-linking`, `expo-constants`, `expo-system-ui`)
- [x] Create the route structure: `(auth)/login`, `(auth)/register`, `(auth)/forgot-password`, `(tabs)/map`, `(tabs)/activity`, `(tabs)/profile`
- [x] Configure layouts with `_layout.tsx` (Root Stack, Tabs, Auth Stack)
- [x] Configure the `@/*` path alias in `tsconfig.json`
- [x] Remove legacy entry points (`App.tsx`, `index.ts`) and rename `src/` -> `lib/`
- [x] Validate on an iPhone device with Expo Go beta for SDK 55

#### Work Log

- [Task log 1.2](01-setup-architecture/1.2-configure-navigation-with-expo-router.md)

#### Senior Learning 🎓

Week 8 - React Native: Expo Router v4 runs on top of the new React Native architecture (Fabric + TurboModules) and React Navigation 7. Research how JSI replaces the legacy Bridge and what that means for a real-time map app.

---

#### 📚 Extras — From Zero to Hero

- React Native - New Architecture (Fabric + TurboModules): Expo Router v4 runs on the new architecture with React Navigation 7. Understand the difference between the legacy Bridge (async, JSON serialization) and JSI (synchronous, direct native memory access). In Expo 54+, the new architecture is the default.

  > The legacy Bridge serialized every JS↔native call to JSON and sent it asynchronously — fine for button taps, but a bottleneck for a real-time map app emitting GPS coordinates every 3 seconds. JSI replaces this with direct synchronous memory access between JS and native, meaning Mapbox can receive coordinate updates without the serialization cost. This is why VICI runs on Expo 55 with the new architecture as default.

- Rendering Patterns: Expo Router's file-based routing follows the same core idea as Next.js. Connect how nested layouts work across both ecosystems.

  > A `_layout.tsx` file is equivalent to a `layout.tsx` in Next.js App Router — it wraps all children in that directory. Nested layouts (Root Stack → Auth Stack → Tabs) map directly to nested `layout.tsx` files. The key difference: Expo Router navigates between native screens, not HTML pages. The mental model is identical; the output is platform-native.

- TypeScript: Properly type route params with `useLocalSearchParams<{ id: string }>()` to avoid runtime navigation errors.
  > Without the generic, params come in as `string | string[]` and require runtime checks everywhere. In VICI this matters for future deep links into zone detail or challenge screens — the wrong param type would silently break navigation at runtime instead of failing at compile time.

#### [1.3] Task: Supabase setup + initial database schema

- **Priority:** P0 - Critical
- **Label:** Backend
- **Status:** Completed

#### Steps

- [x] Create the Supabase project (EU West region, free tier)
- [x] Enable `postgis` extension via migration (`h3-pg` is Pro-only; H3 calculations handled in JS layer using `h3-js`)
- [x] Write 8 migrations in dependency order: extensions → teams → profiles → zones → zone_scores → activities → transactions → views
- [x] Auto-create `profiles` row on sign-up via `handle_new_user` trigger on `auth.users`
- [x] Configure RLS on all 6 tables per the agreed policy matrix
- [x] Generate typed client with `supabase gen types typescript` → `packages/supabase/supabase/types/database.types.ts`
- [x] Wire typed `supabase` client into `apps/mobile/lib/supabase/client.ts`
- [x] Add `@vici/supabase` as workspace dependency of `@vici/mobile`
- [x] Seed 3 launch teams (Speed / Endurance / Tactics) in `packages/supabase/supabase/seed.sql`

#### Deferred to Later Tasks

- Community of Madrid pre-seed (~18,000 H3 resolution-9 hexagons) — requires an Edge Function or one-off script; deferred to [Epic 03 · Maps & Geolocation](../03-maps-geolocation.md)
- Auth providers setup (Apple Sign-In, Google OAuth, email/password) — covered in [Epic 02 · Auth & Security](../02-auth-security.md)
- End-to-end flow verification (sign-up → onboarding → activity → wallet) — covered in [Epic 02 · Auth & Security](../02-auth-security.md) after auth is wired up

#### Work Log

- [Task log 1.3](01-setup-architecture/1.3-setup-supabase-initial-database-schema.md)

#### Senior Learning 🎓

Week 10 - Databases: This is the right moment to understand SQL vs NoSQL. Why use PostGIS over MongoDB for geospatial data? Research spatial indexes (`GiST`) and how they speed up queries such as "give me every zone within an X km radius".

---

#### 📚 Extras — From Zero to Hero

- SQL vs NoSQL: Why use PostGIS over MongoDB for geospatial data? Research spatial indexes (`GiST`) and how they speed up "every zone within an X km radius" queries.

  > PostgreSQL + PostGIS was chosen over MongoDB because PostGIS supports native `geometry`/`geography` types, `GiST` spatial indexes, and operations like `ST_Intersects` and `ST_DWithin` that make zone/route intersection and radius queries fast and declarative. A `GiST` index stores bounding-box approximations in a balanced tree, so a "zones within X km" query prunes the search to a handful of candidates instead of scanning every row — the same reason it beats a naïve lat/lng range filter. MongoDB Atlas supports 2dsphere geospatial queries but lacks the richness of PostGIS for polygon-on-polygon operations, which VICI needs for H3-hexagon zone boundaries. The relational model also fits the data: teams, profiles, zones, and scores are strongly related entities better served by joins and foreign keys than by denormalized documents.

- RESTful vs GraphQL: Supabase exposes an auto-generated REST API via PostgREST. Evaluate whether Supabase GraphQL could reduce over-fetching for zones with many fields — especially the `zones_with_scores` view.

  > For VICI's launch, PostgREST is sufficient and over-fetching is already solved at the database layer: the `zones_with_scores` view collapses the `zones` + `zone_scores` join into one row per zone with an aggregated `team_scores` JSON object, so the client fetches exactly the shape the map needs in a single request — no GraphQL resolver needed. GraphQL would help if the app later needed deeply nested, client-specified selections (e.g. zone → owner team → roster → member profiles) where REST would over- or under-fetch. That's not the current access pattern, so this is **deferred** — revisit if social/team-detail screens in [Epic 06](../06-social-notifications.md) introduce nested graph traversals.

- Node.js Architecture: Structure the backend inside Supabase Edge Functions with clean architecture principles, separating business logic from the data layer.

  > **Deferred to [Epic 04 · Gameplay & Running](../04-gameplay-running.md).** No Edge Functions exist yet in task 1.3 — the schema, RLS, triggers, and views are pure database concerns. The `finish-activity` Edge Function will be the first real application of clean architecture here: a thin handler layer (HTTP/auth) calling a business-logic layer (anti-cheat validation, score calculation) that in turn calls a data layer (Supabase client writes), keeping each concern independently testable.

- TypeScript - Generics: The generated `Database` type from `supabase gen types typescript` integrates with `ApiResponse<T>`. Study how `Database["public"]["Tables"]["profiles"]["Row"]` composes with the shared utility types.

  > The typed client (`createClient<Database>`) makes every query return rows derived from the generated schema, so `Database["public"]["Tables"]["profiles"]["Row"]` is the source `T` for the shared `ApiResponse<T>`, `PaginatedResult<T>`, and `Nullable<T>` from `@vici/shared`. Composition example: a profile fetch is typed `ApiResponse<Database["public"]["Tables"]["profiles"]["Row"]>`, and a paginated zone list is `PaginatedResult<Database["public"]["Views"]["zones_with_scores"]["Row"]>` — the same view that aggregates `team_scores` server-side. Because the generic flows from the generated types, regenerating after a migration propagates schema changes through every call site at compile time, no manual interface upkeep.

#### [1.4] Task: Configure Zustand for global state

- **Priority:** P1 - High
- **Label:** Frontend
- **Status:** Completed

> ⚠️ Prerequisite: Epic 02 (Auth & Security) should be started before or alongside this task. `useAuthStore` depends on the Supabase auth session being available, and the onboarding flow (username + team selection) must work end-to-end before the game stores are meaningful.

#### Steps

- [x] Install `zustand` and `immer`
- [x] Install `expo-secure-store` and wire as Supabase storage adapter
- [x] Create `useAuthStore`: `session`, `user`, `isLoading`, `initialize()`, `login()`, `logout()`
- [x] Create `useProfileStore`: typed stub (`profile: Profile | null`, `isLoading`)
- [x] Create `useGameStore`: typed skeleton (`nearbyZones`, `currentTeam`, `competitivePoints`)
- [x] Create `useActivityStore`: full in-flight accumulator with immer (`status`, `routeCoordinates`, `distanceKm`, `durationSeconds`, `gpsPointCount`)
- [x] Wire `initialize()` + loading gate into root `_layout.tsx`
- [x] All stores use `StateCreator<T>` pattern + devtools in dev builds

#### Work Log

- [Task design log 1.4](01-setup-architecture/1.4-configure-zustand-global-state.md)

#### Senior Learning 🎓

Week 1 - TypeScript: Properly typing Zustand stores requires a solid grasp of `interface` vs `type`, function return types, and the `StateCreator<T>` pattern.

---

#### 📚 Extras — From Zero to Hero

- Architecture and State Management (Week 3): Apply the Context API vs Zustand vs Redux Toolkit analysis here. Why is Zustand the right fit for VICI instead of Redux? Document the trade-offs: boilerplate, DevTools, and middleware.

  > Context API was ruled out because it re-renders every consumer on any value change — fatal for `useActivityStore`, which mutates on every GPS tick and would re-render the whole tree ~every 3 seconds. Redux Toolkit solves that with selectors but carries boilerplate (slices, reducers, dispatch, providers) that doesn't pay off at VICI's scale. Zustand wins on three axes: **boilerplate** — a store is one `create()` call with no provider wrapping the app; **DevTools** — the `devtools` middleware gives Redux DevTools action history for free (D9); **middleware** — `immer` for mutable GPS updates (D7) and selector-based subscriptions so a component reading `distanceKm` doesn't re-render when `routeCoordinates` grows. The trade-off accepted: Zustand has a smaller ecosystem and no enforced action conventions, so discipline (the `StateCreator` + slice pattern, D8) is self-imposed rather than framework-enforced.

- Flux Pattern and unidirectional data flow: Zustand follows this pattern. The store is the single source of truth, actions mutate state, and components react to it. Identify that pattern as you implement it.

  > The pattern is visible in `useActivityStore`: the store holds the single source of truth (`status`, `routeCoordinates`), actions (`addCoordinate`, `endSession`) are the only way to mutate it via `set()`, and components subscribe and re-render in response. Data flows one way — action → `set()` → new state → component — never the reverse. A component never mutates `routeCoordinates` directly; it calls `addCoordinate()`. This is the same unidirectional cycle as Redux/Flux, minus the dispatcher/reducer ceremony.

- TypeScript - Generics: Use `StateCreator<AuthState>` to type your slices correctly. Practice `interface` vs `type` in each store definition.

  > Every store is defined with the `StateCreator<T>` generic rather than the inline `create<T>((set) => ...)` shorthand (D8), because middleware stacks break inference on the inline form. The clearest case is `useActivityStore`, whose slice is typed `StateCreator<ActivityState, [['zustand/immer', never]]>` — the mutator tuple tells TypeScript that `set()` receives an Immer draft, so `state.routeCoordinates.push()` type-checks. On `interface` vs `type`: the stores use `type` aliases (`type AuthState = { ... }`) because the state shapes are closed unions and intersections (e.g. `status: 'idle' | 'active' | 'paused'`) that `type` expresses naturally, whereas `interface` shines for declaration-merged, extendable contracts — not the case here.

- Event Loop: the persisted session is written asynchronously to the device Keychain/Keystore via `expo-secure-store`, so persistence never blocks the JS thread.

  > Note: VICI deliberately does **not** use Zustand's `persist` middleware or AsyncStorage for the session (D4). Persistence is handled by the Supabase client's custom `secureStoreAdapter`, whose `getItem`/`setItem`/`removeItem` wrap `SecureStore.*Async` — Promise-returning APIs that run the actual Keychain/Keystore I/O on a native thread. On the event loop, the write is scheduled as a microtask/native callback: `set()` updates the in-memory store synchronously and returns immediately, while the encrypted disk write resolves later without blocking the JS thread or the GPS/render work running on it. This is exactly why an async storage adapter matters for a real-time app — a synchronous Keychain write on every auth change would stall the same thread that processes location ticks.

#### [1.5] Task: Set up CI/CD with GitHub Actions

- **Priority:** P1 - High
- **Label:** DevOps
- **Status:** Completed (one manual step pending — see note)

> ⚠️ One manual step remains before `build.yml` can run: generate an `EXPO_TOKEN` on the Expo dashboard and add it as a GitHub Actions secret. The workflow is written and committed; it just needs the secret. Everything else is done and verified.

#### Steps

- [x] Create `.github/workflows/ci.yml` with jobs for `lint` and `typecheck` (the `test` job is deferred to [Epic 08](../08-testing-qa.md) — no test runner exists yet) — green on PR #3
- [x] Configure Expo EAS for cloud builds (`eas.json` with `development` / `preview` / `production` profiles)
- [x] Build `preview` artifacts: Android `.apk` + iOS simulator `.app` (free, no Apple account) — both built; iOS launched in simulator (runtime crash on Intel sim tracked as deferred app bug)
- [x] Create `.github/workflows/build.yml` triggered manually (`workflow_dispatch`); auto-on-`main` trigger pre-written but disabled until the app is release-worthy
- [x] Put `EXPO_PUBLIC_SUPABASE_URL` / `EXPO_PUBLIC_SUPABASE_ANON_KEY` / `EXPO_PUBLIC_MAPBOX_TOKEN` in EAS environment variables (`preview`, not GitHub) — service-role key confirmed absent client-side
- [ ] Configure `EXPO_TOKEN` as a GitHub Actions secret (manual dashboard step — see note above)

#### Deferred to Later Tasks

- `test` job in CI — needs a test runner first; deferred to [Epic 08 · Testing & QA](../08-testing-qa.md)
- Deploy to TestFlight / Play Console (`eas submit`) + iOS signing + paid Apple Developer account — deferred to [Epic 07 · Deploy & Observability](../07-deploy-observability.md)
- Graduating `build.yml` to the `push: [main]` continuous-deployment trigger — Phase 2, when `main` is release-worthy

#### Work Log

- [Task design log 1.5](01-setup-architecture/1.5-setup-cicd-github-actions.md)

#### Senior Learning 🎓

Week 11 - Cloud: Even if you use EAS here instead of Docker, understand the CI/CD pipeline concept. Supabase Edge Functions on the backend can still be containerized locally with `supabase start`.

---

#### 📚 Extras — From Zero to Hero

- Cloud and Containers (Week 11): CI/CD is the core of any professional project. Understand the difference between CI (continuous integration: lint + tests on every PR) and CD (continuous delivery/deployment: automatic builds on merge to `main`).
- Docker: `supabase start` uses Docker internally. This is your first practical contact with containers: inspect the `docker-compose.yml` generated by the Supabase CLI and understand what each service does.
- AWS/GCP Fundamentals: EAS Build runs on cloud servers. Understand what a CI runner is, what a build artifact is, and why secrets should never live in source code.
- Engineering Management (Week 15) - DORA metrics: The CI/CD pipeline is what powers the DORA "Deployment Frequency" metric. From day one, you are building the foundation needed to measure it.
