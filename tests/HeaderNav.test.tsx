import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HeaderNav } from '../src/ui';
import renderWithProviders from './utils/test.utils';

describe('HeaderNav', () => {
  it('should work as expected', () => {
    const badRoute = '/some/bad/route';
    renderWithProviders(
        <MemoryRouter initialEntries={[badRoute]}>
          <HeaderNav burger={false} dataTestId='header-nav'/>
        </MemoryRouter>
      );
    const nav = screen.getByTestId('header-nav');
    expect(nav).toMatchSnapshot();
  });
  it('nav renders correctly', () => {
    const badRoute = '/some/bad/route';
    renderWithProviders(
      <MemoryRouter initialEntries={[badRoute]}>
        <HeaderNav burger={false} dataTestId='header-nav' />
      </MemoryRouter>
    );
    const nav = screen.getByTestId('header-nav');
    expect(nav).toBeInTheDocument();
  });
});
