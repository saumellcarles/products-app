import { Button } from '../Button/Button.jsx';
import styles from './ErrorState.module.scss';

/**
 * @param {{ message?: string, onRetry?: () => void }} props
 */
export function ErrorState({ message = 'Ha ocurrido un error inesperado.', onRetry }) {
  return (
    <div className={styles.errorState} role="alert">
      <span className={styles.icon} aria-hidden="true">
        ⚠️
      </span>
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          Reintentar
        </Button>
      )}
    </div>
  );
}
