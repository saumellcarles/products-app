import { useState, useMemo } from 'react';
import { CartContext } from './cart-context.js';

export function CartProvider({ children }) {
  const [itemCount, setItemCount] = useState(0);

  const value = useMemo(() => ({ itemCount, setItemCount }), [itemCount]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
