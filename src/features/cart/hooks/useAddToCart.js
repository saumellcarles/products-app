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
        // La API de esta prueba no mantiene estado real de carrito: cada
        // POST devuelve siempre `count: 1` en lugar del total acumulado.
        // Se trata por tanto como "unidades añadidas en esta operación" y
        // se acumula en cliente en vez de sobrescribir el contador.
        const { count } = await addProductToCart({ id, colorCode, storageCode });
        setItemCount((previousItemCount) => previousItemCount + count);
        setStatus(REQUEST_STATUS.SUCCESS);
      } catch {
        setStatus(REQUEST_STATUS.ERROR);
      }
    },
    [status, setItemCount],
  );

  return { addToCart, status };
}
