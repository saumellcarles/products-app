const PRICE_PLACEHOLDER = '—';
const CURRENCY_FORMATTER = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' });

/**
 * La API devuelve el precio como string y a veces vacío (sin precio
 * disponible). Se formatea como moneda o se muestra un placeholder.
 */
export function formatPrice(price) {
  if (price === '' || price === null || price === undefined) {
    return PRICE_PLACEHOLDER;
  }

  const numericPrice = Number(price);

  if (Number.isNaN(numericPrice)) {
    return String(price);
  }

  return CURRENCY_FORMATTER.format(numericPrice);
}
