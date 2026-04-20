# vici

Running to conquer a new territory.

## Stack base

- Expo 54
- React Native 0.81
- TypeScript 5.9 en modo strict

## Puesta en marcha

1. `nvm use`
2. `npm install`
3. `npm run start`

## Calidad

- `npm run lint`
- `npm run typecheck`
- `npm run format:check`

## Commits

- Si ejecutas `git commit` sin `-m`, Husky abre `czg` de forma interactiva.
- El flujo alternativo es `npm run commit`, que abre el mismo asistente de `czg`.
- Si necesitas volver a intentar el ultimo commit interactivo tras arreglar un fallo de hooks, usa `npm run commit:retry`.
- Para ver opciones del CLI interactivo, usa `npm run commit:help`.
- Se mantiene enforcement con Husky + commitlint en el hook `commit-msg`.
- Si haces `git commit -m "..."`, no se abre el prompt y `commitlint` valida el mensaje igualmente.
- Formato esperado: `type(scope): descripcion-corta`.
- El `scope` es opcional: `type: descripcion-corta`.
- Tipos permitidos: `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, `test`.

## Roadmap

- [Roadmap principal](roadmap.md)
- [Task 1.1 · Inicializar proyecto Expo con TypeScript strict](roadmap/01-setup-arquitectura/1.1-inicializar-proyecto-expo-typescript-strict.md)
