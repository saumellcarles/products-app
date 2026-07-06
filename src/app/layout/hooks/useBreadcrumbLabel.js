import { useContext, useEffect } from 'react';
import { BreadcrumbContext } from '../context/breadcrumb-context.js';

/**
 * Permite a una página fijar la etiqueta dinámica del breadcrumb (p.ej. el
 * nombre del producto en la PDP). Se limpia automáticamente al desmontar.
 */
export function useBreadcrumbLabel(label) {
  const { setLabel } = useContext(BreadcrumbContext);

  useEffect(() => {
    setLabel(label ?? null);
    return () => setLabel(null);
  }, [label, setLabel]);
}
