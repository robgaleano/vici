# VICI

App de running gamificada para conquistar territorio real. El loop base es: correr, conquistar zonas, ganar recompensas.

## Mapa de documentacion

- `README.md`: entrada rapida para levantar el proyecto, conocer el stack y ubicar la documentacion importante.
- [`docs/app-reference.md`](./docs/app-reference.md): spec viva de producto y arquitectura (concepto, mecanicas, stack, modelo de datos, monetizacion, alcance MVP).
- [`roadmap.md`](./roadmap.md): vista general de epicas y prioridades.
- [`roadmap/`](./roadmap/): bitacoras de ejecucion por task.

## Stack actual

- Expo SDK 55
- Expo Router con file-based routing
- React Native 0.83.6
- React 19.2.0
- TypeScript 5.9 en modo strict
- pnpm 10.33.2
- ESLint 9 + Prettier + Husky + commitlint + czg

## Estructura del repo

- `app/`: rutas y layouts de Expo Router
- `lib/`: codigo compartido reutilizable (`types/`, `utils/`)
- `docs/`: referencia viva del producto y arquitectura
- `roadmap/`: epicas y bitacoras de ejecucion

## Puesta en marcha

1. `nvm use`
2. `corepack enable` si `pnpm` no esta disponible en tu maquina
3. `pnpm install`
4. `pnpm start`

Atajos utiles:

- `pnpm ios`
- `pnpm android`
- `pnpm web`

## Nota iOS / Expo Go

- La validacion real de este proyecto con SDK 55 se hizo usando Expo Go beta en iPhone.
- Durante la validacion, la version de Expo Go publicada en App Store seguia soportando SDK 54, asi que podia mostrar error de incompatibilidad aunque el proyecto estuviera correcto.

## Calidad

- `pnpm run lint`
- `pnpm run typecheck`
- `pnpm run format:check`

## Commits

- `pnpm commit` abre el flujo interactivo de `czg`.
- `pnpm commit:retry` reintenta el ultimo flujo interactivo tras arreglar fallos de hooks.
- `pnpm commit:help` muestra las opciones del CLI.
- `git commit -m "..."` sigue pasando por `commitlint` y por los hooks de Husky, pero no abre `czg`.
- Formato esperado: `type(scope): descripcion-corta`.
- El `scope` es opcional: `type: descripcion-corta`.
- Tipos permitidos: `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, `test`.

## Roadmap

- [Roadmap principal](./roadmap.md)
- [Task 1.1 · Inicializar proyecto Expo con TypeScript strict](./roadmap/01-setup-arquitectura/1.1-inicializar-proyecto-expo-typescript-strict.md)
- [Task 1.2 · Configurar navegacion con Expo Router](./roadmap/01-setup-arquitectura/1.2-configurar-navegacion-expo-router.md)

## Referencia funcional

- [App reference](./docs/app-reference.md)
