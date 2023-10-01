import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AuthPage from '../src/pages/auth-page/auth-page';
import renderWithProviders from './utils/test.utils';

describe('PageComponent', () => {
  it('Page renders correctly', () => {
    const badRoute = '/some/bad/route';
    renderWithProviders(
      <MemoryRouter initialEntries={[badRoute]}>
        <AuthPage dataTestId='page' />
      </MemoryRouter>
    );
    const page = screen.getByTestId('page');
    expect(page).toBeInTheDocument();
  });
  it('Page renders correctly', () => {
    const badRoute = '/some/bad/route';
    renderWithProviders(
      <MemoryRouter initialEntries={[badRoute]}>
        <AuthPage dataTestId='page' />
      </MemoryRouter>
    );
    const page = screen.getByTestId('page');
    expect(page).toMatchSnapshot();
  });
});