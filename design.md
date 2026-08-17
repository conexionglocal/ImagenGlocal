# Diseño y arquitectura de Conexión Glocal

## Propósito

Este documento describe el diseño visual, la arquitectura técnica y el estado funcional real del sitio de Conexión Glocal. Debe mantenerse alineado con el código desplegado y actualizarse cuando cambien la identidad, los flujos de conversión o las integraciones.

Estado documentado: `main` en el commit `6f24452c6dfa5a3e3f76d90d59a47a4b64286eba`.

## Principios de producto

1. Comunicar una agencia capaz de conectar estrategia global con ejecución local.
2. Priorizar conversión mediante diagnóstico de marca, asesoría y contacto.
3. Mantener una experiencia bilingüe en español e inglés.
4. Usar movimiento y profundidad sin perjudicar legibilidad, accesibilidad o rendimiento.
5. No presentar como funcional una automatización que todavía sea una demostración.

## Arquitectura actual

El sitio es una aplicación Next.js con App Router y una sola ruta pública.

- Framework: Next.js 15 y React 18.
- Lenguaje: TypeScript.
- Estilos: Tailwind CSS, variables CSS y componentes inspirados en shadcn/ui.
- Movimiento: Framer Motion.
- Iconografía: Lucide React.
- Tema: `next-themes`, con modos claro, oscuro y preferencia del sistema.
- Idiomas: contexto de React con traducciones locales y persistencia en `localStorage`.
- Hosting: Netlify.
- Renderizado actual: página principal prerenderizada como contenido estático.

### Composición de la página

El archivo `src/app/page.tsx` ensambla la experiencia en este orden:

1. Barra de progreso de desplazamiento.
2. Encabezado fijo.
3. Hero principal.
4. Diagnóstico de ADN de marca.
5. Propuesta de marca.
6. Servicios principales.
7. Indicadores de impacto.
8. Mensaje de innovación.
9. Planes comerciales.
10. Servicios adicionales.
11. Testimonios y casos de éxito.
12. Contacto.
13. Newsletter y footer.

## Sistema visual

### Personalidad

La dirección visual es moderna, tecnológica y optimista. Combina superficies limpias, tarjetas elevadas, efectos de cristal, gradientes morado-magenta y animaciones suaves.

### Color

Los colores se definen como variables HSL en `src/app/globals.css`.

| Token | Valor actual | Uso principal |
|---|---:|---|
| `--primary` | `262 83% 58%` | Acciones, enlaces, estados activos |
| `--purple-primary` | `262 83% 58%` | Identidad principal |
| `--purple-secondary` | `298 76% 58%` | Gradientes y acentos |
| `--background` | `0 0% 100%` | Fondo claro |
| `--foreground` | `240 10% 3.9%` | Texto principal claro |
| `--radius` | `0.75rem` | Radio base de componentes |

El gradiente principal corre de morado a magenta a 135 grados. El tema oscuro redefine fondos, tarjetas, bordes y texto sin cambiar los colores principales de marca.

### Tipografía

- Familia principal: Poppins, cargada mediante `next/font/google`.
- Pesos: 300, 400, 500, 600 y 700.
- Montserrat está declarada como utilidad, pero no se carga actualmente.
- El `h1` utiliza una escala responsiva de 4xl a 6xl.
- Los títulos de sección utilizan una escala de 3xl a 5xl.

### Espaciado y layout

- Contenedor centrado con padding responsivo entre 1 y 6 rem.
- Secciones principales con separación vertical de 5 a 6 rem.
- Breakpoints de Tailwind: 640, 768, 1024, 1280 y 1536 px.
- Grillas: una columna en móvil, dos o tres en tablet y hasta cuatro en escritorio.
- Encabezado fijo de 64 px con fondo translúcido.

### Superficies y movimiento

- Tarjetas con fondos semitransparentes y elevación al pasar el cursor.
- Efecto `glass` con desenfoque de 10 px.
- Animaciones de entrada al entrar en viewport.
- Elementos flotantes y parallax en el hero.
- Barra fija de progreso de scroll.

Toda animación nueva debe respetar `prefers-reduced-motion`; el código actual todavía no implementa esta adaptación.

## Componentes y responsabilidades

| Componente | Responsabilidad | Estado actual |
|---|---|---|
| `Header` | Navegación, idioma, tema y menú móvil | Parcial: dos enlaces apuntan a IDs inexistentes |
| `HeroSection` | Propuesta de valor y CTAs principales | Funcional: desplaza a diagnóstico o contacto |
| `BrandDnaSection` | Captura URL y datos del lead | Demostración: simula análisis y éxito; no envía datos |
| `ServicesSection` | Presenta capacidades principales | Informativo |
| `StatsSection` | Presenta métricas y CTA de IA | Parcial: CTA sin acción |
| `InnovationSection` | Mensaje institucional y CTA | Parcial: CTA sin acción |
| `PlansSection` | Presenta tres planes | Parcial: botones sin acción |
| `AdditionalServicesSection` | Catálogo ampliado de servicios | Informativo; no incluye chatbot interactivo |
| `TestimonialsSection` | Testimonios y casos | Parcial: botones de caso sin acción; contenido debe validarse |
| `ContactSection` | Captura datos y abre WhatsApp | Parcial: abre WhatsApp, pero no envía correo ni guarda lead |
| `Footer` | Newsletter, navegación y redes | Parcial: newsletter y enlaces legales sin destino funcional |

## Idiomas

Las traducciones viven en `src/lib/translations.ts`. El idioma inicial es español y la preferencia se guarda en `localStorage`.

