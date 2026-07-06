import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils/render-with-providers.jsx';
import { Breadcrumb } from './Breadcrumb.jsx';

describe('Breadcrumb', () => {
  it('renders the current page without a link', () => {
    renderWithProviders(<Breadcrumb items={[{ label: 'Todos los productos' }]} />);

    const currentPage = screen.getByText('Todos los productos');
    expect(currentPage).toHaveAttribute('aria-current', 'page');
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('renders earlier items as links and the last item as the current page', () => {
    renderWithProviders(
      <Breadcrumb
        items={[
          { label: 'Todos los productos', to: '/' },
          { label: 'Acer beTouch E120' },
        ]}
      />,
    );

    const link = screen.getByRole('link', { name: 'Todos los productos' });
    expect(link).toHaveAttribute('href', '/');
    expect(screen.getByText('Acer beTouch E120')).toHaveAttribute('aria-current', 'page');
  });
});
