export const ROUTES = {
  PRODUCT_LIST: '/',
  PRODUCT_DETAILS: '/product/:id',
};

export const buildProductDetailsPath = (id) => `/product/${id}`;