Limitación actual: cambiar el idioma solo sustituye el contenido en cliente. No actualiza dinámicamente `html[lang]`, canonical, metadatos, Open Graph ni una URL indexable para inglés. Una implementación completa debe usar rutas como `/es` y `/en`, metadatos por ruta y `hreflang` válido.

## Conversión y formularios

### Diagnóstico de ADN

El flujo actual valida tres campos en el navegador y reproduce una secuencia visual temporizada. No analiza la URL, no llama a una API, no guarda el lead y no envía el diagnóstico.

El estado de éxito no debe mostrarse hasta recibir confirmación del backend.

### Contacto

El formulario espera aproximadamente 1.5 segundos y construye un enlace de WhatsApp con los datos escritos. No existe endpoint, persistencia, correo transaccional ni protección antispam.

La interfaz afirma que los datos fueron enviados por correo, pero el código no realiza ese envío. El mensaje debe corregirse o la integración debe implementarse.

### Newsletter

El campo y el botón son únicamente visuales. No están dentro de un formulario y no tienen manejador, proveedor ni consentimiento registrado.

## Chatbot

### Estado actual

No hay un chatbot implementado en el sitio. “Servicio de Chatbot con IA Avanzada” es una tarjeta del catálogo de servicios, no un widget interactivo.

No existen actualmente:

- componente de chat;
- botón flotante o panel conversacional;
- ruta API o Netlify Function;
- proveedor de modelos;
- base de conocimiento;
- almacenamiento de conversaciones;
- variables de entorno del chatbot;
- dependencias de SDK de IA;
- iframe o script de un widget externo.

Por lo anterior, no hay una función de chatbot que pueda responder: todavía debe construirse o integrarse.

### Arquitectura recomendada

1. `ChatLauncher` accesible y visible en todas las vistas.
2. `ChatPanel` con historial, estados de carga, errores y transferencia a humano.
3. Endpoint servidor `/api/chat` o Netlify Function; nunca exponer claves en el navegador.
4. Modelo de IA con instrucciones de marca y herramientas limitadas.
5. Base de conocimiento versionada para servicios, paquetes, horarios, ubicaciones y políticas.
6. Persistencia con consentimiento y política de retención.
7. Integración con CRM o correo para leads calificados.
8. Analítica de aperturas, conversaciones, leads, resolución y abandono.
9. Límites de uso, moderación, protección antispam y registros sin datos sensibles innecesarios.
10. Pruebas de respuestas, accesibilidad, seguridad y degradación cuando el proveedor falle.

El chatbot debe indicar claramente que es un asistente automatizado y nunca confirmar precios, plazos o servicios fuera de la información autorizada.

## SEO y contenido

El sitio ya incluye título, descripción, canonical, Open Graph, Twitter Card y JSON-LD. Antes de considerarlo listo para producción deben corregirse estos puntos:

- crear las imágenes Open Graph declaradas;
- corregir el logo inexistente de los datos estructurados;
- crear `robots.txt` y `sitemap.xml`;
- reemplazar los códigos de verificación de ejemplo;
- corregir la URL inglesa ajena al dominio;
- usar el dominio canónico final, no el subdominio temporal de Netlify;
- validar que testimonios, clientes, métricas y casos publicados sean reales y autorizados;
- añadir páginas legales reales.

## Accesibilidad

Requisitos para cualquier cambio futuro:

- asociar cada `label` con su control mediante `htmlFor` e `id`;
- añadir nombre accesible al botón del menú móvil y a enlaces de redes sociales;
- conservar foco visible y orden lógico de teclado;
- usar enlaces para navegación y botones solo para acciones;
- respetar reducción de movimiento;
- anunciar estados de formulario con regiones `aria-live`;
- revisar contraste en gradientes y tema oscuro;
- mantener un único `h1` y jerarquía semántica coherente.

## Rendimiento

La compilación actual genera aproximadamente 187 kB de JavaScript inicial para la página principal. Las imágenes remotas están configuradas como no optimizadas y varias animaciones convierten casi todas las secciones en componentes de cliente.

Prioridades de optimización:

1. alojar y optimizar imágenes críticas;
2. usar tamaños responsivos y formatos modernos;
3. reducir componentes de cliente a los que realmente necesitan estado o animación;
4. cargar funciones no críticas de forma diferida;
5. reducir animaciones permanentes;
6. medir Core Web Vitals en producción y fijar presupuestos de rendimiento.

## Seguridad y privacidad

- Mantener secretos exclusivamente en el servidor y en variables de entorno de Netlify.
- Validar y limitar toda entrada en servidor.
- Añadir protección CSRF cuando aplique, rate limiting y control antispam.
- No registrar conversaciones o formularios sin política de privacidad y consentimiento.
- Revisar dependencias regularmente y automatizar alertas.
- Añadir encabezados de seguridad, al menos CSP, `X-Content-Type-Options`, `Referrer-Policy` y `Permissions-Policy`.

## Criterios de terminado

Una función se considera terminada solo si:

1. tiene comportamiento real, no temporizadores de demostración;
2. maneja carga, éxito y error usando la respuesta real del servidor;
3. cuenta con accesibilidad por teclado y lector de pantalla;
4. tiene pruebas o una verificación reproducible;
5. no expone secretos ni datos personales;
6. tiene analítica y mensajes coherentes con lo que realmente ocurrió;
7. está documentada aquí.

## Próxima iteración recomendada

1. Corregir mensajes engañosos y CTAs sin acción.
2. Implementar captura real de leads y newsletter.
3. Reparar SEO técnico, recursos 404 y rutas bilingües.
4. Añadir CI para typecheck, lint, build y auditoría de dependencias.
5. Implementar el chatbot en una rama separada, comenzando por un MVP de atención y calificación de leads.
