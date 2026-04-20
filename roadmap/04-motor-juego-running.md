# [4] 🎮 EPIC: Motor de Juego & Running

[Volver al índice](../roadmap.md)

## 🎮 Motor de Juego

- **Prioridad:** P0 - Crítica
- **Etiqueta:** Mobile
- **Estado:** Sin empezar

#### Objetivo

Implementar la mecánica completa de running con impacto en el mapa de juego.

#### Definition of Done

- [ ] Usuario puede iniciar/pausar/terminar una actividad
- [ ] Cada km corrido impacta las zonas H3 que cruzó
- [ ] El mapa cambia de color al conquistar zonas
- [ ] Power-ups aparecen en el mapa y se pueden recoger corriendo

#### [4.1] Task: Pantalla de actividad en tiempo real (HUD del runner)

- **Prioridad:** P0 - Crítica
- **Etiqueta:** Mobile
- **Estado:** Sin empezar

#### Pasos

- [ ] Crear pantalla ActivityScreen con HUD superpuesto al mapa
- [ ] Botón flotante: Iniciar / Pausar / Terminar actividad
- [ ] Mostrar en tiempo real: distancia (km), tiempo transcurrido, ritmo (min/km), zonas conquistadas
- [ ] Animación de "zona conquistada" cuando el hexágono cambia de color
- [ ] Optimizar renders: los datos del HUD cambian cada segundo, no deben re-renderizar el mapa

#### Aprendizaje Senior 🎓

Semana 4 - Performance: Aplica React.memo, useMemo y useCallback. La distinción entre el mapa (caro) y el HUD (barato) es un caso real de component splitting. Mide con React DevTools Profiler.

---

#### 📚 Extras — From Zero To Hero

- Web Performance (Sem 4): Mide el render del HUD con React DevTools Profiler antes y después de aplicar React.memo. Documenta la mejora. Esto es exactamente lo que te preguntarán en entrevistas: "¿cómo detectaste y resolviste un problema de performance?".
- React y su evolución (Sem 5/6): useMemo y useCallback son herramientas de React. Entiende cuándo NO usarlos (tienen coste de memorización). La regla: solo cuando el profiler demuestra un problema real.
- React Native - Nueva Arquitectura (Sem 8): Las animaciones de "zona conquistada" deben correr en el UI thread con Reanimated. Si las animas en el JS thread, el HUD se congela mientras el usuario está corriendo.
- TypeScript (Sem 1): El estado de la actividad es una máquina de estados finita: 'IDLE' | 'TRACKING' | 'PAUSED' | 'FINISHED'. Usa un discriminated union para que TypeScript te fuerce a manejar todos los casos.

#### [4.2] Task: Algoritmo de cálculo de puntos por zona

- **Prioridad:** P0 - Crítica
- **Etiqueta:** Backend
- **Estado:** Sin empezar

#### Pasos

- [ ] Crear Edge Function process-activity
- [ ] Input: { user_id, route: LatLng[], distance_m, duration_s }
- [ ] Convertir cada punto de la ruta a índice H3 (resolución 9) y deduplicar
- [ ] Por cada zona única recorrida: UPDATE zones SET team_points[team_id] = team_points[team_id] + points_earned
- [ ] Si team_points[my_team] > team_points[enemy_team] => cambiar owner_team_id
- [ ] Calcular puntos ganados: base_points \* (1 + power_up_multiplier)
- [ ] Retornar resumen: zonas_conquistadas, puntos_ganados, monedas_ganadas

#### Aprendizaje Senior 🎓

Semana 14 - Algoritmos: El paso de deduplicar H3 indices es un problema clásico de HashSet. Complejidad O(n) vs O(n²) con array. Exactamente el tipo de optimización que preguntan en LeetCode Medium.

---

#### 📚 Extras — From Zero To Hero

- Algoritmos y Estructuras de Datos (Sem 14): new Set(h3Indices) para deduplicar es O(n). Explica en un comentario del código por qué no usas Array.filter con indexOf (O(n²)). Este razonamiento es lo que diferencia un mid de un senior en entrevistas.
- Arquitectura Node.js (Sem 9): Esta Edge Function es el "core domain" de VICI. Aplica principios SOLID: la función principal orquesta, las subfunciones tienen responsabilidad única (calculatePoints, updateZone, creditWallet).
- Bases de Datos (Sem 10): El UPDATE de zones dentro de un loop puede generar N queries. Optimiza con un UPDATE ... FROM unnest($1) AS h3_list para hacerlo en una sola query. Esto es pensamiento senior de BD.
- Testing (Sem 7): Esta es la función más crítica del proyecto. Necesita tests exhaustivos: ruta de 1 zona, ruta de 100 zonas, zona ya del mismo equipo, zona enemiga con más puntos. Usa describe + it para organizarlos.

