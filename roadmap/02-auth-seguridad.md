# [2] 🔐 EPIC: Auth & Seguridad

[Volver al índice](../roadmap.md)

## 🔐 Auth & Seguridad

- **Prioridad:** P0 - Crítica
- **Etiqueta:** Backend
- **Estado:** Sin empezar

#### Objetivo

Implementar autenticación robusta y privacidad de datos del usuario.

#### Definition of Done

- [ ] Login/registro con Google y Apple funcional
- [ ] Selección de equipo en onboarding
- [ ] RLS activo: ningún usuario puede leer datos de otro sin permiso
- [ ] La ruta exacta del usuario no es visible públicamente (solo el impacto en zonas)

#### [2.1] Task: Implementar Auth con Supabase (Google + Apple)

- **Prioridad:** P0 - Crítica
- **Etiqueta:** Mobile
- **Estado:** Sin empezar

#### Pasos

- [ ] Configurar OAuth de Google en Supabase Dashboard
- [ ] Configurar Sign In with Apple (requiere cuenta Apple Developer)
- [ ] Implementar useAuth hook con: signInWithGoogle(), signInWithApple(), signOut()
- [ ] Manejar el estado de sesión con supabase.auth.onAuthStateChange()
- [ ] Crear guards de navegación: redirigir a login si no hay sesión
- [ ] Implementar refresh token automático

#### Aprendizaje Senior 🎓

Semana 10 - APIs: Entiende el flujo completo de OAuth 2.0 + PKCE. ¿Qué es un JWT? ¿Cómo funciona el refresh token? ¿Por qué los tokens tienen expiración?

---

#### 📚 Extras — From Zero To Hero

- RESTful vs GraphQL (Sem 10): El endpoint de Auth de Supabase es REST puro. Estudia las cabeceras HTTP que maneja: Authorization: Bearer <jwt>, apikey. Conecta con el concepto de autenticación en APIs REST.
- TypeScript - Utility Types (Sem 1): El objeto User de Supabase tiene muchos campos. Practica Pick<User, 'id' | 'email'> para crear un tipo AppUser más limpio que uses en toda la app.
- Arquitectura Node.js (Sem 9): El patrón de onAuthStateChange() es un Observer/Event-driven. El SDK "emite" un evento cuando el token cambia y tu app "escucha". Identifica este patrón.
- Patrones de Renderizado (Sem 2): Los guards de navegación son Server-side en Next.js (middleware) y client-side en React Native (hook en layout). Compara ambos enfoques.

#### [2.2] Task: Flujo de Onboarding - Selección de Equipo

- **Prioridad:** P0 - Crítica
- **Etiqueta:** Frontend
- **Estado:** Sin empezar

#### Pasos

- [ ] Crear pantalla OnboardingTeamSelect con los 3 equipos animados
- [ ] Implementar animación de selección con react-native-reanimated
- [ ] Guardar team_id en tabla profiles en Supabase
- [ ] Marcar onboarding_completed: true en el perfil
- [ ] Redirigir al mapa principal al terminar onboarding

#### Aprendizaje Senior 🎓

Semana 8 - React Native: Usa Reanimated 3. Las animaciones con useSharedValue y withSpring corren en el UI thread nativo, no en JS, garantizando 60fps bajo carga.

---

#### 📚 Extras — From Zero To Hero

- React Native - Nueva Arquitectura (Sem 8): Reanimated 3 es el ejemplo más claro de por qué la nueva arquitectura importa. Las animaciones corren en el UI thread vía JSI sin pasar por el bridge. Entiende por qué esto elimina el "jank" (fotogramas perdidos).
- React y su evolución - Concurrent Features (Sem 5/6): useTransition de React 18 es el equivalente web de lo que Reanimated hace en nativo: marcar updates como no-urgentes para que la UI nunca se bloquee. Conecta ambos conceptos.
- TypeScript (Sem 1): Tipar los props del componente de selección de equipo. Define un tipo Team = 'red' | 'blue' | 'yellow' y úsalo como discriminated union en todo el proyecto.

#### [2.3] Task: Configurar Row Level Security (RLS) en Supabase

- **Prioridad:** P0 - Crítica
- **Etiqueta:** Backend
- **Estado:** Sin empezar

#### Pasos

- [ ] Política profiles: usuarios solo pueden UPDATE su propio perfil, SELECT público solo para username/avatar/team
- [ ] Política activities: usuario solo puede SELECT/INSERT/UPDATE sus propias actividades
- [ ] Política transactions: usuario solo puede SELECT sus propias transacciones. Solo el sistema puede INSERT
- [ ] Política zones: SELECT público, UPDATE solo via Edge Functions
- [ ] Escribir tests de RLS: intentar acceder a datos de otro usuario debe retornar vacío

#### Aprendizaje Senior 🎓

Semana 10 - Bases de Datos: RLS es una feature de PostgreSQL empresarial. Entiende la diferencia entre seguridad a nivel de aplicación vs seguridad a nivel de BD (defensa en profundidad).

---

#### 📚 Extras — From Zero To Hero

- SQL - PostgreSQL (Sem 10): RLS usa USING (auth.uid() = user_id) — una expresión SQL que PostgreSQL evalúa en cada fila antes de devolverla. Estudia cómo esto interactúa con los índices: ¿añade overhead? (spoiler: sí, pero es mínimo con índices correctos).
- System Design (Sem 13): La defensa en profundidad es un principio de seguridad por capas. RLS es capa 3 (BD), JWT validation es capa 2 (API), validación de inputs es capa 1 (cliente). Documenta tu modelo de amenazas.
- Arquitectura Node.js (Sem 9): Las Edge Functions que hacen UPDATE en zones son el único actor que "saltea" el RLS del cliente. Entiende por qué usar service_role key en el servidor y anon key en el cliente es crítico para la seguridad.
