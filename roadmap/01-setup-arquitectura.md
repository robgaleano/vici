# [1] 🏗️ EPIC: Setup & Arquitectura del Proyecto

[Volver al índice](../roadmap.md)

## 🏗️ Setup & Arquitectura

- **Prioridad:** P0 - Crítica
- **Etiqueta:** Mobile
- **Estado:** En progreso

#### Objetivo

Configurar desde cero la arquitectura del proyecto VICI de manera profesional, con las herramientas, convenciones y estructura que usaría un equipo senior en producción.

#### Definition of Done

- [ ] Repo en GitHub con branch strategy definida (main / develop / feature/\*)
- [ ] App corre en iOS Simulator y Android Emulator
- [ ] TypeScript en modo strict sin errores
- [ ] Pipeline de CI básico corriendo en cada PR

#### [1.1] Task: Inicializar proyecto Expo con TypeScript strict

- **Prioridad:** P0 - Crítica
- **Etiqueta:** Mobile
- **Estado:** Completada

#### Pasos

- [x] npx create-expo-app VICI --template expo-template-blank-typescript
- [x] Configurar tsconfig.json con strict: true
- [x] Instalar y configurar ESLint + Prettier con reglas de equipo
- [x] Instalar Husky + lint-staged para pre-commit hooks
- [x] Crear estructura de carpetas: src/screens, src/components, src/hooks, src/services, src/store, src/types, src/utils

#### Documentación de trabajo

- [Bitácora task 1.1](01-setup-arquitectura/1.1-inicializar-proyecto-expo-typescript-strict.md)

#### Aprendizaje Senior 🎓

Semana 1 - TypeScript Avanzado: Usa esta tarea para crear tus primeros tipos globales con Generics. Ej: type ApiResponse<T> = { data: T; error: string | null }. Practica Utility Types como Pick, Omit, Partial en los modelos de datos.

---

#### 📚 Extras — From Zero To Hero

- Event Loop & Garbage Collection: Entiende por qué TypeScript strict ayuda a evitar referencias colgantes. ¿Qué pasa en el Event Loop cuando el GPS dispara coords cada 3s mientras la UI re-renderiza?
- Utility Types: Crea desde el día 1 src/types/api.ts con ApiResponse<T>, PaginatedResult<T>, Nullable<T>. Úsalos en todos los servicios del proyecto.
- Generics: Define type ApiResponse<T> = { data: T; error: string | null } y úsalo en cada llamada a Supabase.
- Type Guards: Implementa isUser(obj): obj is User para validar respuestas del servidor antes de usarlas.

#### [1.2] Task: Configurar navegación con Expo Router

- **Prioridad:** P0 - Crítica
- **Etiqueta:** Mobile
- **Estado:** Sin empezar

#### Pasos

- [ ] Instalar Expo Router v3
- [ ] Crear estructura de rutas: (auth)/login, (tabs)/map, (tabs)/activity, (tabs)/profile, (tabs)/wallet
- [ ] Configurar layouts con \_layout.tsx
- [ ] Implementar splash screen y carga inicial

#### Aprendizaje Senior 🎓

Semana 8 - React Native: Expo Router utiliza la nueva arquitectura de React Native (Fabric). Investiga cómo el JSI reemplaza al Bridge antiguo y qué ventajas tiene para la app de mapas en tiempo real.

---

#### 📚 Extras — From Zero To Hero

- React Native - Nueva Arquitectura (Fabric + TurboModules): Expo Router v3 corre sobre la nueva arquitectura. Entiende la diferencia entre el Bridge antiguo (async, serialización JSON) y JSI (síncrono, acceso directo a memoria nativa).
- Patrones de Renderizado: El file-based routing de Expo Router es el mismo concepto que Next.js. Conecta cómo el layout anidado funciona igual en ambos ecosistemas.
- TypeScript: Tipar correctamente los params de cada ruta con useLocalSearchParams<{ id: string }>() para evitar errores de navegación en runtime.

#### [1.3] Task: Setup Supabase + esquema inicial de BD

- **Prioridad:** P0 - Crítica
- **Etiqueta:** Backend
- **Estado:** Sin empezar

#### Pasos

- [ ] Crear proyecto en Supabase
- [ ] Habilitar extensión postgis y h3 en SQL Editor
- [ ] Diseñar y ejecutar migrations iniciales:
- [ ] Configurar Row Level Security (RLS) en todas las tablas
- [ ] Generar y tipar el cliente Supabase con supabase gen types typescript

