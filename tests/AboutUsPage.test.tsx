import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AboutUsPage } from '../src/pages';
import renderWithProviders from './utils/test.utils';

describe('PageComponent', () => {
  it('Page renders correctly', () => {
    const badRoute = '/some/bad/route';
    renderWithProviders(
      <MemoryRouter initialEntries={[badRoute]}>
        <AboutUsPage dataTestId='page' />
      </MemoryRouter>
    );
    const page = screen.getByTestId('page');
    expect(page).toBeInTheDocument();
  });
  it('Page renders correctly', () => {
    const badRoute = '/some/bad/route';
    renderWithProviders(
      <MemoryRouter initialEntries={[badRoute]}>
        <AboutUsPage dataTestId='page' />
      </MemoryRouter>
    );
    const page = screen.getByTestId('page');
    expect(page).toMatchSnapshot();
  });
});