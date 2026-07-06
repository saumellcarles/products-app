import { ImageWithFallback } from '../../../../shared/components';
import styles from './ProductImage.module.scss';

export function ProductImage({ src, alt }) {
  return (
    <div className={styles.wrapper}>
      <ImageWithFallback src={src} alt={alt} className={styles.image} />
    </div>
  );
}
