# Checklist de requisitos — Front-End Test (ITX)

Fuente: `TechOps - Front End Test.pdf`. Se marca ✅ al implementar y verificar cada punto.

## Requisitos funcionales

- [ ] PLP: listado de todos los productos devueltos por la API
- [ ] PLP: filtrado por texto (Marca + Modelo) en tiempo real
- [ ] PLP: click en producto navega a su detalle
- [ ] PLP: máximo 4 items por fila, adaptativo por resolución
- [ ] PDP: layout 2 columnas (imagen / detalles+acciones)
- [ ] PDP: link de vuelta al listado
- [ ] Header: título/icono enlaza a vista principal
- [ ] Header: breadcrumbs con página actual + navegación
- [ ] Header: contador de items del carrito, visible en todas las vistas
- [ ] Item de lista: imagen, marca, modelo, precio
- [ ] Descripción producto: marca, modelo, precio, CPU, RAM, SO, resolución pantalla, batería, cámaras, dimensiones, peso
- [ ] Selector de almacenamiento (con opción única preseleccionada)
- [ ] Selector de color (con opción única preseleccionada)
- [ ] Botón "Añadir" -> POST /api/cart con id, colorCode, storageCode
- [ ] Respuesta de añadir (count) actualiza contador del header
- [ ] Contador de carrito persistente entre recargas/navegación

## Requisitos técnicos

- [ ] React (última estable) + Vite, sin TypeScript
- [ ] JS ES6+ moderno
- [ ] React Router (SPA, enrutado cliente, sin SSR/MPA)
- [ ] Fetch API para llamadas HTTP
- [ ] Context API para estado global (carrito)
- [ ] SCSS Modules exclusivamente, `@use` (nunca `@import`)
- [ ] ESLint Flat Config
- [ ] Scripts: start, build, test, lint
- [ ] Sin librerías innecesarias (justificar cada dependencia)

## Arquitectura

- [ ] Feature-Based Architecture (`app/`, `features/`, `shared/`)
- [ ] Cada feature autocontenida con `index.js` (barrel export) como API pública
- [ ] Capas separadas: presentación / lógica / servicios / persistencia / utils / constantes
- [ ] UI nunca llama a `fetch` directamente -> siempre vía capa de servicios
- [ ] Persistencia siempre vía capa de storage

## Componentes

- [ ] Layout / PageContainer
- [ ] Header
- [ ] Breadcrumb
- [ ] SearchBar
- [ ] ProductGrid
- [ ] ProductCard
- [ ] Button (reutilizable)
- [ ] Select (reutilizable)
- [ ] Loading
- [ ] ErrorState
- [ ] EmptyState
- [ ] ProductImage
- [ ] ProductDescription
- [ ] ProductActions (selectores + add to cart)

## Vistas

- [ ] ProductListPage (PLP)
- [ ] ProductDetailsPage (PDP)

## Endpoints (https://itx-frontend-test.onrender.com)

- [ ] GET /api/product
- [ ] GET /api/product/:id
- [ ] POST /api/cart (body: id, colorCode, storageCode -> response: count)

## Integraciones

- [ ] products.service.js centraliza GET listado + detalle
- [ ] cart.service.js centraliza POST carrito

## Persistencia

- [ ] Contador de carrito persistido en cliente (localStorage)
- [ ] Storage service genérico (get/set/remove) desacoplado de cache

## Sistema de caché

- [ ] cache.service.js reutilizable para cualquier endpoint
- [ ] Entrada = { data, timestamp, ttl }
- [ ] TTL de 1 hora
- [ ] Expiración -> revalidación automática -> refresco de caché
- [ ] Aplicado a listado y detalle de producto

## Responsive

- [ ] Desktop / Tablet / Mobile
- [ ] Grid máx. 4 columnas, adaptativo
- [ ] Breakpoints centralizados en SCSS (`_breakpoints.scss` + mixins)

## Scripts

- [ ] `npm run dev` / start — modo desarrollo
- [ ] `npm run build` — build producción
- [ ] `npm run test` — tests
- [ ] `npm run lint` — lint

## README

- [ ] Descripción
- [ ] Arquitectura
- [ ] Tecnologías + justificación
- [ ] Instalación
- [ ] Scripts
- [ ] Estructura del proyecto
- [ ] Decisiones técnicas
- [ ] Gestión de caché
- [ ] Mejoras futuras
- [ ] Cómo ejecutar

## Casos límite (edge cases)

- [ ] Listado vacío (Empty State)
- [ ] Error de red / API caída (Error State) en listado y detalle
- [ ] Búsqueda sin resultados
- [ ] Loading state en listado, detalle y al añadir al carrito
- [ ] Producto con una única opción de color/almacenamiento (preseleccionada, selector visible igualmente)
- [ ] Producto con id inexistente en la PDP
- [ ] Doble click / click repetido en "Añadir" (evitar múltiples peticiones simultáneas)
- [ ] Cache expirada exactamente en el límite de 1h
- [ ] Recarga de página conservando contador de carrito
- [ ] Imágenes de producto rotas/ausentes (fallback)
