import { Link } from 'react-router-dom';
import { useCart } from '../../../features/cart';
import { ROUTES } from '../../../shared/constants/routes.js';
import styles from './Header.module.scss';

export function Header() {
  const { itemCount } = useCart();

  return (
    <header className={styles.header}>
      <Link to={ROUTES.PRODUCT_LIST} className={styles.brand} aria-label="Ir a la lista de productos">
        <span className={styles.brandIcon} aria-hidden="true">
          📱
        </span>
        <span className={styles.brandName}>Products App</span>
      </Link>

      <div className={styles.cartIndicator} aria-label={`Productos en la cesta: ${itemCount}`}>
        <span className={styles.cartIcon} aria-hidden="true">
          🛒
        </span>
        <span className={styles.cartCount}>{itemCount}</span>
      </div>
    </header>
  );
}
