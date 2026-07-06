import { getOrFetch } from '../../../shared/storage/cache.service.js';
import { fetchProductList, fetchProductById } from '../api/products.api.js';

const CACHE_KEY_PRODUCT_LIST = 'cache:products:list';
const CACHE_KEY_PRODUCT_DETAILS_PREFIX = 'cache:products:details:';

/**
 * Devuelve el listado de productos, sirviendo desde caché mientras el TTL
 * (1 hora) no haya expirado y revalidando contra la API en caso contrario.
 */
export function getProductList() {
  return getOrFetch(CACHE_KEY_PRODUCT_LIST, fetchProductList);
}

/**
 * Devuelve el detalle de un producto, aplicando la misma estrategia de caché.
 */
export function getProductById(id) {
  return getOrFetch(`${CACHE_KEY_PRODUCT_DETAILS_PREFIX}${id}`, () => fetchProductById(id));
}
