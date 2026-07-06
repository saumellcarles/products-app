import { useLocation, matchPath } from 'react-router-dom';
import { ROUTES } from '../../../shared/constants/routes.js';

const PRODUCT_LIST_LABEL = 'Listado de productos';
const PRODUCT_DETAILS_LABEL = 'Detalle del producto';

export function useBreadcrumbItems() {
  const { pathname } = useLocation();

  if (matchPath(ROUTES.PRODUCT_DETAILS, pathname)) {
    return [
      { label: PRODUCT_LIST_LABEL, to: ROUTES.PRODUCT_LIST },
      { label: PRODUCT_DETAILS_LABEL },
    ];
  }

  return [{ label: PRODUCT_LIST_LABEL }];
}
