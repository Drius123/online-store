import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Header } from '../src/components';
import renderWithProviders from './utils/test.utils';

describe('Header', () => {
  it('header renders correctly', () => {
    const badRoute = '/some/bad/route';
    renderWithProviders(
      <MemoryRouter initialEntries={[badRoute]}>
        <Header dataTestId='header' />
      </MemoryRouter>
    );
    const header = screen.getByTestId('header');
    expect(header).toBeInTheDocument();
  });
  it('should work as expected', () => {
    const badRoute = '/some/bad/route';
    renderWithProviders(
      <MemoryRouter initialEntries={[badRoute]}>
        <Header dataTestId='header' />
      </MemoryRouter>
    );
    const header = screen.getByTestId('header');
    expect(header).toMatchSnapshot();
  });
});
