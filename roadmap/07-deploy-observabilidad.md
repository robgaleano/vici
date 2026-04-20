# [7] 🚀 EPIC: Deploy & Observabilidad

[Volver al índice](../roadmap.md)

## 🚀 Deploy & Observabilidad

- **Prioridad:** P1 - Alta
- **Etiqueta:** DevOps
- **Estado:** Sin empezar

#### Objetivo

Garantizar que el producto llega a usuarios de manera fiable y que podemos medir y mejorar continuamente.

#### Definition of Done

- [ ] App publicada en TestFlight y Play Console (Beta cerrada)
- [ ] Errores reportados automáticamente a Sentry
- [ ] Analytics básicos con PostHog
- [ ] Dashboard de métricas DORA del equipo

#### [7.1] Task: Dockerizar el entorno de desarrollo local

- **Prioridad:** P1 - Alta
- **Etiqueta:** DevOps
- **Estado:** Sin empezar

#### Pasos

- [ ] Crear docker-compose.yml para entorno de desarrollo
- [ ] Servicios: supabase (PostgreSQL + API + Auth + Storage), pgadmin
- [ ] Script ./scripts/setup.sh que inicializa el entorno y corre migrations
- [ ] Documentar en README: prerequisites, setup en 5 minutos
- [ ] Configurar variables de entorno con .env.example

#### Aprendizaje Senior 🎓

Semana 11 - Docker: Aprende los conceptos: imagen vs contenedor, volumes (para persistir la BD entre reinicios), networks (para que los servicios se comuniquen), y por qué docker-compose es diferente a correr contenedores sueltos.

---

#### 📚 Extras — From Zero To Hero

- Docker - Fundamentos (Sem 11): Este docker-compose es tu primer proyecto real con Docker. Entiende: imagen (plantilla) vs contenedor (instancia), volume (datos persistentes fuera del contenedor), network (comunicación entre servicios). Dibuja el diagrama de los servicios.
- Containerizar app Node/React (Sem 11): Las Edge Functions de Supabase son Deno/Node. Entiende cómo supabase start las containeriza localmente y cómo difiere del despliegue en producción (serverless vs contenedor persistente).
- Bases AWS/GCP (Sem 11): Supabase cloud corre en AWS. Cuando usas supabase start localmente, estás replicando exactamente lo que corre en AWS. Entiende qué servicios de AWS usa Supabase bajo el capó (RDS, S3, EC2).
- Engineering Management (Sem 15): Un buen README con setup en 5 minutos es una métrica de calidad del equipo. El "Time to First Contribution" (cuánto tarda un dev nuevo en hacer su primer cambio) es un KPI real en empresas senior.

#### [7.2] Task: Integrar Sentry para error tracking

- **Prioridad:** P1 - Alta
- **Etiqueta:** DevOps
- **Estado:** Sin empezar

#### Pasos

- [ ] Crear proyecto en Sentry (plan gratuito)
- [ ] Instalar y configurar @sentry/react-native con Expo
- [ ] Configurar Sentry.init() en el entry point de la app
- [ ] Implementar Error Boundary global con Sentry.ErrorBoundary
- [ ] Configurar Source Maps para ver el stack trace correcto
- [ ] Crear alertas para errores nuevos que afecten a >1% de usuarios

#### Aprendizaje Senior 🎓

Semana 15 - Engineering Management: Los Source Maps son críticos. Sin ellos, el error trace muestra 'bundle.js:1:45832' en lugar de tu código real. Conecta con el concepto de builds reproducibles.

---

#### 📚 Extras — From Zero To Hero

- Cloud y Contenedores (Sem 11): Los Source Maps son artefactos de build. Entiende cómo el pipeline de CI/CD los sube a Sentry automáticamente durante el build. Sin CI/CD correcto, los Source Maps nunca coinciden con producción.
- React - Error Boundaries (Sem 5/6): Sentry.ErrorBoundary usa la API de Error Boundaries de React. Estudia cómo funcionan internamente: capturan errores en el árbol de componentes hijo, igual que un try/catch pero para renders.
- Engineering Management - DORA (Sem 15): La métrica DORA "Change Failure Rate" se mide con Sentry: cuántos deploys introducen errores nuevos. Con Sentry y CI/CD configurados, puedes calcular este KPI automáticamente.
- Soft Skills (Sem 15/16): Cuando presentes VICI en una entrevista, el hecho de que configuraste Sentry desde el día 1 y puedes hablar de "Change Failure Rate" es exactamente la historia STAR de "¿cómo garantizas la calidad en producción?"

