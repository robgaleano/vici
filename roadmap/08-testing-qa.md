# [8] 🧪 EPIC: Testing & QA

[Volver al índice](../roadmap.md)

## 🧪 Testing & QA

- **Prioridad:** P1 - Alta
- **Etiqueta:** Mobile
- **Estado:** Sin empezar

#### Objetivo

Asegurar la calidad del MVP con una estrategia de testing pragmática para equipo pequeño.

#### Definition of Done

- [ ] Cobertura >70% en utilidades críticas (H3, algoritmos de puntos)
- [ ] Tests de integración para todas las Edge Functions
- [ ] Test E2E del flujo: login -> actividad -> puntos ganados

#### [8.1] Task: Unit tests para utilidades geoespaciales y algoritmos

- **Prioridad:** P1 - Alta
- **Etiqueta:** Mobile
- **Estado:** Sin empezar

#### Pasos

- [ ] Configurar Jest con ts-jest para TypeScript
- [ ] Tests para geoToZone(lat, lng): verificar que coordenadas conocidas producen H3 correcto
- [ ] Tests para calculateDistance(route): comparar con distancias conocidas (Haversine)
- [ ] Tests para validateActivity(activity): casos de fraude deben ser rechazados
- [ ] Tests para calculatePoints(distance, powerUp): verificar multiplicadores
- [ ] Configurar coverage report y umbral mínimo del 70% para CI

#### Aprendizaje Senior 🎓

Semana 1 - TypeScript: Los tipos de TypeScript NO reemplazan los tests. Un tipo number no te dice si la distancia calculada es correcta. Tests + tipos juntos es la combinación ganadora.

---

#### 📚 Extras — From Zero To Hero

- Testing Modernas (Sem 7): Aplica aquí el Testing Trophy de Kent C. Dodds: más tests de integración que unitarios, más unitarios que E2E. Para las utilidades geoespaciales, los unit tests son perfectos (funciones puras, sin efectos secundarios).
- TypeScript (Sem 1): Practica tipar los mocks de Jest: jest.fn<ReturnType, Parameters>(). Entiende por qué TypeScript + Jest juntos te dan confianza total en los tests — si el tipo cambia, el test deja de compilar.
- Algoritmos (Sem 14): Usa los tests para verificar la complejidad algorítmica en la práctica: escribe un test que pase una ruta de 10k puntos y mide el tiempo. Si tarda >100ms, hay un problema de O(n²) que resolver.
- TDD: Para las funciones de validación de fraude, practica TDD real: primero escribe it('should reject activity with avg speed > 25 km/h'), vélo fallar en rojo, luego implementa hasta verde. Documenta la experiencia.

#### [8.2] Task: Integration tests para Edge Functions

- **Prioridad:** P1 - Alta
- **Etiqueta:** Backend
- **Estado:** Sin empezar

#### Pasos

- [ ] Configurar entorno de test con supabase start en local
- [ ] Test process-activity: actividad válida debe actualizar zonas y wallet
- [ ] Test process-activity: actividad fraudulenta (>25km/h) debe ser rechazada
- [ ] Test redeem-reward: saldo insuficiente debe retornar error
- [ ] Test redeem-reward: canje exitoso debe descontar saldo atómicamente
- [ ] Test RLS: llamada sin autenticación debe retornar 401

#### Aprendizaje Senior 🎓

Semana 9 - Node.js: La buena práctica es que la lógica de negocio esté en 'services' separados y testeables. Los tests no deberían necesitar levantar la BD para testear la lógica.

---

#### 📚 Extras — From Zero To Hero

- Testing Modernas (Sem 7): Los integration tests de Edge Functions son el nivel más valioso del Testing Trophy para VICI. Prueban el contrato completo: HTTP request → lógica → BD → HTTP response. Más valor que 100 unit tests aislados.
- Arquitectura Node.js (Sem 9): Refactoriza las Edge Functions para separar: handler (HTTP) → service (lógica de negocio) → repository (BD). Los tests de integración testean el handler, los unit tests testean el service.
- Docker (Sem 11): supabase start levanta un entorno Docker local idéntico a producción. Es el mismo concepto que tener un docker-compose.test.yml en proyectos web. Entiende cómo el CI corre estos mismos tests en el pipeline.
- Bases de Datos (Sem 10): El test de ACID de redeem-reward es el más crítico: simula un error a mitad de la transacción y verifica que el saldo no quedó en un estado inconsistente. Esto es lo que diferencia a un senior que entiende las BDs de uno que no.

