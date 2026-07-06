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
| SCSS Modules | Estilos específicos | Solo donde Radix no llega: layout puntual, responsive, animaciones (ver "Estilos" más abajo) |
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
    styles/                     abstracts (variables/mixins) + base (reset/global)
    test-utils/                 renderWithProviders (Theme + MemoryRouter) para tests de componentes
  main.jsx
```

## Instalación

Requiere Node.js y [pnpm](https://pnpm.io/).

```bash
pnpm install
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

## Cómo ejecutar el proyecto

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

## Integración continua

`.github/workflows/ci.yml` ejecuta en cada push/PR a `main`, en este orden: **lint → build → test**, sobre Node 20 con pnpm.

## Gestión de caché

Capa de caché reutilizable (`shared/storage/cache.service.js`) aplicada al listado y al detalle de producto:

- Cada entrada se persiste en `localStorage` con la forma `{ data, timestamp, ttl }`.
- TTL por defecto: **1 hora**.
- En cada lectura se comprueba `Date.now() - timestamp < ttl`; si ha expirado, la entrada se ignora (se trata como no existente) y `getOrFetch` vuelve a pedir los datos a la API, actualizando la caché automáticamente con la respuesta fresca.
- La función `getOrFetch(key, fetcher, ttl)` es agnóstica del endpoint: `products.service.js` la usa tanto para el listado como para el detalle, y es reutilizable para cualquier otro dato que se quiera cachear en el futuro.
- El contador de la cesta usa el mismo `local-storage.service.js` pero sin TTL (se persiste directamente, ya que refleja el estado real y actual de la cesta, no una respuesta cacheada de la API).

## Estilos

SCSS Modules se mantiene solo donde Radix Themes no resuelve el caso:

- **Layout específico**: el aspect-ratio/objeto de las imágenes de producto, la fila del Grid que comparte alto entre imagen y ficha técnica en la PDP.
- **Responsive puntual**: el breadcrumb pasando a su propia línea en el Header por debajo de `tablet` (Radix Flex no expone `order`/`flex-basis` por breakpoint); la Card de acciones cambiando de columna en la rejilla de la PDP a partir de `md`.
- **Animaciones**: la entrada del toast.
- **Overrides mínimos**: cursor `pointer` en botones/controles (Radix Themes usa `cursor: default` por convención de escritorio; se sobrescribe una vez, de forma global, sobre `.radix-themes`).

Todo lo demás (tipografía, espaciados, tarjetas, badges, selects, estados de carga/error/vacío) usa componentes de Radix Themes directamente vía props, sin CSS propio.

## Decisiones técnicas

- **Tema de Radix**: `accentColor="indigo"`, `grayColor="slate"`, `radius="large"`, definidos una única vez en `shared/constants/theme.js` y aplicados con `<Theme>` en la raíz de la app.
- **App shell con altura fija**: `Layout` reserva al Header su tamaño natural y el resto del viewport para el área de contenido, que tiene su propio scroll (en vez de `<body>`). Esto permite que la PDP use un `ScrollArea` acotado a su alto real disponible para la ficha de especificaciones: si es muy larga, hace scroll interno en vez de empujar el botón "Añadir" fuera de la pantalla o forzar scroll de toda la página.
- **Breadcrumb con etiqueta dinámica**: un `BreadcrumbContext` ligero (en `app/layout`) permite que la PDP fije el nombre real del producto como último segmento del breadcrumb una vez cargado, sin acoplar el Header a los datos de cada página.
- **Selects nativos** sustituidos por `Select` de Radix Themes para color/almacenamiento, manteniendo la misma lógica de negocio (los códigos numéricos se convierten en el punto de uso, igual que antes).
- **`ImageWithFallback`**: componente compartido entre `ProductCard` y `ProductImage` que capta el evento `onError` de la imagen y muestra un placeholder accesible, evitando duplicar esa lógica en ambos sitios.
- **Toast sin provider global**: `Toast` es un componente autocontenido montado en un `Portal` de Radix (para no quedar recortado por el `overflow: hidden` del app shell), con auto-dismiss local en `ProductActions`. No se ha introducido un sistema de notificaciones global porque solo hay un caso de uso (feedback de añadir al carrito).
- **Guard contra doble envío**: `useAddToCart` ignora nuevas llamadas mientras una petición está en curso, evitando peticiones duplicadas por doble clic.
- **Contador de cesta acumulado en cliente**: la API de prueba no mantiene un carrito real en servidor (cada `POST /api/cart` devuelve siempre `count: 1`, sea cual sea el historial). El contador persistido se incrementa en cliente con cada respuesta en vez de sobrescribirse con ese valor, para reflejar de verdad cuántas unidades se han añadido.
- **`react/prop-types` desactivado** en ESLint: al no usar TypeScript ni la librería `prop-types`, se documenta el contrato de props con JSDoc en vez de introducir una dependencia adicional solo para silenciar el linter.
- **Sin `api.js` centralizado**: las rutas del endpoint (`/api/product`, `/api/cart`, ...) se definen inline en el único módulo que las usa (`products.api.js`, `cart.service.js`); solo la URL base (que sí varía por entorno) vive en `.env`.
- **Grid de productos**: usa el `Grid` responsive de Radix Themes (`columns` distinto por breakpoint), cumpliendo el máximo de 4 productos por fila sin CSS de grid propio.
