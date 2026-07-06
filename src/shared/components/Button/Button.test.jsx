import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils/render-with-providers.jsx';
import { Button } from './Button.jsx';

describe('Button', () => {
  it('renders its children', () => {
    renderWithProviders(<Button>Añadir</Button>);
    expect(screen.getByRole('button', { name: 'Añadir' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    renderWithProviders(<Button onClick={onClick}>Añadir</Button>);

    fireEvent.click(screen.getByRole('button', { name: 'Añadir' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const onClick = vi.fn();
    renderWithProviders(
      <Button onClick={onClick} disabled>
        Añadir
      </Button>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Añadir' }));

    expect(onClick).not.toHaveBeenCalled();
  });
});
