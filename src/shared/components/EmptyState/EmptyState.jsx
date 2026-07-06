import styles from './EmptyState.module.scss';

/**
 * @param {{ message?: string }} props
 */
export function EmptyState({ message = 'No se han encontrado resultados.' }) {
  return (
    <div className={styles.emptyState}>
      <span className={styles.icon} aria-hidden="true">
        🔍
      </span>
      <p>{message}</p>
    </div>
  );
}
