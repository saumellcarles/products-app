export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API_ENDPOINTS = {
  PRODUCTS: '/api/product',
  PRODUCT_BY_ID: (id) => `/api/product/${id}`,
  CART: '/api/cart',
};
