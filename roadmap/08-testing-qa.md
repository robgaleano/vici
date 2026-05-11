# [8] 🧪 EPIC: Testing & QA

[Back to index](../roadmap.md)

## 🧪 Testing & QA

- **Priority:** P1 - High
- **Label:** Mobile
- **Status:** Not started

#### Objective

Ensure MVP quality with a pragmatic testing strategy for a small team.

#### Definition of Done

- [ ] More than 70% coverage on critical utilities (H3, point algorithms)
- [ ] Integration tests for all Edge Functions
- [ ] E2E test for the flow: login -> activity -> points earned

#### [8.1] Task: Unit tests for geospatial utilities and algorithms

- **Priority:** P1 - High
- **Label:** Mobile
- **Status:** Not started

#### Steps

- [ ] Configure Jest with `ts-jest` for TypeScript
- [ ] Tests for `geoToZone(lat, lng)`: verify that known coordinates produce the correct H3 index
- [ ] Tests for `calculateDistance(route)`: compare against known distances (Haversine)
- [ ] Tests for `validateActivity(activity)`: fraud cases must be rejected
- [ ] Tests for `calculatePoints(distance, powerUp)`: verify multipliers
- [ ] Configure a coverage report and a minimum 70% threshold for CI

#### Senior Learning 🎓

Week 1 - TypeScript: TypeScript types do **not** replace tests. A `number` type does not tell you whether the calculated distance is actually correct. Tests + types together are the winning combination.

---

#### 📚 Extras — From Zero to Hero

- Modern Testing (Week 7): Apply Kent C. Dodds' Testing Trophy here: more integration tests than unit tests, and more unit tests than E2E tests. For geospatial utilities, unit tests are a perfect fit because they are pure functions without side effects.
- TypeScript (Week 1): Practice typing Jest mocks with `jest.fn<ReturnType, Parameters>()`. Understand why TypeScript + Jest gives you deep confidence in tests: if the type changes, the test stops compiling.
- Algorithms (Week 14): Use tests to verify algorithmic complexity in practice: write a test that passes a route with 10k points and measure the runtime. If it takes more than 100ms, you likely have an `O(n^2)` problem to solve.
- TDD: For fraud-validation functions, practice real TDD: first write `it('should reject activity with avg speed > 25 km/h')`, watch it fail, then implement until it turns green. Document the experience.

#### [8.2] Task: Integration tests for Edge Functions

- **Priority:** P1 - High
- **Label:** Backend
- **Status:** Not started

#### Steps

- [ ] Configure a test environment with `supabase start` locally
- [ ] Test `process-activity`: a valid activity must update zones and wallet
- [ ] Test `process-activity`: a fraudulent activity (`>25km/h`) must be rejected
- [ ] Test `redeem-reward`: insufficient balance must return an error
- [ ] Test `redeem-reward`: a successful redemption must deduct balance atomically
- [ ] Test RLS: a call without authentication must return `401`

#### Senior Learning 🎓

Week 9 - Node.js: The best practice is to keep business logic in separate, testable services. Tests should not need to boot the database just to verify business rules.

---

#### 📚 Extras — From Zero to Hero

- Modern Testing (Week 7): Edge Function integration tests are the most valuable layer of the Testing Trophy for VICI. They validate the full contract: HTTP request -> logic -> database -> HTTP response. That gives more value than 100 isolated unit tests.
- Node.js Architecture (Week 9): Refactor Edge Functions so they separate `handler` (HTTP) -> `service` (business logic) -> `repository` (database). Integration tests validate the handler, while unit tests validate the service.
- Docker (Week 11): `supabase start` spins up a local Docker environment identical to production. It is the same concept as having a `docker-compose.test.yml` in web projects. Understand how CI runs those same tests in the pipeline.
- Databases (Week 10): The ACID test for `redeem-reward` is the most critical one: simulate an error in the middle of the transaction and verify the balance did not end up inconsistent. That is what separates someone who truly understands databases from someone who does not.

#### [8.3] Task: ADR - Architecture Decision Records

- **Priority:** P2 - Medium
- **Label:** System Design
- **Status:** Not started

#### Steps

- [ ] Create a `docs/adr/` folder in the repo
- [ ] ADR-001: Why Expo instead of React Native CLI
- [ ] ADR-002: Why Supabase instead of Firebase
- [ ] ADR-003: Why H3 instead of a custom grid for zones
- [ ] ADR-004: Why validate activities in an Edge Function instead of the client
- [ ] ADR-005: Why cursor-based pagination instead of offset pagination
- [ ] Format: Context, Decision, Consequences, Alternatives considered

#### Senior Learning 🎓

Week 16 - STAR stories: Each ADR becomes a STAR story ready for interviews. `Tell me about a difficult technical decision` becomes `open your ADR`.

---

#### 📚 Extras — From Zero to Hero

- System Design (Week 13): ADRs are the artifact that proves System Design thinking. Each ADR follows the same structure as an interview question: problem context, considered options, chosen decision, consequences. It is literally System Design practice while you build.
- Engineering Management (Week 15): On senior teams, ADRs replace long technical decision meetings. They are written as proposals, the team comments in the PR, and the ADR is merged when consensus is reached. Practice that workflow even if you are working solo.
- STAR stories (Week 16): Prepare these 5 stories based on the ADRs.
- Soft Skills (Week 15): Use the SBI feedback model when writing ADRs: Situation (context), Behavior (what each option does), Impact (consequences). It is the same framework applied to technical documentation.

#### [8.4] Task: Activity history with a static route map

- **Priority:** P2 - Medium
- **Label:** Mobile
- **Status:** Not started

#### Steps

- [ ] Save `route` as JSONB in the `activities` table when the activity completes
- [ ] `HistoryScreen` with an activity list (`FlatList` with pagination)
- [ ] Route preview using the Mapbox Static Images API (URL with encoded polyline)
- [ ] Detail screen with an interactive route map when tapped
- [ ] Stats: total distance, total time, all-time zones conquered

#### Senior Learning 🎓

Week 2 - Rendering Patterns: `FlatList` is mobile virtual scrolling. If you used `ScrollView` with 1000 items, the app would freeze. This is one of the most important performance patterns in mobile.

---

#### 📚 Extras — From Zero to Hero

- Rendering Patterns (Week 2): The Mapbox Static Images API returns a PNG from a URL. This is SSG (Static Site Generation) applied to maps: the image is generated once and cached. Compare it to rendering the dynamic map (CSR) and explain when to use each one.
- Web Performance (Week 4): Lazy-load images in the activity list: each map preview should only load when the item enters the viewport (`onViewableItemsChanged` in `FlatList`). Connect that to `loading="lazy"` on the web.
- React Native (Week 8): Optimize `FlatList` with `getItemLayout` (when all items have the same height), `keyExtractor`, `removeClippedSubviews={true}`, and `maxToRenderPerBatch`. Measure with the profiler before and after.
- TypeScript (Week 1): The `route` field is JSONB in PostgreSQL. Define `type RoutePoint = { lat: number; lng: number; timestamp: number }` and `type Route = RoutePoint[]`. Practice typing nested structures and how Supabase generates the type automatically.