#### [4.3] Task: Sistema de Power-ups geolocalizados

- **Prioridad:** P1 - Alta
- **Etiqueta:** Backend
- **Estado:** Sin empezar

#### Pasos

- [ ] Crear tabla power_ups (id, h3_index, type, multiplier, expires_at, claimed_by, claimed_at)
- [ ] Crear Supabase Cron Job que genera 3-5 power-ups aleatorios cada 6h
- [ ] Mostrar power-ups en el mapa como iconos animados (Lottie)
- [ ] En process-activity: detectar si algún H3 recorrido tiene power-up activo
- [ ] Aplicar multiplicador y marcar power-up como reclamado
- [ ] Push notification al pasar cerca de un power-up no reclamado

#### Aprendizaje Senior 🎓

Semana 13 - System Design: Los Cron Jobs son funciones serverless con scheduling. Investiga el problema de "at-least-once delivery": ¿qué pasa si el cron se ejecuta dos veces? Necesitas idempotencia.

---

#### 📚 Extras — From Zero To Hero

- System Design (Sem 13): La idempotencia del cron es un concepto crítico en sistemas distribuidos. Implementa un ON CONFLICT DO NOTHING en el INSERT de power-ups para garantizar que ejecutar el cron dos veces no genera duplicados.
- Arquitectura Node.js (Sem 9): Los background jobs (cron) son procesos sin usuario esperando. Necesitan: logging detallado, manejo de errores con reintentos, y alertas si fallan. Implementa todo esto desde el inicio.
- Algoritmos (Sem 14): Detectar si el H3 del runner coincide con un power-up activo es una búsqueda en un Set. Si tienes 50 power-ups activos, powerUpSet.has(h3Index) es O(1). No uses Array.find (O(n)).
- React Native (Sem 8): Los iconos de power-ups con Lottie son animaciones JSON que corren de forma nativa. Entiende la diferencia entre animar con CSS/JS (web) vs Lottie (nativo) en términos de rendimiento.

#### [4.4] Task: Sistema de NPCs / Bots para zonas sin actividad

- **Prioridad:** P2 - Media
- **Etiqueta:** Backend
- **Estado:** Sin empezar

#### Pasos

- [ ] Cron job diario: buscar zonas con last_activity > 72h
- [ ] Reducir puntos de la zona en un 20% (degradación por inactividad)
- [ ] Si puntos < umbral mínimo: zona vuelve a ser neutral
- [ ] Crear bot 'La Pereza' que ataca zonas neutrales para motivar a los usuarios
- [ ] Notificación push: 'Tu zona en Malasaña está siendo atacada por La Pereza'

#### Aprendizaje Senior 🎓

Semana 9 - Node.js: Arquitectura de procesos background vs foreground. ¿Cómo manejas errores en un job que nadie está mirando? Necesitas logging, alertas y reintentos.

---

#### 📚 Extras — From Zero To Hero

- Arquitectura Node.js (Sem 9): Implementa este cron con el patrón de retry exponential backoff: si falla, reintenta en 1min, luego 2min, luego 4min. Esto evita que un fallo puntual de BD deje las zonas sin degradar.
- Bases de Datos (Sem 10): La query de "zonas con last_activity > 72h" necesita un índice en last_activity. Sin índice, PostgreSQL hace un full table scan. Con millones de zonas, esto es crítico. Añade el índice en la migration.
- System Design (Sem 13): El bot "La Pereza" es un actor del sistema. Diseña su comportamiento como una máquina de estados: selecciona zona neutral → calcula ataque → aplica puntos → notifica usuarios cercanos. ¿Qué pasa si hay 10k zonas neutrales?
- Engineering Management (Sem 15): Los background jobs fallidos son silenciosos y peligrosos. Configura alertas en Sentry o PostHog para detectar cuando este job no se ejecuta en más de 25h.
