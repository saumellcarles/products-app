import { useEffect, useMemo, useState } from 'react';
import { localStorageService } from '../../../shared/storage/local-storage.service.js';
import { CartContext } from './cart-context.js';

const CART_COUNT_STORAGE_KEY = 'cart:item-count';

function getInitialItemCount() {
  const storedCount = localStorageService.get(CART_COUNT_STORAGE_KEY);
  return typeof storedCount === 'number' ? storedCount : 0;
}

export function CartProvider({ children }) {
  const [itemCount, setItemCount] = useState(getInitialItemCount);

  useEffect(() => {
    localStorageService.set(CART_COUNT_STORAGE_KEY, itemCount);
  }, [itemCount]);

  const value = useMemo(() => ({ itemCount, setItemCount }), [itemCount]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
