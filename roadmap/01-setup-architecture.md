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
- [ ] App runs in iOS Simulator and Android Emulator
- [ ] TypeScript in strict mode with no errors
- [ ] Basic CI pipeline running on every PR

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

- SQL vs NoSQL: PostgreSQL + PostGIS was chosen over MongoDB because PostGIS supports native `geometry` types, `GiST` spatial indexes, and operations like `ST_Intersects` that make zone/route intersection queries fast and declarative. MongoDB Atlas Search can do geospatial queries but lacks the richness of PostGIS for polygon operations.
- RESTful vs GraphQL: Supabase exposes an auto-generated REST API via PostgREST. Evaluate whether Supabase GraphQL could reduce over-fetching for zones with many fields — especially the `zones_with_scores` view that joins multiple tables.
- Node.js Architecture: Structure the backend inside Supabase Edge Functions with clean architecture principles, separating business logic from the data layer. The `finish-activity` Edge Function will be the first real example of this.
- TypeScript - Generics: The generated `Database` type from `supabase gen types typescript` integrates directly with `ApiResponse<T>`. Study how `Database["public"]["Tables"]["profiles"]["Row"]` composes with your shared utility types.

#### [1.4] Task: Configure Zustand for global state

- **Priority:** P1 - High
- **Label:** Frontend
- **Status:** Not started

> ⚠️ Prerequisite: Epic 02 (Auth & Security) should be started before or alongside this task. `useAuthStore` depends on the Supabase auth session being available, and the onboarding flow (username + team selection) must work end-to-end before the game stores are meaningful.

#### Steps

- [ ] Install `zustand` and `immer`
- [ ] Create `useAuthStore`: `user`, `session`, `isLoading`, `login()`, `logout()`
- [ ] Create `useGameStore`: nearby zones, current team, points
- [ ] Create `useActivityStore`: running session state (`active`/`inactive`, coordinates, distance)
- [ ] Implement persistence middleware for the auth token

#### Senior Learning 🎓

Week 1 - TypeScript: Properly typing Zustand stores requires a solid grasp of `interface` vs `type`, function return types, and the `StateCreator<T>` pattern.

---

#### 📚 Extras — From Zero to Hero

- Architecture and State Management (Week 3): Apply the Context API vs Zustand vs Redux Toolkit analysis here. Why is Zustand the right fit for VICI instead of Redux? Document the trade-offs: boilerplate, DevTools, and middleware.
- Flux Pattern and unidirectional data flow: Zustand follows this pattern. The store is the single source of truth, actions mutate state, and components react to it. Identify that pattern as you implement it.
- TypeScript - Generics: Use `StateCreator<AuthState>` to type your slices correctly. Practice `interface` vs `type` in each store definition.
- Event Loop: Zustand persistence middleware serializes to AsyncStorage asynchronously. Understand why that does not block the JS thread.

#### [1.5] Task: Set up CI/CD with GitHub Actions

- **Priority:** P1 - High
- **Label:** DevOps
- **Status:** Not started

#### Steps

- [ ] Create `.github/workflows/ci.yml` with jobs for `lint`, `typecheck`, and `test`
- [ ] Configure Expo EAS for cloud builds
- [ ] Create a deploy workflow to TestFlight / Play Console on merge to `main`
- [ ] Configure GitHub secrets for `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and `MAPBOX_TOKEN`

#### Senior Learning 🎓

Week 11 - Cloud: Even if you use EAS here instead of Docker, understand the CI/CD pipeline concept. Supabase Edge Functions on the backend can still be containerized locally with `supabase start`.

---

#### 📚 Extras — From Zero to Hero

- Cloud and Containers (Week 11): CI/CD is the core of any professional project. Understand the difference between CI (continuous integration: lint + tests on every PR) and CD (continuous delivery/deployment: automatic builds on merge to `main`).
- Docker: `supabase start` uses Docker internally. This is your first practical contact with containers: inspect the `docker-compose.yml` generated by the Supabase CLI and understand what each service does.
- AWS/GCP Fundamentals: EAS Build runs on cloud servers. Understand what a CI runner is, what a build artifact is, and why secrets should never live in source code.
- Engineering Management (Week 15) - DORA metrics: The CI/CD pipeline is what powers the DORA "Deployment Frequency" metric. From day one, you are building the foundation needed to measure it.
