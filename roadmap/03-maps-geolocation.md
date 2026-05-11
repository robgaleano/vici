# [3] 🗺️ EPIC: Maps & Geolocation

[Back to index](../roadmap.md)

## 🗺️ Maps & Geolocation

- **Priority:** P0 - Critical
- **Label:** Mobile
- **Status:** Not started

#### Objective

Show the game map in real time, with team-colored hexagons and GPS tracking for the runner.

#### Definition of Done

- [ ] Map loads in under 2 seconds with colored hexagons
- [ ] GPS works with the screen off
- [ ] Battery usage does not drop more than 15% per hour of use
- [ ] Zones update in real time (Supabase Realtime)

#### [3.1] Task: Integrate the Mapbox SDK with game-style visuals

- **Priority:** P0 - Critical
- **Label:** Mobile
- **Status:** Not started

#### Steps

- [ ] Install `@rnmapbox/maps` and configure the token
- [ ] Create a `<GameMap />` component with a dark, game-style visual theme
- [ ] Implement a GeoJSON layer to render H3 hexagons colored by team
- [ ] Add the user layer (animated point in the user's team color)
- [ ] Implement clustering for distant zones to improve performance

#### Senior Learning 🎓

Week 4 - Web Performance: Rendering 1000+ hexagons is equivalent to rendering a very large list. Study how Mapbox uses WebGL and why it is more efficient than SVG.

---

#### 📚 Extras — From Zero to Hero

- Web Performance - Core Web Vitals (Week 4): Apply performance principles to the map. Use layer lazy loading so only hexagons inside the visible viewport are loaded, similar to LCP on the web. Measure the initial map load time.
- Code Splitting (Week 4): The Mapbox SDK is heavy. Consider dynamic import so it does not block the initial bundle. In React Native this can be done with `React.lazy` + `Suspense`.
- React Native - New Architecture (Week 8): Mapbox uses native modules directly through JSI (TurboModules). It is a concrete example of why the new architecture improves real-time map performance.
- Rendering Patterns (Week 2): The map should never re-render when the HUD changes. Apply `React.memo` to `<GameMap />` and understand how React's reconciler decides what to re-render.

#### [3.2] Task: Implement background GPS tracking

- **Priority:** P0 - Critical
- **Label:** Mobile
- **Status:** Not started

#### Steps

- [ ] Install `expo-location` and configure permissions in `app.json`
- [ ] Register a Background Location Task with `expo-task-manager`
- [ ] Implement a `useGpsTracking()` hook with states: `IDLE`, `TRACKING`, `PAUSED`
- [ ] Tune `timeInterval: 3000` and `distanceInterval: 10` for the right battery/accuracy balance
- [ ] Store coordinates in memory during the session (array of coordinates)
- [ ] Implement automatic pause logic if speed stays below `0.5 m/s` for `30s`

#### Senior Learning 🎓

Week 8 - React Native: Background Tasks are one of the clearest cases where TurboModules make a real difference. `expo-task-manager` uses the native thread so it does not block the JS thread.

---

#### 📚 Extras — From Zero to Hero

- React Native - New Architecture (Week 8): Background tasks on iOS and Android rely on completely different native APIs. TurboModules abstract that difference. Study how `expo-task-manager` registers tasks differently on each platform under the hood.
- Event Loop & Garbage Collection (Week 1): The coordinates array grows throughout the entire run. Understand when the Garbage Collector cleans it up and why you must clean up the registered task in the `useEffect` cleanup to avoid memory leaks.
- Web Performance (Week 4): The `timeInterval` vs `distanceInterval` balance is a real performance problem: more samples mean more precision, but also more battery and memory usage. Document the numbers you choose and why.
- Modern Testing (Week 7): This hook is an ideal candidate for an integration test with a mocked GPS provider. Practice mocking `expo-location` in Jest to simulate a route.

#### [3.3] Task: Integrate Uber's H3 library for hexagons

- **Priority:** P0 - Critical
- **Label:** Mobile
- **Status:** Not started

#### Steps

- [ ] Install `h3-js`
- [ ] Create a `geoToZone(lat, lng): string` utility that returns the H3 index
- [ ] Create a `getNeighboringZones(h3Index, rings): string[]` utility to fetch nearby zones
- [ ] Create a `h3ToGeoJSON(h3Index): Feature` utility for Mapbox rendering
- [ ] Define a global resolution: Resolution 9 (`~0.1 km²`, ideal for running)
- [ ] Write unit tests for the geospatial utilities

#### Senior Learning 🎓

Week 14 - Algorithms: H3 uses a sophisticated geospatial data structure. Why is H3 `O(1)` for lookup while R-Trees are `O(log n)`? That is a classic senior interview question.

---

#### 📚 Extras — From Zero to Hero

- Algorithms and Data Structures (Week 14): The H3 index is a geospatial hash. Study how it differs from an R-Tree. For `getNeighboringZones`, how many zones are returned for `rings=1`? For `rings=2`? Calculate the complexity.
- TypeScript - Generics (Week 1): The utilities should be precisely typed. `h3ToGeoJSON` returns a `GeoJSON.Feature<GeoJSON.Polygon>`. Practice nested complex types.
- Modern Testing (Week 7): Pure functions are the easiest to test. `geoToZone(40.4168, -3.7038)` should always return the same H3 index. Write the test first (TDD), then the implementation.
- System Design (Week 13): Choosing resolution 9 is a design decision that impacts the database (number of rows), performance (queries), and UX (visual size). Document that trade-off in an ADR.

#### [3.4] Task: Implement real-time zone loading with Supabase Realtime

- **Priority:** P1 - High
- **Label:** Backend
- **Status:** Not started

#### Steps

- [ ] Create a `useNearbyZones(userH3Index)` hook that loads zones within a 2 km radius
- [ ] Subscribe to changes in the `zones` table filtered by `h3_index` in the nearby list
- [ ] Implement a `500ms` debounce on map updates to avoid excessive re-renders
- [ ] Handle WebSocket disconnect/reconnect gracefully

#### Senior Learning 🎓

Week 10 - API Design: REST polling, WebSockets, or Server-Sent Events? Document the decision and its trade-offs. Senior interviews ask exactly this.

---

#### 📚 Extras — From Zero to Hero

- RESTful vs GraphQL (Week 10): This task is the clearest case for why WebSockets beat REST polling in real time. Calculate it: with 1000 active users, REST polling every 5 seconds equals 200 req/s. WebSocket means 1000 persistent connections. Which one scales better?
- System Design (Week 13): The pattern of subscribing only to nearby zones is an example of fan-out on read vs fan-out on write. Sketch how you would scale this to 100k users.
- Web Performance (Week 4): A `500ms` debounce is a classic performance technique. Connect it to `requestAnimationFrame` and why updating the map more than 60 times per second is pointless.
- React - Concurrent Features (Week 5): `useTransition` in React 18 is a good fit here: mark map updates as non-urgent so the runner HUD never freezes.

#### [3.5] Task: Implement speed-based anti-cheat

- **Priority:** P1 - High
- **Label:** Backend
- **Status:** Not started

#### Steps

- [ ] Create a Supabase Edge Function called `validate-activity`
- [ ] Calculate average speed: `total_distance / total_time`
- [ ] Calculate point-to-point maximum speed across the route
- [ ] Reject when `avg_speed > 25 km/h` OR `max_speed > 50 km/h`
- [ ] Reject when the ratio `(stops / total_time) < 0.05`
- [ ] Log cheating attempts in a `fraud_attempts` table

#### Senior Learning 🎓

Week 13 - System Design: Anti-cheat is a classic distributed-system problem. Where do you place validation: client, API Gateway, or database? Each layer has trade-offs. The Edge Function is the right balance here.

---

#### 📚 Extras — From Zero to Hero

- Node.js Architecture (Week 9): The validation Edge Function follows a middleware pipeline pattern: it receives the activity, passes it through chained validators (speed -> accelerometer -> stops), and only processes it if all checks pass. Implement that pattern explicitly.
- Algorithms (Week 14): Point-to-point maximum speed requires iterating over the coordinates array and applying the Haversine formula to each pair. Complexity is `O(n)`. Optimize it by dropping points below a minimum `distanceInterval`.
- System Design (Week 13): Design the complete anti-fraud system on paper: how would you detect someone cheating slowly over multiple weeks? Think in terms of statistical anomaly detection.
- Testing (Week 7): Fraud cases are perfect for parameterized tests. Define a table such as `[{ speed: 30, expected: 'rejected' }, { speed: 10, expected: 'approved' }]` and run them all with `test.each`.
