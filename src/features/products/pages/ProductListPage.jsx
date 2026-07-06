import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box } from '@radix-ui/themes';
import { Loading, ErrorState, EmptyState, SearchBar } from '../../../shared/components';
import { REQUEST_STATUS } from '../../../shared/constants/request-status.js';
import { useProducts } from '../hooks/useProducts.js';
import { filterProductsByQuery } from '../utils/filter-products.js';
import { ProductGrid } from '../components/ProductGrid/ProductGrid.jsx';

const SEARCH_LABEL = 'Buscar por marca o modelo';
const SEARCH_QUERY_PARAM = 'q';

export function ProductListPage() {
  const { status, products, reload } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get(SEARCH_QUERY_PARAM) ?? '';

  const filteredProducts = useMemo(() => filterProductsByQuery(products, query), [products, query]);

  // Persiste la búsqueda en la URL (?q=) para poder recargar o compartirla
  // con los mismos resultados filtrados. `replace: true` evita generar una
  // entrada de historial por cada pulsación de tecla.
  function handleQueryChange(value) {
    const nextParams = new URLSearchParams(searchParams);

    if (value) {
      nextParams.set(SEARCH_QUERY_PARAM, value);
    } else {
      nextParams.delete(SEARCH_QUERY_PARAM);
    }

    setSearchParams(nextParams, { replace: true });
  }

  function renderContent() {
    if (status === REQUEST_STATUS.LOADING) {
      return <Loading label="Cargando productos…" />;
    }

    if (status === REQUEST_STATUS.ERROR) {
      return <ErrorState message="No se han podido cargar los productos." onRetry={reload} />;
    }

    if (products.length === 0) {
      return <EmptyState message="No hay productos disponibles." />;
    }

    if (filteredProducts.length === 0) {
      return <EmptyState message={`No se han encontrado resultados para "${query}".`} />;
    }

    return <ProductGrid products={filteredProducts} />;
  }

  return (
    <Box py="5">
      <Box maxWidth="320px" ml="auto" mb="5">
        <SearchBar label={SEARCH_LABEL} placeholder={SEARCH_LABEL} value={query} onChange={handleQueryChange} />
      </Box>
      {renderContent()}
    </Box>
  );
}
