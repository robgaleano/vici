# [3] 🗺️ EPIC: Mapas & Geolocalización

[Volver al índice](../roadmap.md)

## 🗺️ Mapas & Geolocalización

- **Prioridad:** P0 - Crítica
- **Etiqueta:** Mobile
- **Estado:** Sin empezar

#### Objetivo

Mostrar el mapa de juego en tiempo real, con hexágonos coloreados por equipo y tracking GPS del runner.

#### Definition of Done

- [ ] Mapa carga en <2s con hexágonos coloreados
- [ ] GPS funciona con pantalla apagada
- [ ] Batería no cae más del 15% por hora de uso
- [ ] Zonas se actualizan en tiempo real (Supabase Realtime)

#### [3.1] Task: Integrar Mapbox SDK con estilos de juego

- **Prioridad:** P0 - Crítica
- **Etiqueta:** Mobile
- **Estado:** Sin empezar

#### Pasos

- [ ] Instalar @rnmapbox/maps y configurar token
- [ ] Crear componente <GameMap /> con estilo visual oscuro/gaming
- [ ] Implementar capa GeoJSON para renderizar hexágonos H3 coloreados por equipo
- [ ] Añadir capa de usuario (punto animado con su color de equipo)
- [ ] Implementar clustering de zonas lejanas para mejorar performance

#### Aprendizaje Senior 🎓

Semana 4 - Web Performance: El renderizado de 1000+ hexágonos es equivalente a renderizar una lista enorme. Estudia cómo Mapbox usa WebGL y por qué es más eficiente que SVG.

---

#### 📚 Extras — From Zero To Hero

- Web Performance - Core Web Vitals (Sem 4): Aplica los principios de performance al mapa. Lazy loading de capas: carga solo los hexágonos del viewport visible (equivalente al LCP en web). Mide el tiempo de primera carga del mapa.
- Code Splitting (Sem 4): El SDK de Mapbox es pesado. Considera importarlo dinámicamente para no bloquearlo en el bundle inicial. En React Native se hace con React.lazy + Suspense.
- React Native - Nueva Arquitectura (Sem 8): Mapbox usa módulos nativos directamente via JSI (TurboModules). Es un ejemplo real de por qué la nueva arquitectura mejora el rendimiento del mapa en tiempo real.
- Patrones de Renderizado (Sem 2): El mapa nunca debería re-renderizar cuando el HUD cambia. Aplica React.memo en <GameMap /> y entiende cómo el reconciliador de React decide qué re-renderizar.

#### [3.2] Task: Implementar tracking GPS en background

- **Prioridad:** P0 - Crítica
- **Etiqueta:** Mobile
- **Estado:** Sin empezar

#### Pasos

- [ ] Instalar expo-location y configurar permisos en app.json
- [ ] Registrar Background Location Task con expo-task-manager
- [ ] Implementar hook useGpsTracking() con estados: IDLE, TRACKING, PAUSED
- [ ] Ajustar timeInterval: 3000 y distanceInterval: 10 para balance batería/precisión
- [ ] Almacenar coordenadas en memoria durante la sesión (array de coords)
- [ ] Implementar lógica de pausa automática si velocidad < 0.5 m/s durante 30s

#### Aprendizaje Senior 🎓

Semana 8 - React Native: El Background Task es uno de los casos donde TurboModules marca diferencia real. expo-task-manager usa el hilo nativo para no bloquear el thread de JS.

---

#### 📚 Extras — From Zero To Hero

- React Native - Nueva Arquitectura (Sem 8): Las background tasks en iOS y Android son APIs nativas completamente distintas. TurboModules abstrae esa diferencia. Estudia cómo expo-task-manager registra la tarea en cada plataforma de forma diferente internamente.
- Event Loop & Garbage Collection (Sem 1): El array de coordenadas crece durante toda la carrera. Entiende cuándo el Garbage Collector lo limpiará y por qué debes limpiar la tarea registrada en el useEffect cleanup para evitar memory leaks.
- Web Performance (Sem 4): El balance timeInterval vs distanceInterval es un problema de performance real: más muestras = más precisión pero más batería y memoria. Documenta los números que eliges y por qué.
- Testing Modernas (Sem 7): Este hook es candidato perfecto para un test de integración con un mock del GPS. Practica cómo mockear expo-location en Jest para simular una ruta.

#### [3.3] Task: Integrar librería H3 de Uber para hexágonos

- **Prioridad:** P0 - Crítica
- **Etiqueta:** Mobile
- **Estado:** Sin empezar

#### Pasos

- [ ] Instalar h3-js
- [ ] Crear utilidad geoToZone(lat, lng): string que retorna el índice H3
- [ ] Crear utilidad getNeighboringZones(h3Index, rings): string[] para buscar zonas cercanas
- [ ] Crear utilidad h3ToGeoJSON(h3Index): Feature para renderizar en Mapbox
- [ ] Definir resolución global: Resolución 9 (~0.1 km², ideal para running)
- [ ] Escribir tests unitarios para las utilidades geoespaciales