#### Aprendizaje Senior 🎓

Semana 10 - Bases de Datos: Este es el momento de entender las diferencias entre SQL vs NoSQL. ¿Por qué PostGIS sobre MongoDB para datos geoespaciales? Investiga índices espaciales (GiST) y cómo aceleran las queries de 'dame todas las zonas en radio X km'.

---

#### 📚 Extras — From Zero To Hero

- SQL vs NoSQL: Documenta por qué elegiste PostgreSQL + PostGIS sobre MongoDB. ¿Qué ofrece PostGIS que MongoDB Atlas Search no puede igualar para datos geoespaciales?
- RESTful vs GraphQL: Supabase expone una API REST auto-generada. Evalúa si en algún punto valdría usar la API de GraphQL de Supabase (over-fetching en zonas con muchos campos).
- Arquitectura Node.js: Estructura del proyecto backend en Supabase Edge Functions siguiendo principios de clean architecture: separar lógica de negocio de la capa de datos.
- TypeScript - Generics: El comando supabase gen types typescript genera tipos automáticamente. Estudia cómo esos tipos genéricos se integran con tu ApiResponse<T>.

#### [1.4] Task: Configurar Zustand para estado global

- **Prioridad:** P1 - Alta
- **Etiqueta:** Frontend
- **Estado:** Sin empezar

#### Pasos

- [ ] Instalar zustand y immer
- [ ] Crear useAuthStore: user, session, isLoading, login(), logout()
- [ ] Crear useGameStore: zonas cercanas, equipo propio, puntos
- [ ] Crear useActivityStore: estado de la sesión de running (activo/inactivo, coords, distancia)
- [ ] Implementar persist middleware para auth token

#### Aprendizaje Senior 🎓

Semana 1 - TypeScript: Tipar correctamente los stores de Zustand requiere dominar interface vs type, tipos de retorno de funciones y el patrón StateCreator<T>.

---

#### 📚 Extras — From Zero To Hero

- Arquitectura y Gestión de Estado (Sem 3): Aplica aquí el análisis de Context API vs Zustand vs Redux Toolkit. ¿Por qué Zustand para VICI y no Redux? Documenta el trade-off (boilerplate, DevTools, middleware).
- Patrón Flux y uni-directional data flow: Zustand sigue este patrón. El store es la única fuente de verdad, las acciones modifican el estado, los componentes reaccionan. Identifica este patrón mientras lo implementas.
- TypeScript - Generics: Usa StateCreator<AuthState> para tipar correctamente los slices. Practica interface vs type en la definición de cada store.
- Event Loop: El middleware persist de Zustand serializa a AsyncStorage de forma asíncrona. Entiende por qué esto no bloquea el hilo JS.

#### [1.5] Task: Setup CI/CD con GitHub Actions

- **Prioridad:** P1 - Alta
- **Etiqueta:** DevOps
- **Estado:** Sin empezar

#### Pasos

- [ ] Crear .github/workflows/ci.yml con jobs: lint, typecheck, test
- [ ] Configurar Expo EAS para builds en la nube
- [ ] Crear workflow de deploy a TestFlight / Play Console en merge a main
- [ ] Configurar secrets de GitHub para SUPABASE_URL, SUPABASE_ANON_KEY, MAPBOX_TOKEN

#### Aprendizaje Senior 🎓

Semana 11 - Cloud: Aunque usas EAS (no Docker aquí), entiende el concepto de pipeline de CI/CD. El backend de Supabase Edge Functions sí lo puedes containerizar localmente con supabase start.

---

#### 📚 Extras — From Zero To Hero

- Cloud y Contenedores (Sem 11): El CI/CD es el corazón de cualquier proyecto profesional. Entiende la diferencia entre CI (integración continua: lint + test en cada PR) y CD (despliegue continuo: build automático en merge a main).
- Docker: supabase start usa Docker internamente. Es tu primer contacto práctico con contenedores: mira el docker-compose.yml que genera Supabase CLI y entiende qué servicio hace qué.
- Fundamentos AWS/GCP: EAS Build corre en servidores cloud. Entiende qué es un runner de CI, qué es un artefacto de build y por qué los secrets nunca van en el código.
- Engineering Management (Sem 15) - Métricas DORA: El pipeline de CI/CD es lo que mide la métrica "Deployment Frequency" de DORA. Desde el día 1 estás construyendo la base para medirla.
