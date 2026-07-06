import { Link, useParams } from 'react-router-dom';
import { Loading, ErrorState } from '../../../shared/components';
import { REQUEST_STATUS } from '../../../shared/constants/request-status.js';
import { ROUTES } from '../../../shared/constants/routes.js';
import { useProductDetails } from '../hooks/useProductDetails.js';
import { ProductImage } from '../components/ProductImage/ProductImage.jsx';
import { ProductDescription } from '../components/ProductDescription/ProductDescription.jsx';
import { ProductActions } from '../components/ProductActions/ProductActions.jsx';
import styles from './ProductDetailsPage.module.scss';

export function ProductDetailsPage() {
  const { id } = useParams();
  const { status, product, reload } = useProductDetails(id);

  if (status === REQUEST_STATUS.LOADING) {
    return <Loading label="Cargando producto…" />;
  }

  if (status === REQUEST_STATUS.ERROR) {
    return <ErrorState message="No se ha podido cargar el producto." onRetry={reload} />;
  }

  const { brand, model, imgUrl } = product;

  return (
    <div className={styles.page}>
      <Link to={ROUTES.PRODUCT_LIST} className={styles.backLink}>
        ← Volver al listado
      </Link>

      <div className={styles.content}>
        <ProductImage src={imgUrl} alt={`${brand} ${model}`} />

        <div>
          <h1>
            {brand} {model}
          </h1>
          <ProductDescription product={product} />
          <ProductActions product={product} />
        </div>
      </div>
    </div>
  );
}
