import { Grid } from '@radix-ui/themes';
import { ProductCard } from '../ProductCard/ProductCard.jsx';

// Sustituye el grid CSS propio por el `Grid` responsive de Radix (columns
// admite un valor distinto por breakpoint). Con esto, "mobile" muestra 1
// columna, "xs" 2, "md" 3 y "lg" 4 — el máximo de 4 por fila requerido.
export function ProductGrid({ products }) {
  return (
    <Grid columns={{ initial: '1', xs: '2', md: '3', lg: '4' }} gap="4" width="auto">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  );
}
