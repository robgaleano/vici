# VICI

Gamified running app for conquering real-world territory. The core loop is: run, conquer zones, earn rewards.

## Documentation Map

`README.md`: quick entry point for getting the project running, understanding the stack, and locating the important docs.
[`docs/app-reference.md`](./docs/app-reference.md): living product and architecture spec (concept, mechanics, stack, data model, monetization, MVP scope).
[`roadmap.md`](./roadmap.md): high-level view of epics and priorities.
[`roadmap/`](./roadmap/): execution logs for each task.

## Current Stack

- Expo SDK 55
  Expo Router with file-based routing
- React Native 0.83.6
- React 19.2.0
  TypeScript 5.9 in strict mode
- pnpm 10.33.2
- ESLint 9 + Prettier + Husky + commitlint + czg

## Repo Structure

`apps/mobile/`: Expo app with Expo Router routes, layouts, and mobile-specific code
`packages/shared/`: shared TypeScript utilities and types across the monorepo
`packages/supabase/`: Supabase package for schema, migrations, and generated types
`docs/`: living product and architecture reference
`roadmap/`: epics and task execution logs

## Getting Started

1. `nvm use`
2. `corepack enable` if `pnpm` is not available on your machine
3. `pnpm install`
4. `pnpm mobile`

Useful shortcuts:

`pnpm mobile:ios`
`pnpm mobile:android`
`pnpm --filter @vici/mobile web`

## iOS / Expo Go Note

Real validation for this project on SDK 55 was done with Expo Go beta on iPhone.
During validation, the Expo Go version published on the App Store still targeted SDK 54, so it could show an incompatibility error even when the project was correctly configured.

## Quality

- `pnpm run lint`
- `pnpm run typecheck`
- `pnpm run format:check`

## Commits

`pnpm commit` opens the interactive `czg` flow.
`pnpm commit:retry` retries the previous interactive flow after fixing hook failures.
`pnpm commit:help` shows the CLI options.
`git commit -m "..."` still goes through `commitlint` and Husky hooks, but it does not open `czg`.
Expected format: `type(scope): short-description`.
The `scope` is optional: `type: short-description`.
Allowed types: `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, `test`.

## Roadmap

[Main roadmap](./roadmap.md)
[Task 1.1 · Initialize Expo project with strict TypeScript](./roadmap/01-setup-architecture/1.1-initialize-expo-project-with-strict-typescript.md)
[Task 1.2 · Configure navigation with Expo Router](./roadmap/01-setup-architecture/1.2-configure-navigation-with-expo-router.md)

## Functional Reference

- [App reference](./docs/app-reference.md)
