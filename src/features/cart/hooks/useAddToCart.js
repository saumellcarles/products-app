import { useCallback, useState } from 'react';
import { REQUEST_STATUS } from '../../../shared/constants/request-status.js';
import { addProductToCart } from '../services/cart.service.js';
import { useCart } from './useCart.js';

export function useAddToCart() {
  const { setItemCount } = useCart();
  const [status, setStatus] = useState(REQUEST_STATUS.IDLE);

  const addToCart = useCallback(
    async ({ id, colorCode, storageCode }) => {
      // Evita disparar peticiones duplicadas ante clics repetidos mientras se procesa la anterior.
      if (status === REQUEST_STATUS.LOADING) return;

      setStatus(REQUEST_STATUS.LOADING);

      try {
        const { count } = await addProductToCart({ id, colorCode, storageCode });
        setItemCount(count);
        setStatus(REQUEST_STATUS.SUCCESS);
      } catch {
        setStatus(REQUEST_STATUS.ERROR);
      }
    },
    [status, setItemCount],
  );

  return { addToCart, status };
}
