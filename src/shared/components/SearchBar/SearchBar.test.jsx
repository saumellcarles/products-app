import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils/render-with-providers.jsx';
import { SearchBar } from './SearchBar.jsx';

describe('SearchBar', () => {
  it('renders the label as an accessible name for the input', () => {
    renderWithProviders(<SearchBar label="Buscar por marca o modelo" value="" onChange={vi.fn()} />);
    expect(screen.getByLabelText('Buscar por marca o modelo')).toBeInTheDocument();
  });

  it('calls onChange with the typed value', () => {
    const onChange = vi.fn();
    renderWithProviders(<SearchBar label="Buscar" value="" onChange={onChange} />);

    fireEvent.change(screen.getByLabelText('Buscar'), { target: { value: 'acer' } });

    expect(onChange).toHaveBeenCalledWith('acer');
  });

  it('does not show a clear button when the value is empty', () => {
    renderWithProviders(<SearchBar label="Buscar" value="" onChange={vi.fn()} />);
    expect(screen.queryByLabelText('Borrar búsqueda')).not.toBeInTheDocument();
  });

  it('shows a clear button that resets the value when there is a query', () => {
    const onChange = vi.fn();
    renderWithProviders(<SearchBar label="Buscar" value="acer" onChange={onChange} />);

    fireEvent.click(screen.getByLabelText('Borrar búsqueda'));

    expect(onChange).toHaveBeenCalledWith('');
  });
});
