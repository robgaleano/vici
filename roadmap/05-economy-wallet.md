# [5] 💰 EPIC: Economy & Wallet

[Back to index](../roadmap.md)

## 💰 Economy & Wallet

- **Priority:** P1 - High
- **Label:** Backend
- **Status:** Not started

#### Objective

Create the reward system that turns physical effort into tangible value.

#### Definition of Done

- [ ] User can see their FunCoins balance
- [ ] Balance increases when activities are completed
- [ ] Daily energy cap limits how many coins can be earned
- [ ] Marketplace with redeemable coupons

#### [5.1] Task: ACID wallet and transaction system

- **Priority:** P0 - Critical
- **Label:** Backend
- **Status:** Not started

#### Steps

- [ ] Create a `wallets` table (`user_id` PK, `balance`, `daily_earned`, `daily_reset_at`)
- [ ] Create a `transactions` table (`id`, `user_id`, `amount`, `type [EARN|SPEND]`, `description`, `created_at`)
- [ ] Create a PostgreSQL function `credit_wallet(user_id, amount, description)` with an atomic transaction
- [ ] Implement the energy cap: if `daily_earned >= 100`, reject new credits
- [ ] Midnight cron job to reset `daily_earned = 0`
- [ ] Expose an Edge Function so `process-activity` can call it

#### Senior Learning 🎓

Week 10 - Databases: This is a classic ACID case. Without a transaction, you can create coins out of thin air or lose them. Also research Optimistic Locking for the race condition where two activities finish at the same time.

---

#### 📚 Extras — From Zero to Hero

- SQL - PostgreSQL (Week 10): This function is your first real contact with ACID transactions in production. Understand the four isolation levels: `READ UNCOMMITTED`, `READ COMMITTED`, `REPEATABLE READ`, `SERIALIZABLE`. Which one would you use here and why?
- System Design (Week 13): Two activities finishing at the same time is a classic concurrency problem. Design the solution with Optimistic Locking (version column) or `SELECT FOR UPDATE`. Document the decision.
- Node.js Architecture (Week 9): The `credit_wallet` function follows the Command pattern: a named operation that encapsulates all of the business logic for crediting coins. Easy to test, easy to audit.
- Algorithms (Week 14): The energy cap is a sliding-window problem: how much has the user earned in the last 24 hours? Think through how you would implement that with a sliding window instead of a midnight reset, which is fairer across time zones.

#### [5.2] Task: Wallet screen and transaction history

- **Priority:** P1 - High
- **Label:** Frontend
- **Status:** Not started

#### Steps

- [ ] `WalletScreen` with a large animated balance
- [ ] Progress bar: `daily_earned / 100 FunCoins`
- [ ] Transaction list with pagination (cursor-based, 20 items)
- [ ] Coin-rain animation when receiving FunCoins (Lottie)
- [ ] Countdown until the energy cap resets

#### Senior Learning 🎓

Week 4 - Performance: Cursor-based pagination is more efficient than offset-based pagination. `OFFSET 1000` requires reading 1000 rows only to discard them. With a cursor (`WHERE created_at < last_cursor`), the index is used directly.

---

#### 📚 Extras — From Zero to Hero

- Web Performance (Week 4): Implement the transaction list with `FlatList` + cursor-based pagination. Measure load time for the first page vs the tenth page. The difference between cursor and offset becomes obvious here.
- React Native (Week 8): `FlatList` uses virtualization: it only renders visible items. Connect that idea to the Virtual DOM concept on the web. What would happen with `ScrollView` and 500 transactions?
- React - Concurrent Features (Weeks 5/6): Use `Suspense` to show a skeleton loader while transactions are loading. It is the modern pattern for loading states in React.
- TypeScript (Week 1): Define the paginated response type: `type CursorPage<T> = { data: T[]; nextCursor: string | null; hasMore: boolean }`. Practice real-world Generics.

#### [5.3] Task: Coupon marketplace (fictional MVP)

- **Priority:** P2 - Medium
- **Label:** Frontend
- **Status:** Not started

#### Steps

- [ ] Create a `rewards` table (`id`, `title`, `description`, `cost_coins`, `image_url`, `stock`, `type`)
- [ ] Seed 5-10 fictional rewards
- [ ] `MarketplaceScreen` with a rewards grid
- [ ] `redeem-reward` Edge Function: verify balance, deduct coins, and generate a coupon code
- [ ] `My Coupons` screen with redeemed codes

#### Senior Learning 🎓

Week 9 - Node.js: The coupon redemption flow is an example of the Saga pattern: verify balance -> reserve -> deduct -> issue coupon. If step 3 fails, step 2 must be compensated.

---

#### 📚 Extras — From Zero to Hero

- Node.js Architecture (Week 9): The Saga pattern is fundamental in microservices. Even if everything lives in a single function here, practice thinking in compensating steps: if `issue_coupon` fails, how do you roll back the deduction? Use PostgreSQL transactions.
- System Design (Week 13): The `stock` field on `rewards` introduces a concurrency problem: what happens if 100 users try to redeem the last coupon at the same time? Design the solution with `SELECT ... FOR UPDATE SKIP LOCKED`.
- React Native (Week 8): The rewards grid is a `FlatList` case with `numColumns={2}`. Optimize it with `getItemLayout` so scrolling stays instant without calculating dynamic heights.
- RESTful vs GraphQL (Week 10): The `redeem-reward` endpoint is a good example of why not everything is CRUD REST. It is an action with business logic, not just a simple `UPDATE`. Compare how you would model it in GraphQL (mutation) vs REST (`POST /rewards/{id}/redeem`).
