import { httpClient } from '../../../shared/services/http-client.js';

export function fetchProductList() {
  return httpClient.get('/api/product');
}

export function fetchProductById(id) {
  return httpClient.get(`/api/product/${id}`);
}
