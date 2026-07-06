import { httpClient } from '../../../shared/services/http-client.js';
import { API_ENDPOINTS } from '../../../shared/constants/api/products.js';

/**
 * Añade un producto a la cesta. La API devuelve `{ count }` con el nuevo
 * total de productos en la cesta.
 */
export function addProductToCart({ id, colorCode, storageCode }) {
  return httpClient.post(API_ENDPOINTS.CART, { id, colorCode, storageCode });
}