#### Aprendizaje Senior 🎓

Semana 14 - Algoritmos: H3 usa una estructura de datos geoespacial sofisticada. ¿Por qué H3 es O(1) para lookup y los árboles R-Tree son O(log n)? Pregunta clásica de entrevistas senior.

---

#### 📚 Extras — From Zero To Hero

- Algoritmos y Estructuras de Datos (Sem 14): El índice H3 es un hash geoespacial. Estudia la diferencia con un árbol R-Tree. Para getNeighboringZones: ¿cuántas zonas devuelve con rings=1? ¿Con rings=2? Calcula la complejidad.
- TypeScript - Generics (Sem 1): Las utilidades deben estar perfectamente tipadas. h3ToGeoJSON devuelve un tipo GeoJSON.Feature<GeoJSON.Polygon>. Practica tipos complejos anidados.
- Testing Modernas (Sem 7): Las funciones puras son las más fáciles de testear. geoToZone(40.4168, -3.7038) debe devolver siempre el mismo índice H3. Escribe el test primero (TDD) y luego la implementación.
- System Design (Sem 13): La elección de resolución 9 es una decisión de diseño con impacto en BD (número de filas), performance (queries) y UX (tamaño visual). Documenta este trade-off en un ADR.

#### [3.4] Task: Implementar carga de zonas en tiempo real con Supabase Realtime

- **Prioridad:** P1 - Alta
- **Etiqueta:** Backend
- **Estado:** Sin empezar

#### Pasos

- [ ] Crear hook useNearbyZones(userH3Index) que carga zonas en radio 2km
- [ ] Suscribirse a cambios en tabla zones con filtro por h3_index en la lista de cercanas
- [ ] Implementar debounce de 500ms en updates del mapa para evitar re-renders excesivos
- [ ] Manejar desconexión/reconexión de WebSocket gracefully

#### Aprendizaje Senior 🎓

Semana 10 - Diseño de APIs: ¿REST polling, WebSockets o Server-Sent Events? Documenta tu decisión y sus trade-offs. Las entrevistas senior preguntan exactamente esto.

---

#### 📚 Extras — From Zero To Hero

- RESTful vs GraphQL (Sem 10): Esta tarea es el caso más claro de por qué WebSockets > REST polling para tiempo real. Calcula: con 1000 usuarios activos, REST polling cada 5s = 200 req/s. WebSocket = 1000 conexiones persistentes. ¿Cuál escala mejor?
- System Design (Sem 13): El patrón de "suscribirse solo a zonas cercanas" es un ejemplo de fan-out on read vs fan-out on write. Dibuja el diagrama de cómo escalarías esto a 100k usuarios.
- Web Performance (Sem 4): El debounce de 500ms es una técnica de performance clásica. Conecta con el concepto de requestAnimationFrame y por qué actualizar el mapa más de 60 veces por segundo es inútil.
- React - Concurrent Features (Sem 5): useTransition de React 18 es ideal aquí: marcar la actualización del mapa como "no urgente" para que el HUD del runner nunca se congele.

#### [3.5] Task: Implementar anti-cheat de velocidad

- **Prioridad:** P1 - Alta
- **Etiqueta:** Backend
- **Estado:** Sin empezar

#### Pasos

- [ ] Crear Supabase Edge Function validate-activity
- [ ] Calcular velocidad media: total_distance / total_time
- [ ] Calcular velocidad máxima punto a punto en la ruta
- [ ] Rechazar si: avg_speed > 25 km/h O max_speed > 50 km/h
- [ ] Rechazar si: ratio (paradas / tiempo total) < 0.05
- [ ] Loggear intentos de trampa en tabla fraud_attempts

#### Aprendizaje Senior 🎓

Semana 13 - System Design: El anti-cheat es un sistema distribuido clásico. ¿Dónde pones la validación: cliente, API Gateway o BD? Cada capa tiene trade-offs. La Edge Function es el balance correcto aquí.

---

#### 📚 Extras — From Zero To Hero

- Arquitectura Node.js (Sem 9): La Edge Function de validación sigue el patrón de middleware pipeline: recibe la actividad, la pasa por validadores en cadena (velocidad → acelerómetro → paradas) y solo si todas pasan, la procesa. Implementa este patrón explícitamente.
- Algoritmos (Sem 14): El cálculo de velocidad máxima punto a punto requiere iterar el array de coordenadas con la fórmula de Haversine entre cada par. Complejidad O(n). Optimiza descartando puntos con distanceInterval mínimo.
- System Design (Sem 13): Diseña en papel el sistema completo de anti-fraude: ¿cómo detectarías a alguien que hace trampa lentamente a lo largo de semanas? Piensa en anomaly detection a nivel estadístico.
- Testing (Sem 7): Los casos de fraude son perfectos para tests parametrizados. Define una tabla de casos: [{speed: 30, expected: 'rejected'}, {speed: 10, expected: 'approved'}] y ejecuta todos con test.each.
