import { useMemo, useState } from 'react';
import { BreadcrumbContext } from './breadcrumb-context.js';

export function BreadcrumbProvider({ children }) {
  const [label, setLabel] = useState(null);
  const value = useMemo(() => ({ label, setLabel }), [label]);

  return <BreadcrumbContext.Provider value={value}>{children}</BreadcrumbContext.Provider>;
}
