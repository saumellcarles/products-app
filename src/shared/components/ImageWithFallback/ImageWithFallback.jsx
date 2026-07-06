import { useState } from 'react';
import styles from './ImageWithFallback.module.scss';

/**
 * Envuelve una <img> con manejo de error: si la imagen no carga (rota,
 * ausente o URL caída) muestra un placeholder accesible en su lugar.
 * @param {{ src: string, alt: string, className?: string }} props
 */
export function ImageWithFallback({ src, alt, className = '' }) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div className={`${styles.fallback} ${className}`} role="img" aria-label={alt}>
        <span aria-hidden="true">📷</span>
      </div>
    );
  }

  return <img src={src} alt={alt} className={className} loading="lazy" onError={() => setHasError(true)} />;
}