#### [8.3] Task: ADR - Architecture Decision Records

- **Prioridad:** P2 - Media
- **Etiqueta:** System Design
- **Estado:** Sin empezar

#### Pasos

- [ ] Crear carpeta docs/adr/ en el repo
- [ ] ADR-001: Por qué Expo en lugar de React Native CLI
- [ ] ADR-002: Por qué Supabase en lugar de Firebase
- [ ] ADR-003: Por qué H3 en lugar de cuadrícula propia para zonas
- [ ] ADR-004: Por qué validar actividades en Edge Function en lugar de cliente
- [ ] ADR-005: Por qué cursor-based pagination en lugar de offset
- [ ] Formato: Contexto, Decisión, Consecuencias, Alternativas consideradas

#### Aprendizaje Senior 🎓

Semana 16 - Historias STAR: Cada ADR es una historia STAR lista para una entrevista. "Cuéntame de una decisión técnica difícil" = lee tu ADR.

---

#### 📚 Extras — From Zero To Hero

- System Design (Sem 13): Los ADRs son el artefacto que demuestra pensamiento de System Design. Cada ADR sigue la estructura de una pregunta de entrevista: contexto del problema, opciones consideradas, decisión tomada, consecuencias. Es literalmente entrenar System Design mientras desarrollas.
- Engineering Management (Sem 15): En equipos senior, los ADRs reemplazan las reuniones largas de decisiones técnicas. Se escriben como propuesta, el equipo comenta en el PR, y se mergea cuando hay consenso. Practica este flujo aunque seas solo tú.
- Historias STAR (Sem 16): Prepara estas 5 historias basadas en los ADRs:
- Soft Skills (Sem 15): Usar el modelo de feedback SBI al escribir ADRs: Situación (contexto), Behavior (qué hace cada opción), Impact (consecuencias). Es el mismo framework aplicado a documentación técnica.

#### [8.4] Task: Historial de actividades con mapa estático de la ruta

- **Prioridad:** P2 - Media
- **Etiqueta:** Mobile
- **Estado:** Sin empezar

#### Pasos

- [ ] Guardar route como JSONB en tabla activities al completar
- [ ] Pantalla HistoryScreen con lista de actividades (FlatList con paginación)
- [ ] Preview de ruta usando Mapbox Static Images API (URL con polyline encoded)
- [ ] Detail screen con mapa interactivo de la ruta al pulsar
- [ ] Stats: distancia total, tiempo total, zonas conquistadas all-time

#### Aprendizaje Senior 🎓

Semana 2 - Patrones de Renderizado: FlatList es el Virtual Scrolling del móvil. Si usaras ScrollView con 1000 items, la app se congela. Este es el patrón de performance más importante en mobile.

---

#### 📚 Extras — From Zero To Hero

- Patrones de Renderizado (Sem 2): La Mapbox Static Images API devuelve una imagen PNG desde una URL. Esto es SSG (Static Site Generation) aplicado a mapas: la imagen se genera una vez y se cachea. Compara con renderizar el mapa dinámico (CSR): cuándo usas cada uno.
- Web Performance (Sem 4): Lazy loading de imágenes en la lista de actividades: cada preview del mapa solo se carga cuando el item entra en el viewport (onViewableItemsChanged en FlatList). Conecta con el concepto de loading="lazy" en web.
- React Native (Sem 8): Optimiza FlatList con getItemLayout (si todos los items tienen la misma altura), keyExtractor, removeClippedSubviews={true} y maxToRenderPerBatch. Mide con el profiler antes y después.
- TypeScript (Sem 1): El campo route es JSONB en PostgreSQL. Define un tipo RoutePoint = { lat: number; lng: number; timestamp: number } y type Route = RoutePoint[]. Practica tipado de estructuras anidadas y cómo Supabase genera el tipo automáticamente.
