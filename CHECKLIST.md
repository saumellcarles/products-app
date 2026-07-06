# Checklist de requisitos — Front-End Test (ITX)

Fuente: `TechOps - Front End Test.pdf`. Se marca ✅ al implementar y verificar cada punto.

## Requisitos funcionales

- [x] PLP: listado de todos los productos devueltos por la API
- [x] PLP: filtrado por texto (Marca + Modelo) en tiempo real
- [x] PLP: click en producto navega a su detalle
- [x] PLP: máximo 4 items por fila, adaptativo por resolución
- [x] PDP: layout 2 columnas (imagen / detalles+acciones)
- [x] PDP: link de vuelta al listado
- [x] Header: título/icono enlaza a vista principal
- [x] Header: breadcrumbs con página actual + navegación
- [x] Header: contador de items del carrito, visible en todas las vistas
- [x] Item de lista: imagen, marca, modelo, precio
- [x] Descripción producto: marca, modelo, precio, CPU, RAM, SO, resolución pantalla, batería, cámaras, dimensiones, peso
- [x] Selector de almacenamiento (con opción única preseleccionada)
- [x] Selector de color (con opción única preseleccionada)
- [x] Botón "Añadir" -> POST /api/cart con id, colorCode, storageCode
- [x] Respuesta de añadir (count) actualiza contador del header
- [x] Contador de carrito persistente entre recargas/navegación

## Requisitos técnicos

- [x] React (última estable) + Vite, sin TypeScript
- [x] JS ES6+ moderno
- [x] React Router (SPA, enrutado cliente, sin SSR/MPA)
- [x] Fetch API para llamadas HTTP
- [x] Context API para estado global (carrito)
- [x] SCSS Modules exclusivamente, `@use` (nunca `@import`)
- [x] ESLint Flat Config
- [x] Scripts: start, build, test, lint (vía pnpm)
- [x] Sin librerías innecesarias (justificar cada dependencia)

## Arquitectura

- [x] Feature-Based Architecture (`app/`, `features/`, `shared/`)
- [x] Cada feature autocontenida con `index.js` (barrel export) como API pública
- [x] Capas separadas: presentación / lógica / servicios / persistencia / utils / constantes
- [x] UI nunca llama a `fetch` directamente -> siempre vía capa de servicios
- [x] Persistencia siempre vía capa de storage

## Componentes

- [x] Layout / PageContainer
- [x] Header
- [x] Breadcrumb
- [x] SearchBar
- [x] ProductGrid
- [x] ProductCard
- [x] Button (reutilizable)
- [x] Select (reutilizable)
- [x] Loading
- [x] ErrorState
- [x] EmptyState
- [x] ProductImage
- [x] ProductDescription
- [x] ProductActions (selectores + add to cart)
- [x] ImageWithFallback (mejora técnica añadida: fallback de imagen reutilizado en ProductCard y ProductImage)

## Vistas

- [x] ProductListPage (PLP)
- [x] ProductDetailsPage (PDP)

## Endpoints (https://itx-frontend-test.onrender.com)

- [x] GET /api/product
- [x] GET /api/product/:id
- [x] POST /api/cart (body: id, colorCode, storageCode -> response: count)

## Integraciones

- [x] products.service.js centraliza GET listado + detalle
- [x] cart.service.js centraliza POST carrito

## Persistencia

- [x] Contador de carrito persistido en cliente (localStorage)
- [x] Storage service genérico (get/set/remove) desacoplado de cache

## Sistema de caché

- [x] cache.service.js reutilizable para cualquier endpoint
- [x] Entrada = { data, timestamp, ttl }
- [x] TTL de 1 hora
- [x] Expiración -> revalidación automática -> refresco de caché
- [x] Aplicado a listado y detalle de producto

## Responsive

- [x] Desktop / Tablet / Mobile
- [x] Grid máx. 4 columnas, adaptativo
- [x] Breakpoints centralizados en SCSS (`_breakpoints.scss` + mixins)

## Scripts

- [x] `pnpm dev` / `pnpm start` — modo desarrollo
- [x] `pnpm build` — build producción
- [x] `pnpm test` — tests
- [x] `pnpm lint` — lint

## README

- [x] Descripción
- [x] Arquitectura
- [x] Tecnologías + justificación
- [x] Instalación
- [x] Scripts
- [x] Estructura del proyecto
- [x] Decisiones técnicas
- [x] Gestión de caché
- [x] Mejoras futuras
- [x] Cómo ejecutar

## Casos límite (edge cases)

- [x] Listado vacío (Empty State)
- [x] Error de red / API caída (Error State) en listado y detalle
- [x] Búsqueda sin resultados
- [x] Loading state en listado, detalle y al añadir al carrito
- [x] Producto con una única opción de color/almacenamiento (preseleccionada, selector visible igualmente)
- [x] Producto con id inexistente en la PDP
- [x] Doble click / click repetido en "Añadir" (evitar múltiples peticiones simultáneas)
- [x] Cache expirada exactamente en el límite de 1h
- [x] Recarga de página conservando contador de carrito
- [x] Imágenes de producto rotas/ausentes (fallback)

---

## Validación final

| Requisito | Estado |
|---|---|
| Vista principal (PLP) con listado de la API | ✅ Cumplido |
| Filtrado en tiempo real por Marca/Modelo | ✅ Cumplido |
| Navegación PLP → PDP | ✅ Cumplido |
| Grid responsive, máximo 4 por fila | ✅ Cumplido |
| PDP con layout de 2 columnas (imagen / detalles+acciones) | ✅ Cumplido |
| Link de vuelta al listado en PDP | ✅ Cumplido |
| Header con enlace a inicio, breadcrumbs y contador de cesta | ✅ Cumplido |
| Ficha de producto con todos los atributos requeridos | ✅ Cumplido |
| Selectores de color/almacenamiento con opción única preseleccionada | ✅ Cumplido |
| Añadir a cesta vía POST /api/cart con id/colorCode/storageCode | ✅ Cumplido |
| Contador de cesta actualizado desde la respuesta de la API | ✅ Cumplido |
| Persistencia del contador de cesta en cliente | ✅ Cumplido |
| React/Vite sin TypeScript | ✅ Cumplido |
| React Router (SPA, sin SSR/MPA) | ✅ Cumplido |
| Context API (sin Redux/MobX) | ✅ Cumplido |
| SCSS Modules con `@use` (sin `@import`) | ✅ Cumplido |
| ESLint Flat Config | ✅ Cumplido |
| Scripts start/build/test/lint | ✅ Cumplido |
| Arquitectura feature-based con capas separadas | ✅ Cumplido |
| Capa de servicios centralizando toda la comunicación con la API | ✅ Cumplido |
| Capa de caché reutilizable con TTL de 1h y revalidación automática | ✅ Cumplido |
| Responsive Desktop/Tablet/Mobile | ✅ Cumplido |
| Estados Loading/Error/Empty/Success gestionados | ✅ Cumplido |
| Accesibilidad básica (labels, teclado, ARIA, contraste) | ✅ Cumplido |
| README profesional completo | ✅ Cumplido |
| Historial de commits incremental (Conventional Commits) | ✅ Cumplido |
| Tests de servicios y utilidades (Vitest) | ✅ Cumplido |

**Resultado: 100% de los requisitos del documento implementados.**
