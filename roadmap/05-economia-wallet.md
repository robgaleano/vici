# [5] 💰 EPIC: Economía & Wallet

[Volver al índice](../roadmap.md)

## 💰 Economía & Wallet

- **Prioridad:** P1 - Alta
- **Etiqueta:** Backend
- **Estado:** Sin empezar

#### Objetivo

Crear el sistema de recompensas que convierte el esfuerzo físico en valor tangible.

#### Definition of Done

- [ ] Usuario ve su saldo de FunCoins
- [ ] Saldo aumenta al completar actividades
- [ ] Energy cap diario limita las monedas ganables
- [ ] Marketplace con cupones canjeables

#### [5.1] Task: Sistema de Wallet y transacciones ACID

- **Prioridad:** P0 - Crítica
- **Etiqueta:** Backend
- **Estado:** Sin empezar

#### Pasos

- [ ] Crear tabla wallets (user_id PK, balance, daily_earned, daily_reset_at)
- [ ] Crear tabla transactions (id, user_id, amount, type [EARN|SPEND], description, created_at)
- [ ] Crear PostgreSQL Function credit_wallet(user_id, amount, description) con transacción atómica
- [ ] Implementar energy cap: si daily_earned >= 100, rechazar nuevos créditos
- [ ] Cron job medianoche para resetear daily_earned = 0
- [ ] Edge Function expuesta para que process-activity la llame

#### Aprendizaje Senior 🎓

Semana 10 - Bases de Datos: Caso clásico de ACID. Sin transacción, puedes crear monedas de la nada (o perderlas). Investiga también Optimistic Locking para el race condition de dos actividades terminando simultáneamente.

---

#### 📚 Extras — From Zero To Hero

- SQL - PostgreSQL (Sem 10): Esta función es tu primer contacto real con transacciones ACID en producción. Entiende los 4 niveles de aislamiento: READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, SERIALIZABLE. ¿Cuál usarías aquí y por qué?
- System Design (Sem 13): El race condition de dos actividades terminando a la vez es un problema de concurrencia clásico. Diseña la solución con Optimistic Locking (version column) o con SELECT FOR UPDATE. Documenta la decisión.
- Arquitectura Node.js (Sem 9): La función credit_wallet sigue el patrón de Command: una operación con nombre que encapsula toda la lógica de negocio de acreditar monedas. Fácil de testear, fácil de auditar.
- Algoritmos (Sem 14): El energy cap es un problema de sliding window: ¿cuánto has ganado en las últimas 24h? Piensa cómo implementarías esto con una ventana deslizante en lugar de un reset a medianoche (más justo para usuarios en distintas zonas horarias).

#### [5.2] Task: Pantalla de Wallet e historial de transacciones

- **Prioridad:** P1 - Alta
- **Etiqueta:** Frontend
- **Estado:** Sin empezar

#### Pasos

- [ ] Pantalla WalletScreen con saldo grande y animado
- [ ] Barra de progreso: daily_earned / 100 FunCoins
- [ ] Lista de transacciones con paginación (cursor-based, 20 items)
- [ ] Animación de lluvia de monedas al recibir FunCoins (Lottie)
- [ ] Indicador de tiempo hasta reset del energy cap

#### Aprendizaje Senior 🎓

Semana 4 - Performance: La paginación cursor-based es más eficiente que offset-based. OFFSET 1000 requiere leer 1000 filas para descartarlas. Con cursor (WHERE created_at < last_cursor), usa el índice directamente.

---

#### 📚 Extras — From Zero To Hero

- Web Performance (Sem 4): Implementa la lista de transacciones con FlatList + paginación cursor-based. Mide el tiempo de carga de la primera página vs la décima. La diferencia entre cursor y offset se hace evidente aquí.
- React Native (Sem 8): FlatList usa virtualización: solo renderiza los items visibles. Conecta esto con el concepto de Virtual DOM en React web. ¿Qué pasaría con ScrollView y 500 transacciones?
- React - Concurrent Features (Sem 5/6): Usa Suspense para mostrar un skeleton loader mientras cargan las transacciones. Es el patrón moderno de loading states en React.
- TypeScript (Sem 1): Define el tipo de la respuesta paginada: type CursorPage<T> = { data: T[]; nextCursor: string | null; hasMore: boolean }. Practica Generics reales.

#### [5.3] Task: Marketplace de cupones (MVP ficticio)

- **Prioridad:** P2 - Media
- **Etiqueta:** Frontend
- **Estado:** Sin empezar

#### Pasos

- [ ] Crear tabla rewards (id, title, description, cost_coins, image_url, stock, type)
- [ ] Sembrar 5-10 recompensas ficticias
- [ ] Pantalla MarketplaceScreen con grid de recompensas
- [ ] Edge Function redeem-reward: verifica saldo, descuenta y genera código de cupón
- [ ] Pantalla de 'Mis Cupones' con códigos canjeados

#### Aprendizaje Senior 🎓

Semana 9 - Node.js: El flujo de canjear cupón es un ejemplo del patrón Saga: verificar saldo → reservar → descontar → emitir cupón. Si falla el paso 3, debes compensar el paso 2.

---

#### 📚 Extras — From Zero To Hero

- Arquitectura Node.js (Sem 9): El patrón Saga es fundamental en microservicios. Aunque aquí esté en una sola función, practica pensar en pasos compensatorios: si emitir_cupon falla, ¿cómo haces rollback del descuento? Usa transacciones PostgreSQL.
- System Design (Sem 13): El campo stock en rewards introduce un problema de concurrencia: ¿qué pasa si 100 usuarios intentan canjear el último cupón a la vez? Diseña la solución con SELECT ... FOR UPDATE SKIP LOCKED.
- React Native (Sem 8): El grid de recompensas es un caso de FlatList con numColumns={2}. Optimiza con getItemLayout para que el scroll sea instantáneo sin calcular alturas dinámicamente.
- RESTful vs GraphQL (Sem 10): El endpoint redeem-reward es un buen ejemplo de por qué no todo es un CRUD REST. Es una acción con lógica de negocio, no un simple UPDATE. Compara cómo lo modelarías en GraphQL (mutation) vs REST (POST /rewards/{id}/redeem).
