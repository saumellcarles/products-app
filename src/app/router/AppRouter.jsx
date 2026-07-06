import { Routes, Route } from 'react-router-dom';
import { ProductListPage, ProductDetailsPage } from '../../features/products';
import { ROUTES } from '../../shared/constants/routes.js';
import { Layout } from '../layout/Layout.jsx';

export function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.PRODUCT_LIST} element={<ProductListPage />} />
        <Route path={ROUTES.PRODUCT_DETAILS} element={<ProductDetailsPage />} />
      </Route>
    </Routes>
  );
}
