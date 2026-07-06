import { createContext } from 'react';

/**
 * Permite que una página (p.ej. PDP) sustituya la etiqueta del último
 * segmento del breadcrumb por un valor dinámico (el nombre del producto)
 * una vez cargados sus datos, sin acoplar el Header a cada página.
 */
export const BreadcrumbContext = createContext({ label: null, setLabel: () => {} });
