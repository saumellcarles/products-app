import { Card, Flex, Grid, Heading, Link as RadixLink } from '@radix-ui/themes';
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
    <div>
      <RadixLink asChild size="2" mb="5" weight="medium">
        <Link to={ROUTES.PRODUCT_LIST}>
          <Flex as="span" align="center" gap="1">
            <ArrowLeftIcon /> Volver al listado
          </Flex>
        </Link>
      </RadixLink>

      <Grid columns={{ initial: '1', md: '360px 1fr' }} gap="6" mt="5">
        <ProductImage src={imgUrl} alt={`${brand} ${model}`} />

        <Flex direction="column" gap="4">
          <Heading as="h1" size="7">
            {brand} {model}
          </Heading>

          <Card size="3">
            <ProductDescription product={product} />
          </Card>

          <Card size="3">
            <ProductActions product={product} />
          </Card>
        </Flex>
      </Grid>
    </div>
  );
}
