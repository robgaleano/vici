# [7] 🚀 EPIC: Deploy & Observability

[Back to index](../roadmap.md)

## 🚀 Deploy & Observability

- **Priority:** P1 - High
- **Label:** DevOps
- **Status:** Not started

#### Objective

Make sure the product reaches users reliably and that we can measure and improve it continuously.

#### Definition of Done

- [ ] App published to TestFlight and Play Console (closed beta)
- [ ] Errors reported automatically to Sentry
- [ ] Basic analytics in PostHog
- [ ] Team DORA metrics dashboard

#### [7.1] Task: Dockerize the local development environment

- **Priority:** P1 - High
- **Label:** DevOps
- **Status:** Not started

#### Steps

- [ ] Create a `docker-compose.yml` for local development
- [ ] Services: `supabase` (PostgreSQL + API + Auth + Storage), `pgadmin`
- [ ] `./scripts/setup.sh` script to initialize the environment and run migrations
- [ ] Document prerequisites and a 5-minute setup flow in the README
- [ ] Configure environment variables with `.env.example`

#### Senior Learning 🎓

Week 11 - Docker: Learn the core concepts: image vs container, volumes (to persist the database across restarts), networks (so services can communicate), and why `docker-compose` differs from running standalone containers.

---

#### 📚 Extras — From Zero to Hero

- Docker - Fundamentals (Week 11): This `docker-compose` file is your first real Docker project. Understand image (template) vs container (instance), volume (persistent data outside the container), and network (communication between services). Draw the service diagram.
- Containerizing Node/React apps (Week 11): Supabase Edge Functions run on Deno/Node. Understand how `supabase start` containerizes them locally and how that differs from production deployment (serverless vs persistent container).
- AWS/GCP Fundamentals (Week 11): Supabase Cloud runs on AWS. When you use `supabase start` locally, you are reproducing what runs on AWS. Understand which AWS services Supabase relies on under the hood (`RDS`, `S3`, `EC2`).
- Engineering Management (Week 15): A README with a 5-minute setup is a team quality metric. Time to First Contribution is a real KPI in senior engineering organizations.

#### [7.2] Task: Integrate Sentry for error tracking

- **Priority:** P1 - High
- **Label:** DevOps
- **Status:** Not started

#### Steps

- [ ] Create a project in Sentry (free plan)
- [ ] Install and configure `@sentry/react-native` with Expo
- [ ] Configure `Sentry.init()` in the app entry point
- [ ] Implement a global Error Boundary with `Sentry.ErrorBoundary`
- [ ] Configure Source Maps so stack traces are readable
- [ ] Create alerts for new errors affecting more than 1% of users

#### Senior Learning 🎓

Week 15 - Engineering Management: Source Maps are critical. Without them, the error trace shows `bundle.js:1:45832` instead of your real source code. Connect that to the concept of reproducible builds.

---

#### 📚 Extras — From Zero to Hero

- Cloud and Containers (Week 11): Source Maps are build artifacts. Understand how the CI/CD pipeline uploads them to Sentry automatically during the build. Without correct CI/CD, Source Maps never match production.
- React - Error Boundaries (Weeks 5/6): `Sentry.ErrorBoundary` uses React's Error Boundary API. Study how it works internally: it catches errors in the child component tree, like `try/catch` but for render flows.
- Engineering Management - DORA (Week 15): The DORA metric `Change Failure Rate` can be measured with Sentry: how many deploys introduce new errors. With Sentry and CI/CD configured, you can calculate this KPI automatically.
- Soft Skills (Weeks 15/16): When you present VICI in an interview, the fact that you configured Sentry from day one and can talk about `Change Failure Rate` becomes a perfect STAR story for `how do you guarantee quality in production?`

#### [7.3] Task: Beta release in TestFlight + Play Console

- **Priority:** P1 - High
- **Label:** DevOps
- **Status:** Not started

#### Steps

- [ ] Configure `eas.json` with profiles: `development`, `preview`, `production`
- [ ] Configure app signing (iOS certificates + Android keystore) in EAS
- [ ] Production build: `eas build --platform all --profile production`
- [ ] Submit to TestFlight: `eas submit --platform ios`
- [ ] Submit to Play Console (Internal Testing): `eas submit --platform android`
- [ ] Invite 10-15 external testers (Friends & Family)

#### Senior Learning 🎓

Week 11 - Cloud: The app-signing process is equivalent to HTTPS: it guarantees the store build was created by you and has not been modified.

---

#### 📚 Extras — From Zero to Hero

- Cloud and CI/CD (Week 11): EAS Build is specialized CI/CD for mobile. Connect it to the broader concepts: each profile (`development`/`preview`/`production`) is an environment with its own configuration, just like staging/production on the web.
- Docker (Week 11): EAS runs the build in a Docker container with the exact environment (Node version, Expo version, and so on). Understand why that guarantees reproducible builds: on your machine or in EAS, the result is the same.
- Engineering Management (Week 15): The DORA metric `Lead Time for Changes` is measured from the first commit until the user has the change on their device. With automated EAS Submit, that can drop from days to hours.
- STAR stories (Week 16): Configuring TestFlight + Play Console for the first time always comes with problems (provisioning profiles, permissions, metadata). Document the blockers and how you solved them - it becomes an excellent STAR story about overcoming technical obstacles.

#### [7.4] Task: Analytics with PostHog (key events)

- **Priority:** P2 - Medium
- **Label:** DevOps
- **Status:** Not started

#### Steps

- [ ] Create a project in PostHog (cloud, free plan)
- [ ] Install `posthog-react-native`
- [ ] Define the event taxonomy (document in Notion)
- [ ] Track events: `onboarding_completed`, `activity_started`, `activity_completed`, `zone_conquered`, `reward_redeemed`
- [ ] Create a funnel: sign-up -> onboarding -> first activity
- [ ] Create a dashboard: `DAU/WAU`, activities per day, coins earned

#### Senior Learning 🎓

Week 15 - DORA Metrics: Product analytics (PostHog) and engineering metrics (DORA) are the two dimensions an Engineering Manager tracks. Learn to interpret both.

---

#### 📚 Extras — From Zero to Hero

- Engineering Management - DORA (Week 15): Configure the 4 DORA metrics directly in PostHog: Deployment Frequency (deploy events), Lead Time (time between commit and deploy), Change Failure Rate (% of deploys with new Sentry errors), and MTTR (incident resolution time).
- Agile metrics - Burndown (Week 15): Connect PostHog with the Notion board: every task marked `Done` advances the burndown. `DAU/WAU` in PostHog is the KPI that tells you whether delivered work has real impact.
- System Design (Week 13): The sign-up -> first activity funnel is the activation rate. If only 20% of users reach their first activity, you have an onboarding problem. Design an A/B experiment to improve it.
- STAR stories (Week 16): Once you have real PostHog data, you get a perfect story: `I noticed that 60% of users dropped during onboarding, I implemented change X, and activation rate increased to 75%`. That is senior-level product thinking.
