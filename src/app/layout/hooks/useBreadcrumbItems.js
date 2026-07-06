import { useContext } from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import { ROUTES } from '../../../shared/constants/routes.js';
import { BreadcrumbContext } from '../context/breadcrumb-context.js';

const PRODUCT_LIST_LABEL = 'Todos los productos';
const PRODUCT_DETAILS_FALLBACK_LABEL = 'Detalle del producto';

export function useBreadcrumbItems() {
  const { pathname } = useLocation();
  const { label } = useContext(BreadcrumbContext);

  if (matchPath(ROUTES.PRODUCT_DETAILS, pathname)) {
    return [
      { label: PRODUCT_LIST_LABEL, to: ROUTES.PRODUCT_LIST },
      { label: label ?? PRODUCT_DETAILS_FALLBACK_LABEL },
    ];
  }

  return [{ label: PRODUCT_LIST_LABEL }];
}
