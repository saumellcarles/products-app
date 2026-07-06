import { Box, Card, Flex, Grid, Heading, Link as RadixLink, ScrollArea } from '@radix-ui/themes';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { Link, useParams } from 'react-router-dom';
import { Loading, ErrorState } from '../../../shared/components';
import { REQUEST_STATUS } from '../../../shared/constants/request-status.js';
import { ROUTES } from '../../../shared/constants/routes.js';
import { useBreadcrumbLabel } from '../../../app/layout/hooks/useBreadcrumbLabel.js';
import { useProductDetails } from '../hooks/useProductDetails.js';
import { ProductImage } from '../components/ProductImage/ProductImage.jsx';
import { ProductDescription } from '../components/ProductDescription/ProductDescription.jsx';
import { ProductActions } from '../components/ProductActions/ProductActions.jsx';
import styles from './ProductDetailsPage.module.scss';

const FULL_WIDTH_STYLE = { gridColumn: '1 / -1' };
const FULL_HEIGHT_STYLE = { height: '100%' };
const FLEXIBLE_ROW_STYLE = { flex: 1, minHeight: 0 };

export function ProductDetailsPage() {
  const { id } = useParams();
  const { status, product, reload } = useProductDetails(id);
  useBreadcrumbLabel(product ? `${product.brand} ${product.model}` : null);

  if (status === REQUEST_STATUS.LOADING) {
    return <Loading label="Cargando producto…" />;
  }

  if (status === REQUEST_STATUS.ERROR) {
    return <ErrorState message="No se ha podido cargar el producto." onRetry={reload} />;
  }

  const { brand, model, imgUrl } = product;

  return (
    <Flex direction="column" style={FULL_HEIGHT_STYLE}>
      <RadixLink asChild size="2" mb="4" weight="medium">
        <Link to={ROUTES.PRODUCT_LIST}>
          <Flex as="span" align="center" gap="1">
            <ArrowLeftIcon /> Volver al listado
          </Flex>
        </Link>
      </RadixLink>

      {/* Grid de 2 columnas: la imagen y la ficha de descripción comparten fila
          (misma altura/alineación vía stretch); título y acciones ocupan el
          ancho completo en su propia fila. En `md`+ la fila central es `1fr`
          (llena el alto disponible); si la ficha no cabe, hace scroll propio
          en vez de desbordar la página. */}
      <Grid
        columns={{ initial: '1', md: '360px 1fr' }}
        rows={{ md: 'auto 1fr auto' }}
        gap="6"
        style={FLEXIBLE_ROW_STYLE}
      >
        <Box style={FULL_WIDTH_STYLE}>
          <Heading as="h1" size="7">
            {brand} {model}
          </Heading>
        </Box>

        <ProductImage src={imgUrl} alt={`${brand} ${model}`} />

        <Card size="3" style={FULL_HEIGHT_STYLE}>
          <ScrollArea style={FULL_HEIGHT_STYLE}>
            <ProductDescription product={product} />
          </ScrollArea>
        </Card>

        <Box className={styles.actionsCell}>
          <Card size="3">
            <ProductActions product={product} />
          </Card>
        </Box>
      </Grid>
    </Flex>
  );
}