#### [7.3] Task: Beta release en TestFlight + Play Console

- **Prioridad:** P1 - Alta
- **Etiqueta:** DevOps
- **Estado:** Sin empezar

#### Pasos

- [ ] Configurar eas.json con profiles: development, preview, production
- [ ] Configurar firma de la app (certificates iOS + keystore Android) en EAS
- [ ] Build de producción: eas build --platform all --profile production
- [ ] Submit a TestFlight: eas submit --platform ios
- [ ] Submit a Play Console (Internal Testing): eas submit --platform android
- [ ] Invitar 10-15 testers externos (Friends & Family)

#### Aprendizaje Senior 🎓

Semana 11 - Cloud: El proceso de firma de apps es equivalente a HTTPS: garantiza que la app en la store fue creada por ti y no ha sido modificada.

---

#### 📚 Extras — From Zero To Hero

- Cloud y CI/CD (Sem 11): EAS Build es CI/CD especializado para mobile. Conecta con los conceptos generales: cada profile (development/preview/production) es un "environment" con su propia configuración. Exactamente como staging/production en web.
- Docker (Sem 11): EAS corre el build en un contenedor Docker con el entorno exacto (versión de Node, Expo, etc.). Entiende por qué esto garantiza builds reproducibles: en tu máquina o en EAS, el resultado es idéntico.
- Engineering Management (Sem 15): La métrica DORA "Lead Time for Changes" se mide desde el primer commit hasta que el usuario lo tiene en su dispositivo. Con EAS Submit automatizado, este tiempo puede bajar de días a horas.
- Historias STAR (Sem 16): El proceso de configurar TestFlight + Play Console por primera vez siempre tiene problemas (provisioning profiles, permisos, metadata). Documenta los obstáculos y cómo los resolviste — es una historia STAR perfecta de "superar bloqueos técnicos".

#### [7.4] Task: Analytics con PostHog (eventos clave)

- **Prioridad:** P2 - Media
- **Etiqueta:** DevOps
- **Estado:** Sin empezar

#### Pasos

- [ ] Crear proyecto en PostHog (cloud, plan gratuito)
- [ ] Instalar posthog-react-native
- [ ] Definir taxonomía de eventos (documento en Notion)
- [ ] Trackear eventos: onboarding_completed, activity_started, activity_completed, zone_conquered, reward_redeemed
- [ ] Crear Funnel: registro → onboarding → primera actividad
- [ ] Crear Dashboard: DAU/WAU, actividades por día, monedas ganadas

#### Aprendizaje Senior 🎓

Semana 15 - Métricas DORA: Los analytics de producto (PostHog) y las métricas de ingeniería (DORA) son las dos dimensiones que un Engineering Manager mide. Aprende a interpretar ambas.

---

#### 📚 Extras — From Zero To Hero

- Engineering Management - DORA (Sem 15): Configura las 4 métricas DORA directamente en PostHog: Deployment Frequency (eventos de deploy), Lead Time (tiempo entre commit y deploy), Change Failure Rate (% deploys con errores nuevos en Sentry), MTTR (tiempo de resolución de incidentes).
- Métricas ágiles - Burndown (Sem 15): Conecta PostHog con el board de Notion: cada tarea "Done" avanza el burndown. El DAU/WAU de PostHog es el KPI que valida si el trabajo entregado tiene impacto real.
- System Design (Sem 13): El funnel registro → primera actividad es el "activation rate". Si solo el 20% llega a la primera actividad, hay un problema de onboarding. Diseña un experimento A/B para mejorarlo.
- Historias STAR (Sem 16): Cuando tengas datos de PostHog reales, tendrás la historia perfecta: "Detecté que el 60% abandonaba en el onboarding, implementé X cambio, y el activation rate subió a 75%". Esto es pensamiento de producto senior.
