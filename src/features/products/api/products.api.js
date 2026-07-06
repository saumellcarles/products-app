import { httpClient } from '../../../shared/services/http-client.js';
import { API_ENDPOINTS } from '../../../shared/constants/api.js';

export function fetchProductList() {
  return httpClient.get(API_ENDPOINTS.PRODUCTS);
}

export function fetchProductById(id) {
  return httpClient.get(API_ENDPOINTS.PRODUCT_BY_ID(id));
}
