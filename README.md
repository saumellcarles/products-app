# Products App — Front-End Test

SPA para comprar dispositivos móviles: listado de productos con búsqueda y detalle de producto con selección de color/almacenamiento y añadido a cesta persistente.

Desarrollado como prueba técnica de Front-End siguiendo el documento de requisitos `TechOps - Front End Test.pdf`.

## Descripción

La aplicación consta de dos vistas:

1. **Listado de productos (PLP)** — todos los productos devueltos por la API, filtrables en tiempo real por marca/modelo, en una rejilla responsive de hasta 4 columnas.
2. **Detalle de producto (PDP)** — imagen, ficha técnica completa y selección de color/almacenamiento para añadir el producto a la cesta.

El contador de la cesta se muestra en la cabecera en cualquier vista y persiste entre recargas de página.

## Tecnologías

| Tecnología | Uso | Justificación |
|---|---|---|
| React 18 | UI | Requisito del enunciado |
| Vite | Bundler/dev server | Arranque rápido, HMR, build de producción sin configuración adicional |
| React Router | Enrutado SPA en cliente | Navegación entre PLP/PDP sin SSR/MPA, tal como pide el enunciado |
| Context API | Estado global (cesta) | Único estado compartido entre vistas es el contador de cesta; no justifica Redux/MobX |
| SCSS Modules | Estilos | Aislamiento de estilos por componente + variables/mixins centralizados, sin runtime extra (a diferencia de Styled Components) |
| ESLint (Flat Config) | Calidad de código | Estándar actual de ESLint 9 |
| Vitest + Testing Library | Tests | Integración nativa con Vite (misma config, sin runner adicional tipo Jest) |
| pnpm | Gestor de paquetes | Instalación rápida y determinista mediante enlaces simbólicos |

No se ha utilizado TypeScript ni `prop-types`, conforme al enunciado; el contrato de props se documenta mediante JSDoc y nombres descriptivos.

## Arquitectura

Arquitectura modular basada en features, con separación explícita de capas:

```
UI (componentes/páginas)
  → hooks (estado de la vista: loading/error/success)
    → services (reglas de negocio: caché, orquestación)
      → api (llamadas HTTP puras)
        → shared/services/http-client (Fetch API centralizado)
```

- La UI **nunca** llama a `fetch` directamente: todo pasa por `shared/services/http-client.js`.
- Toda persistencia en cliente pasa por `shared/storage/`.
- Cada feature expone únicamente su API pública a través de `index.js` (barrel export); el resto de módulos internos no se importan desde fuera de la feature.

### Estructura del proyecto

```
src/
  app/                        Composición de la aplicación
    router/                   Definición de rutas (React Router)
    providers/                Providers globales (CartProvider, etc.)
    layout/                   Layout, Header, hook de breadcrumbs
  features/
    products/                 Feature de productos (autocontenida)
      api/                    Llamadas HTTP puras (fetch al endpoint)
      services/                Lógica de negocio + caché
      hooks/                   useProducts, useProductDetails
      components/              ProductCard, ProductGrid, ProductImage,
                                 ProductDescription, ProductActions
      pages/                   ProductListPage, ProductDetailsPage
      utils/                   formatPrice, filterProductsByQuery
      index.js                 API pública de la feature
    cart/                      Feature de cesta (autocontenida)
      context/                 CartContext + CartProvider
      hooks/                   useCart, useAddToCart
      services/                cart.service.js
      index.js                 API pública de la feature
  shared/
    components/                Componentes reutilizables (Button, Select,
                                 SearchBar, Breadcrumb, Loading, ErrorState,
                                 EmptyState, ImageWithFallback, PageContainer)
    services/                  http-client.js (Fetch API centralizado)
    storage/                   local-storage.service.js, cache.service.js
    constants/                 routes.js, api.js, request-status.js
    styles/                    abstracts (variables/mixins) + base (reset/global)
  main.jsx
```

## Instalación

Requiere Node.js y [pnpm](https://pnpm.io/).

```bash
pnpm install
```

## Scripts

| Script | Descripción |
|---|---|
| `pnpm start` / `pnpm dev` | Modo desarrollo (Vite, con HMR) |
| `pnpm build` | Compilación para producción en `dist/` |
| `pnpm preview` | Sirve el build de producción localmente |
| `pnpm test` | Ejecuta la suite de tests (Vitest) una vez |
| `pnpm test:watch` | Tests en modo watch |
| `pnpm lint` | Comprobación de código con ESLint |

## Cómo ejecutar el proyecto

```bash
pnpm install
pnpm dev
```

La aplicación queda disponible en `http://localhost:5173`. Consume directamente la API pública `https://itx-frontend-test.onrender.com/` (no requiere variables de entorno ni backend propio).

## Gestión de caché

Capa de caché reutilizable (`shared/storage/cache.service.js`) aplicada al listado y al detalle de producto:

- Cada entrada se persiste en `localStorage` con la forma `{ data, timestamp, ttl }`.
- TTL por defecto: **1 hora**.
- En cada lectura se comprueba `Date.now() - timestamp < ttl`; si ha expirado, la entrada se ignora (se trata como no existente) y `getOrFetch` vuelve a pedir los datos a la API, actualizando la caché automáticamente con la respuesta fresca.
- La función `getOrFetch(key, fetcher, ttl)` es agnóstica del endpoint: `products.service.js` la usa tanto para el listado como para el detalle, y es reutilizable para cualquier otro dato que se quiera cachear en el futuro.
- El contador de la cesta usa el mismo `local-storage.service.js` pero sin TTL (se persiste directamente, ya que refleja el estado real y actual de la cesta, no una respuesta cacheada de la API).

## Decisiones técnicas

- **Selects nativos** (`<select>`) para color/almacenamiento en lugar de un listbox custom: accesibilidad (teclado, lectores de pantalla) y comportamiento móvil correctos sin código adicional.
- **`ImageWithFallback`**: componente compartido entre `ProductCard` y `ProductImage` que capta el evento `onError` de la imagen y muestra un placeholder accesible, evitando duplicar esa lógica en ambos sitios.
- **Guard contra doble envío**: `useAddToCart` ignora nuevas llamadas mientras una petición está en curso, evitando peticiones duplicadas por doble clic.
- **`react/prop-types` desactivado** en ESLint: al no usar TypeScript ni la librería `prop-types` (ninguna requerida por el enunciado), se documenta el contrato de props con JSDoc en vez de introducir una dependencia adicional solo para silenciar el linter.
- **Grid de productos**: mobile-first con 1/2/3/4 columnas según `_breakpoints.scss` (600 / 900 / 1200 px), cumpliendo el máximo de 4 productos por fila.

## Mejoras futuras

- Sincronizar el filtro de búsqueda con la query string (`?q=`) para poder compartir/recargar la búsqueda.
- Añadir tests de componentes (React Testing Library) además de los tests de servicios/utilidades ya existentes.
- Feedback visual (toast) al añadir un producto a la cesta, en lugar del mensaje de texto inline actual.
- Soporte de paginación o virtualización si el catálogo de productos creciera significativamente.
