/**
 * Filtra productos por Marca o Modelo en función del texto de búsqueda,
 * de forma insensible a mayúsculas/minúsculas.
 */
export function filterProductsByQuery(products, query) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return products;
  }

  return products.filter(
    ({ brand, model }) =>
      brand.toLowerCase().includes(normalizedQuery) || model.toLowerCase().includes(normalizedQuery),
  );
}
