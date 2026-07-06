import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../../shared/test-utils/render-with-providers.jsx';
import { ProductCard } from './ProductCard.jsx';

const product = {
  id: 'abc123',
  brand: 'Acer',
  model: 'Liquid Z6',
  price: '170',
  imgUrl: 'https://example.com/acer-liquid-z6.jpg',
};

describe('ProductCard', () => {
  it('renders brand, model and formatted price', () => {
    renderWithProviders(<ProductCard product={product} />);

    expect(screen.getByText('Acer')).toBeInTheDocument();
    expect(screen.getByText('Liquid Z6')).toBeInTheDocument();
    expect(screen.getByText('170,00 €')).toBeInTheDocument();
  });

  it('links to the product details page', () => {
    renderWithProviders(<ProductCard product={product} />);

    expect(screen.getByRole('link')).toHaveAttribute('href', '/product/abc123');
  });

  it('shows a placeholder when the product has no price', () => {
    renderWithProviders(<ProductCard product={{ ...product, price: '' }} />);
    expect(screen.getByText('—')).toBeInTheDocument();
  });
});
