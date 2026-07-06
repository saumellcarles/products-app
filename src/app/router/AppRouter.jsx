import { Routes, Route } from 'react-router-dom';
import { ProductListPage, ProductDetailsPage } from '../../features/products';
import { ROUTES } from '../../shared/constants/routes.js';

export function AppRouter() {
  return (
    <Routes>
      <Route path={ROUTES.PRODUCT_LIST} element={<ProductListPage />} />
      <Route path={ROUTES.PRODUCT_DETAILS} element={<ProductDetailsPage />} />
    </Routes>
  );
}
