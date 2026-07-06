# Products App — Front-End Test

SPA para comprar dispositivos móviles: listado de productos con búsqueda (sincronizada con la URL) y detalle de producto con selección de color/almacenamiento y añadido a cesta persistente.

Desarrollado como prueba técnica de Front-End siguiendo el documento de requisitos `TechOps - Front End Test.pdf`, y posteriormente migrado a **Radix UI Themes** como sistema de diseño.

## Descripción

La aplicación consta de dos vistas:

1. **Listado de productos (PLP)** — todos los productos devueltos por la API, filtrables en tiempo real por marca/modelo (con la búsqueda reflejada en `?q=` para poder recargar/compartir el filtro), en una rejilla responsive de hasta 4 columnas.
2. **Detalle de producto (PDP)** — imagen, ficha técnica completa y selección de color/almacenamiento para añadir el producto a la cesta, con feedback visual (toast) al añadir.

El contador de la cesta se muestra en la cabecera en cualquier vista y persiste entre recargas de página.

## Tecnologías

| Tecnología | Uso | Justificación |
|---|---|---|
| React 18 | UI | Requisito del enunciado |
| Vite | Bundler/dev server | Arranque rápido, HMR, build de producción sin configuración adicional |
| React Router | Enrutado SPA en cliente | Navegación entre PLP/PDP sin SSR/MPA; también gestiona la query string de la búsqueda |
| Context API | Estado global (cesta, breadcrumb dinámico) | Único estado realmente compartido entre vistas; no justifica Redux/MobX |
| **Radix UI Themes** | Sistema de diseño | Componentes accesibles y con estilos consistentes (Button, Card, Select, Dialog primitives, DataList, Callout, Spinner...) sin escribir CSS desde cero para cada control |
| **Radix Icons** | Iconografía | Set de iconos SVG coherente con Radix Themes (búsqueda, breadcrumb, estados, etc.) |
| SCSS Modules | Estilos específicos | Solo donde Radix no llega: layout puntual, responsive, animaciones |
| ESLint (Flat Config) | Calidad de código | Estándar actual de ESLint 9 |
| Vitest + Testing Library | Tests | Integración nativa con Vite (misma config, sin runner adicional tipo Jest); tests de servicios/utilidades y de componentes |
| pnpm | Gestor de paquetes | Instalación rápida y determinista mediante enlaces simbólicos |

No se ha utilizado TypeScript ni `prop-types`, conforme al enunciado; el contrato de props se documenta mediante JSDoc y nombres descriptivos.

## Arquitectura

Arquitectura modular basada en features, con separación explícita de capas:

```
UI (componentes/páginas, ahora sobre primitivas de Radix Themes)
  → hooks (estado de la vista: loading/error/success)
    → services (reglas de negocio: caché, orquestación)
      → api (llamadas HTTP puras)
        → shared/services/http-client (Fetch API centralizado)
```

- La UI **nunca** llama a `fetch` directamente: todo pasa por `shared/services/http-client.js`.
- Toda persistencia en cliente pasa por `shared/storage/`.
- Cada feature expone únicamente su API pública a través de `index.js` (barrel export); el resto de módulos internos no se importan desde fuera de la feature.
- `<Theme>` de Radix envuelve toda la aplicación en `app/App.jsx`, configurado desde una única fuente de verdad (`shared/constants/theme.js`).

### Estructura del proyecto

```
src/
  app/
    router/                    AppRouter (React Router)
    providers/                 AppProviders (CartProvider)
    layout/
      Layout.jsx                Shell: Header fijo + área de contenido con scroll propio
      Header/                    Marca, breadcrumb, contador de cesta
      context/                   BreadcrumbProvider (permite fijar la etiqueta dinámica del breadcrumb)
      hooks/                     useBreadcrumbItems, useBreadcrumbLabel
  features/
    products/                  Feature de productos (autocontenida)
      api/                      products.api.js — llamadas HTTP puras
      services/                 products.service.js — caché + orquestación
      hooks/                    useProducts, useProductDetails
      components/               ProductCard, ProductGrid, ProductImage,
                                  ProductDescription, ProductActions
      pages/                    ProductListPage, ProductDetailsPage
      utils/                    formatPrice, filterProductsByQuery, toDisplayText
      index.js                  API pública de la feature
    cart/                       Feature de cesta (autocontenida)
      context/                  CartContext + CartProvider (persistida en localStorage)
      hooks/                    useCart, useAddToCart
      services/                 cart.service.js
      index.js                  API pública de la feature
  shared/
    components/                 Button, Select, SearchBar, Breadcrumb, Toast,
                                  Loading, ErrorState, EmptyState, ImageWithFallback
    services/                   http-client.js (Fetch API centralizado)
    storage/                    local-storage.service.js, cache.service.js
    constants/                  routes.js, request-status.js, theme.js
                                  api/products.js (URL base + endpoints)
    styles/                     abstracts (variables/mixins) + base (reset/global)
    test-utils/                 renderWithProviders (Theme + MemoryRouter) para tests de componentes
  main.jsx
```

## Variables de entorno

La URL base de la API se lee de `VITE_API_BASE_URL` (ver `.env`, ya incluido en el repo porque no contiene ningún secreto). Para apuntar a otro entorno sin tocar el repositorio, crea un `.env.local` (ignorado por git) con el mismo valor sobrescrito.

## Scripts

| Script | Descripción |
|---|---|
| `pnpm start` / `pnpm dev` | Modo desarrollo (Vite, con HMR) |
| `pnpm build` | Compilación para producción en `dist/` |
| `pnpm preview` | Sirve el build de producción localmente |
| `pnpm test` | Ejecuta la suite de tests (Vitest) una vez |
| `pnpm test:watch` | Tests en modo watch |
| `pnpm lint` | Comprobación de código con ESLint |

## Gestión de caché

Capa de caché reutilizable (`shared/storage/cache.service.js`) aplicada al listado y al detalle de producto:

- Cada entrada se persiste en `localStorage` con la forma `{ data, timestamp, ttl }`.
- TTL por defecto: **1 hora**.
- En cada lectura se comprueba `Date.now() - timestamp < ttl`; si ha expirado, la entrada se ignora (se trata como no existente) y `getOrFetch` vuelve a pedir los datos a la API, actualizando la caché automáticamente con la respuesta fresca.
- La función `getOrFetch(key, fetcher, ttl)` es agnóstica del endpoint: `products.service.js` la usa tanto para el listado como para el detalle, y es reutilizable para cualquier otro dato que se quiera cachear en el futuro.
- El contador de la cesta usa el mismo `local-storage.service.js` pero sin TTL (se persiste directamente, ya que refleja el estado real y actual de la cesta, no una respuesta cacheada de la API).

## Integración continua

`.github/workflows/ci.yml` ejecuta en cada push/PR a `main`, en este orden: **lint → build → test**, sobre Node 22 con pnpm.

## Cómo ejecutar el proyecto

Requiere Node.js y [pnpm](https://pnpm.io/).

```bash
pnpm install
pnpm dev
```

La aplicación queda disponible en `http://localhost:5173`. Consume directamente la API pública `https://itx-frontend-test.onrender.com/` (no requiere backend propio).

### Con Docker

```bash
docker compose up
```

Levanta el servidor de desarrollo de Vite (con HMR) en `http://localhost:5173`, montando el proyecto como volumen. No requiere tener Node/pnpm instalados localmente.
