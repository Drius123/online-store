import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Filter from '../src/components/filter/filter';
import renderWithProviders from './utils/test.utils';

describe('filtercomponent', () => {
  it('filter renders correctly', () => {
    const badRoute = '/some/bad/route';
    renderWithProviders(
      <MemoryRouter initialEntries={[badRoute]}>
        <Filter dataTestId='filter' />
      </MemoryRouter>
    );
    const filter = screen.getByTestId('filter');
    expect(filter).toBeInTheDocument();
  });
  it('filter renders correctly', () => {
    const badRoute = '/some/bad/route';
    renderWithProviders(
      <MemoryRouter initialEntries={[badRoute]}>
        <Filter dataTestId='filter' />
      </MemoryRouter>
    );
    const filter = screen.getByTestId('filter');
    expect(filter).toMatchSnapshot();
  });
});