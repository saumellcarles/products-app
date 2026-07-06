import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Theme } from '@radix-ui/themes';

/**
 * Envuelve el componente con los providers que la mayoría de componentes
 * necesitan en tests: el Theme de Radix (estilos/contexto) y un Router en
 * memoria (para componentes que usan <Link>, useParams, etc.).
 */
export function renderWithProviders(ui, { route = '/' } = {}) {
  return render(
    <Theme>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </Theme>,
  );
}
