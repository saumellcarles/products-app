import { useCallback, useEffect, useState } from 'react';
import { REQUEST_STATUS } from '../../../shared/constants/request-status.js';
import { getProductList } from '../services/products.service.js';

export function useProducts() {
  const [status, setStatus] = useState(REQUEST_STATUS.LOADING);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const loadProducts = useCallback(async () => {
    setStatus(REQUEST_STATUS.LOADING);
    setError(null);

    try {
      const data = await getProductList();
      setProducts(data);
      setStatus(REQUEST_STATUS.SUCCESS);
    } catch (caughtError) {
      setError(caughtError);
      setStatus(REQUEST_STATUS.ERROR);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return { status, products, error, reload: loadProducts };
}
