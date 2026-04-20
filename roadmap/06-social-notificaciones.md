# [6] 👥 EPIC: Social & Notificaciones

[Volver al índice](../roadmap.md)

## 👥 Social & Notificaciones

- **Prioridad:** P1 - Alta
- **Etiqueta:** Frontend
- **Estado:** Sin empezar

#### Objetivo

Hacer que el juego se sienta vivo y competitivo.

#### Definition of Done

- [ ] Leaderboard global y por ciudad funcionando
- [ ] Notificaciones push para ataques y retos
- [ ] Sistema de retos con seguimiento de progreso
- [ ] Perfil público con historial de actividades

#### [6.1] Task: Leaderboards (global + local)

- **Prioridad:** P1 - Alta
- **Etiqueta:** Backend
- **Estado:** Sin empezar

#### Pasos

- [ ] Crear SQL View weekly_leaderboard con ranking por puntos de la semana
- [ ] Crear SQL View team_leaderboard con puntos totales por equipo
- [ ] Pantalla LeaderboardScreen con tabs: Global / Mi Ciudad / Mi Equipo
- [ ] Resaltar la posición del usuario actual
- [ ] Paginación cursor-based para el top 100

#### Aprendizaje Senior 🎓

Semana 13 - System Design: El clásico problema de escalabilidad. Con 100 usuarios, SELECT con ORDER BY funciona. Con 1M usuarios, necesitas Redis Sorted Sets (O(log n) para insertar y obtener ranking).

---

#### 📚 Extras — From Zero To Hero

- System Design (Sem 13): Diseña la evolución del leaderboard en 3 fases: 1) SQL View (MVP), 2) Materialized View con refresh periódico (10k usuarios), 3) Redis Sorted Sets (1M usuarios). Documenta cuándo harías cada salto.
- Algoritmos (Sem 14): Un ORDER BY points DESC LIMIT 100 es O(n log n) sin índice. Con un índice B-tree en points, se convierte en O(100). Añade el índice y mide la diferencia con EXPLAIN ANALYZE.
- Bases de Datos (Sem 10): Las SQL Views son consultas almacenadas. Las Materialized Views son consultas almacenadas con resultado cacheado. ¿Cuándo usarías cada una para el leaderboard de VICI?
- React Native (Sem 8): Los tabs del leaderboard (Global / Ciudad / Equipo) son un caso de lazy loading de secciones. No cargues los 3 tabs a la vez: usa React.lazy o carga bajo demanda al cambiar de tab.

#### [6.2] Task: Push Notifications con Expo

- **Prioridad:** P1 - Alta
- **Etiqueta:** Mobile
- **Estado:** Sin empezar

#### Pasos

- [ ] Configurar expo-notifications y solicitar permiso
- [ ] Guardar expo_push_token en tabla profiles
- [ ] Crear helper sendPushNotification(userId, title, body, data)
- [ ] Implementar notificación 'Tu zona está siendo atacada' desde process-activity
- [ ] Implementar notificación 'Reto completado'
- [ ] Manejar notificaciones en foreground con banner personalizado

#### Aprendizaje Senior 🎓

Semana 13 - System Design: Las push notifications son "fire and forget". ¿Cómo diseñarías un sistema que garantice entrega? (hint: cola de mensajes + ACK + reintentos).

---

#### 📚 Extras — From Zero To Hero

- System Design (Sem 13): El helper sendPushNotification es el inicio de un sistema de notificaciones. Diseña cómo escalaría: con 10k usuarios recibiendo notificaciones simultáneas, ¿cómo evitas saturar la API de Expo? Investiga rate limiting y colas (BullMQ, pg_boss).
- Arquitectura Node.js (Sem 9): El patrón Observer/Event-driven es ideal para notificaciones. En lugar de llamar sendPushNotification directamente desde process-activity, emite un evento zone.conquered y un listener separado envía la notificación. Más desacoplado y testeable.
- React Native (Sem 8): Las notificaciones en foreground (app abierta) vs background (app cerrada) tienen comportamiento distinto en iOS y Android. Documenta las diferencias y cómo Expo Notifications las abstrae.
- Engineering Management (Sem 15): Las notificaciones push son el KPI de retención más directo. Mide en PostHog cuántas notificaciones llevan al usuario de vuelta a la app (open rate). Es una métrica DORA de producto.

#### [6.3] Task: Sistema de retos y misiones

- **Prioridad:** P2 - Media
- **Etiqueta:** Backend
- **Estado:** Sin empezar

#### Pasos

- [ ] Crear tabla challenges (id, title, description, type, target_value, reward_coins, expires_at)
- [ ] Crear tabla user_challenges (user_id, challenge_id, current_value, completed, completed_at)
- [ ] Sembrar retos: '5km en una sesión', 'Conquistar 5 zonas hoy', 'Correr 3 días seguidos'
- [ ] En process-activity: evaluar y actualizar progreso de retos activos del usuario
- [ ] Pantalla de retos con barra de progreso por cada uno
- [ ] Notificación y animación al completar un reto

#### Aprendizaje Senior 🎓

Semana 9 - Node.js: Patrón Observer/Event-driven. En lugar de que process-activity sepa de todos los retos, podría emitir un evento activity.completed y los retos "escucharían".

---

#### 📚 Extras — From Zero To Hero

- Arquitectura Node.js (Sem 9): Implementa el sistema de retos con el patrón Strategy: cada tipo de reto (distance, zones, streak) tiene su propia clase/función evaluadora. process-activity no sabe qué retos existen, solo llama a evaluateChallenges(activity).
- Bases de Datos (Sem 10): El reto "Correr 3 días seguidos" requiere una query compleja: buscar actividades de los últimos 3 días distintos. Practica GROUP BY DATE(created_at) y HAVING COUNT(DISTINCT date) >= 3.
- React Native (Sem 8): Las barras de progreso son un caso perfecto para Reanimated: animar el progreso de 0 a current/target con withTiming en el UI thread.
- Testing (Sem 7): Los evaluadores de retos son funciones puras: dado un historial de actividades, ¿el reto está completado? Perfectos para TDD: escribe primero el test del caso "reto completado" y luego la implementación.
