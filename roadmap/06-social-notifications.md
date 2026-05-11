# [6] 👥 EPIC: Social & Notifications

[Back to index](../roadmap.md)

## 👥 Social & Notifications

- **Priority:** P1 - High
- **Label:** Frontend
- **Status:** Not started

#### Objective

Make the game feel alive and competitive.

#### Definition of Done

- [ ] Global and city leaderboards working
- [ ] Push notifications for attacks and challenges
- [ ] Challenge system with progress tracking
- [ ] Public profile with activity history

#### [6.1] Task: Leaderboards (global + local)

- **Priority:** P1 - High
- **Label:** Backend
- **Status:** Not started

#### Steps

- [ ] Create a `weekly_leaderboard` SQL View with weekly point rankings
- [ ] Create a `team_leaderboard` SQL View with total points by team
- [ ] `LeaderboardScreen` with tabs: Global / My City / My Team
- [ ] Highlight the current user's position
- [ ] Cursor-based pagination for the top 100

#### Senior Learning 🎓

Week 13 - System Design: This is the classic scalability problem. With 100 users, `SELECT` with `ORDER BY` works fine. With 1M users, you need Redis Sorted Sets (`O(log n)` for insert and rank lookup).

---

#### 📚 Extras — From Zero to Hero

- System Design (Week 13): Design leaderboard evolution in 3 phases: 1) SQL View (MVP), 2) Materialized View with periodic refresh (10k users), 3) Redis Sorted Sets (1M users). Document when you would make each jump.
- Algorithms (Week 14): `ORDER BY points DESC LIMIT 100` is `O(n log n)` without an index. With a B-tree index on `points`, it effectively becomes `O(100)`. Add the index and measure the difference with `EXPLAIN ANALYZE`.
- Databases (Week 10): SQL Views are stored queries. Materialized Views are stored queries with cached results. When would you use each one for the VICI leaderboard?
- React Native (Week 8): The leaderboard tabs (Global / City / Team) are a lazy-loading section case. Do not load all 3 tabs at once: use `React.lazy` or load on demand when the tab changes.

#### [6.2] Task: Push notifications with Expo

- **Priority:** P1 - High
- **Label:** Mobile
- **Status:** Not started

#### Steps

- [ ] Configure `expo-notifications` and request permission
- [ ] Store `expo_push_token` in the `profiles` table
- [ ] Create a `sendPushNotification(userId, title, body, data)` helper
- [ ] Implement the `Your zone is under attack` notification from `process-activity`
- [ ] Implement the `Challenge completed` notification
- [ ] Handle foreground notifications with a custom banner

#### Senior Learning 🎓

Week 13 - System Design: Push notifications are often fire-and-forget. How would you design a system that guarantees delivery? Hint: message queue + ACK + retries.

---

#### 📚 Extras — From Zero to Hero

- System Design (Week 13): The `sendPushNotification` helper is the starting point for a notification system. Design how it would scale: with 10k users receiving notifications at the same time, how do you avoid saturating the Expo API? Research rate limiting and queues (`BullMQ`, `pg_boss`).
- Node.js Architecture (Week 9): The Observer/Event-driven pattern is ideal for notifications. Instead of calling `sendPushNotification` directly from `process-activity`, emit a `zone.conquered` event and let a separate listener send the notification. More decoupled and easier to test.
- React Native (Week 8): Foreground notifications (app open) and background notifications (app closed) behave differently on iOS and Android. Document those differences and how Expo Notifications abstracts them.
- Engineering Management (Week 15): Push notifications are the most direct retention KPI. Measure in PostHog how many notifications bring users back into the app (open rate).

#### [6.3] Task: Challenge and mission system

- **Priority:** P2 - Medium
- **Label:** Backend
- **Status:** Not started

#### Steps

- [ ] Create a `challenges` table (`id`, `title`, `description`, `type`, `target_value`, `reward_coins`, `expires_at`)
- [ ] Create a `user_challenges` table (`user_id`, `challenge_id`, `current_value`, `completed`, `completed_at`)
- [ ] Seed challenges such as `5 km in one session`, `Conquer 5 zones today`, `Run 3 days in a row`
- [ ] In `process-activity`, evaluate and update progress for the user's active challenges
- [ ] Challenge screen with a progress bar for each challenge
- [ ] Notification and animation when a challenge is completed

#### Senior Learning 🎓

Week 9 - Node.js: Observer/Event-driven pattern. Instead of having `process-activity` know about every challenge, it could emit an `activity.completed` event and challenges would listen to it.

---

#### 📚 Extras — From Zero to Hero

- Node.js Architecture (Week 9): Implement the challenge system with the Strategy pattern: each challenge type (`distance`, `zones`, `streak`) has its own evaluator class/function. `process-activity` does not need to know which challenges exist; it just calls `evaluateChallenges(activity)`.
- Databases (Week 10): The `Run 3 days in a row` challenge needs a complex query: look up activities across the last 3 distinct days. Practice `GROUP BY DATE(created_at)` and `HAVING COUNT(DISTINCT date) >= 3`.
- React Native (Week 8): Progress bars are a perfect Reanimated use case: animate progress from `0` to `current/target` with `withTiming` on the UI thread.
- Testing (Week 7): Challenge evaluators are pure functions: given an activity history, is the challenge completed? Perfect for TDD. Write the `challenge completed` test first, then the implementation.
