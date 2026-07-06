import { Link } from 'react-router-dom';
import styles from './Breadcrumb.module.scss';

/**
 * @param {{ items: Array<{ label: string, to?: string }> }} props
 * El último elemento de `items` se renderiza como la página actual (sin enlace).
 */
export function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isCurrentPage = index === items.length - 1;

          return (
            <li key={item.label} className={styles.item}>
              {isCurrentPage || !item.to ? (
                <span aria-current={isCurrentPage ? 'page' : undefined}>{item.label}</span>
              ) : (
                <Link to={item.to}>{item.label}</Link>
              )}
              {!isCurrentPage && (
                <span className={styles.separator} aria-hidden="true">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
