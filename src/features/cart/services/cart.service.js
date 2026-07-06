import { httpClient } from '../../../shared/services/http-client.js';

/**
 * Añade un producto a la cesta. La API devuelve `{ count }` con el nuevo
 * total de productos en la cesta.
 */
export function addProductToCart({ id, colorCode, storageCode }) {
  return httpClient.post('/api/cart', { id, colorCode, storageCode });
}
