import { fireEvent, screen } from '@testing-library/react';
import { SearchBar } from '../src/ui';
import renderWithProviders from './utils/test.utils';

describe('SearchBar', () => {
  it('searchbar matches snapshot', () => {
    renderWithProviders(<SearchBar dataTestId='searchbar' />);
    const searchBar = screen.getByTestId('searchbar');
    expect(searchBar).toMatchSnapshot();
  });
  it('searchbar renders correctly', () => {
    renderWithProviders(<SearchBar dataTestId='searchbar' />);
    const searchBar = screen.getByTestId('searchbar');
    expect(searchBar).toBeInTheDocument();
  });
  it('searchbar input work correctly', () => {
    renderWithProviders(<SearchBar dataTestId='searchbar' />);
    const input = screen.getByDisplayValue('');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input).toHaveValue('test');
  });
});
