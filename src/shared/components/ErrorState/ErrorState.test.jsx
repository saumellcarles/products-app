import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils/render-with-providers.jsx';
import { ErrorState } from './ErrorState.jsx';

describe('ErrorState', () => {
  it('renders the given message', () => {
    renderWithProviders(<ErrorState message="No se han podido cargar los productos." />);
    expect(screen.getByText('No se han podido cargar los productos.')).toBeInTheDocument();
  });

  it('does not render a retry button when onRetry is not provided', () => {
    renderWithProviders(<ErrorState message="Error" />);
    expect(screen.queryByRole('button', { name: 'Reintentar' })).not.toBeInTheDocument();
  });

  it('calls onRetry when the retry button is clicked', () => {
    const onRetry = vi.fn();
    renderWithProviders(<ErrorState message="Error" onRetry={onRetry} />);

    fireEvent.click(screen.getByRole('button', { name: 'Reintentar' }));

    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
