import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../index';

describe('Search', () => {
  test('renders the search component', () => {
    render(<Search selectedCity={null} onSearchChange={jest.fn()} />);

    const searchComponent = screen.getByTestId('city-autocomplete');
    expect(searchComponent).toBeInTheDocument();
  });

  test('clears the search input when reset button is clicked', () => {
    render(<Search selectedCity={null} onSearchChange={jest.fn()} />);

    const searchInput = screen.getByRole('combobox') as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'London' } });

    const resetButton = screen.getByTitle('Close');
    fireEvent.click(resetButton);

    expect(searchInput.value).toBe('');
  });
});
