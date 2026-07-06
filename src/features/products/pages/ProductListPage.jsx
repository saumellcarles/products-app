import { Loading, ErrorState, EmptyState } from '../../../shared/components';
import { REQUEST_STATUS } from '../../../shared/constants/request-status.js';
import { useProducts } from '../hooks/useProducts.js';
import { ProductGrid } from '../components/ProductGrid/ProductGrid.jsx';

export function ProductListPage() {
  const { status, products, reload } = useProducts();

  if (status === REQUEST_STATUS.LOADING) {
    return <Loading label="Cargando productos…" />;
  }

  if (status === REQUEST_STATUS.ERROR) {
    return <ErrorState message="No se han podido cargar los productos." onRetry={reload} />;
  }

  if (products.length === 0) {
    return <EmptyState message="No hay productos disponibles." />;
  }

  return <ProductGrid products={products} />;
}
