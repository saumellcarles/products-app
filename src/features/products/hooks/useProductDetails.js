import { useCallback, useEffect, useState } from 'react';
import { REQUEST_STATUS } from '../../../shared/constants/request-status.js';
import { getProductById } from '../services/products.service.js';

export function useProductDetails(id) {
  const [status, setStatus] = useState(REQUEST_STATUS.LOADING);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  const loadProduct = useCallback(async () => {
    setStatus(REQUEST_STATUS.LOADING);
    setError(null);

    try {
      const data = await getProductById(id);
      setProduct(data);
      setStatus(REQUEST_STATUS.SUCCESS);
    } catch (caughtError) {
      setError(caughtError);
      setStatus(REQUEST_STATUS.ERROR);
    }
  }, [id]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  return { status, product, error, reload: loadProduct };
}
