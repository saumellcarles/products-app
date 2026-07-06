import { Link } from 'react-router-dom';
import { ImageWithFallback } from '../../../../shared/components';
import { buildProductDetailsPath } from '../../../../shared/constants/routes.js';
import { formatPrice } from '../../utils/format-price.js';
import styles from './ProductCard.module.scss';

export function ProductCard({ product }) {
  const { id, brand, model, price, imgUrl } = product;

  return (
    <Link to={buildProductDetailsPath(id)} className={styles.card}>
      <div className={styles.imageWrapper}>
        <ImageWithFallback src={imgUrl} alt={`${brand} ${model}`} className={styles.image} />
      </div>
      <div className={styles.info}>
        <p className={styles.brand}>{brand}</p>
        <p className={styles.model}>{model}</p>
        <p className={styles.price}>{formatPrice(price)}</p>
      </div>
    </Link>
  );
}
