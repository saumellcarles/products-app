import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils/render-with-providers.jsx';
import { EmptyState } from './EmptyState.jsx';

describe('EmptyState', () => {
  it('renders the default message', () => {
    renderWithProviders(<EmptyState />);
    expect(screen.getByText('No se han encontrado resultados.')).toBeInTheDocument();
  });

  it('renders a custom message', () => {
    renderWithProviders(<EmptyState message='No se han encontrado resultados para "xyz".' />);
    expect(screen.getByText('No se han encontrado resultados para "xyz".')).toBeInTheDocument();
  });
});
