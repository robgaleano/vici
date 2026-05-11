# [2] 🔐 EPIC: Auth & Security

[Back to index](../roadmap.md)

## 🔐 Auth & Security

- **Priority:** P0 - Critical
- **Label:** Backend
- **Status:** Not started

#### Objective

Implement robust authentication and user data privacy.

#### Definition of Done

- [ ] Functional login/sign-up with Google and Apple
- [ ] Team selection during onboarding
- [ ] Active RLS: no user can read another user's data without permission
- [ ] The user's exact route is not publicly visible, only its zone impact

#### [2.1] Task: Implement auth with Supabase (Google + Apple)

- **Priority:** P0 - Critical
- **Label:** Mobile
- **Status:** Not started

#### Steps

- [ ] Configure Google OAuth in the Supabase Dashboard
- [ ] Configure Sign in with Apple (requires an Apple Developer account)
- [ ] Implement a `useAuth` hook with `signInWithGoogle()`, `signInWithApple()`, and `signOut()`
- [ ] Manage session state with `supabase.auth.onAuthStateChange()`
- [ ] Create navigation guards that redirect to login when there is no session
- [ ] Implement automatic refresh token handling

#### Senior Learning 🎓

Week 10 - APIs: Understand the full OAuth 2.0 + PKCE flow. What is a JWT? How does the refresh token work? Why do tokens expire?

---

#### 📚 Extras — From Zero to Hero

- RESTful vs GraphQL (Week 10): The Supabase Auth endpoint is pure REST. Study the HTTP headers it uses: `Authorization: Bearer <jwt>`, `apikey`. Connect this to the idea of authentication in REST APIs.
- TypeScript - Utility Types (Week 1): The Supabase `User` object has many fields. Practice `Pick<User, 'id' | 'email'>` to create a cleaner `AppUser` type that you can use across the app.
- Node.js Architecture (Week 9): `onAuthStateChange()` follows an Observer/Event-driven pattern. The SDK emits an event when the token changes and your app listens to it. Identify that pattern.
- Rendering Patterns (Week 2): Navigation guards are server-side in Next.js (middleware) and client-side in React Native (hook inside a layout). Compare both approaches.

#### [2.2] Task: Onboarding flow - team selection

- **Priority:** P0 - Critical
- **Label:** Frontend
- **Status:** Not started

#### Steps

- [ ] Create an `OnboardingTeamSelect` screen with all 3 teams animated
- [ ] Implement the selection animation with `react-native-reanimated`
- [ ] Save `team_id` in the `profiles` table in Supabase
- [ ] Mark `onboarding_completed: true` on the profile
- [ ] Redirect to the main map when onboarding finishes

#### Senior Learning 🎓

Week 8 - React Native: Use Reanimated 3. Animations with `useSharedValue` and `withSpring` run on the native UI thread instead of JS, which keeps performance at 60fps under load.

---

#### 📚 Extras — From Zero to Hero

- React Native - New Architecture (Week 8): Reanimated 3 is the clearest example of why the new architecture matters. Animations run on the UI thread via JSI without going through the bridge. Understand why that removes jank and dropped frames.
- React evolution - Concurrent Features (Weeks 5/6): `useTransition` in React 18 is the web equivalent of what Reanimated enables natively: marking updates as non-urgent so the UI never blocks. Connect the two ideas.
- TypeScript (Week 1): Type the props of the team selection component. Define a `Team = 'red' | 'blue' | 'yellow'` type and use it as a discriminated union across the project.

#### [2.3] Task: Configure Row Level Security (RLS) in Supabase

- **Priority:** P0 - Critical
- **Label:** Backend
- **Status:** Not started

#### Steps

- [ ] `profiles` policy: users can only `UPDATE` their own profile, with public `SELECT` limited to `username`/`avatar`/`team`
- [ ] `activities` policy: a user can only `SELECT`/`INSERT`/`UPDATE` their own activities
- [ ] `transactions` policy: a user can only `SELECT` their own transactions. Only the system can `INSERT`
- [ ] `zones` policy: public `SELECT`, `UPDATE` only through Edge Functions
- [ ] Write RLS tests: trying to access another user's data should return an empty result

#### Senior Learning 🎓

Week 10 - Databases: RLS is an enterprise PostgreSQL feature. Understand the difference between application-level security and database-level security as defense in depth.

---

#### 📚 Extras — From Zero to Hero

- SQL - PostgreSQL (Week 10): RLS uses `USING (auth.uid() = user_id)` - a SQL expression PostgreSQL evaluates for every row before returning it. Study how that interacts with indexes. Does it add overhead? Yes, but it stays low with the right indexes.
- System Design (Week 13): Defense in depth is a layered security principle. RLS is layer 3 (database), JWT validation is layer 2 (API), and input validation is layer 1 (client). Document your threat model.
- Node.js Architecture (Week 9): Edge Functions that `UPDATE` zones are the only actor allowed to bypass client-side RLS. Understand why using the `service_role` key on the server and the `anon` key on the client is critical for security.
