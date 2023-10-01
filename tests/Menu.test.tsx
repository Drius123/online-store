import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Menu } from '../src/ui';
import renderWithProviders from './utils/test.utils';

describe('Menu', () => {
  it('should work as expected', () => {
    const badRoute = '/some/bad/route';
    renderWithProviders(
      <MemoryRouter initialEntries={[badRoute]}>
        <Menu burger={false} dataTestId='menu'/>
      </MemoryRouter>
    )
    const menu = screen.getByTestId('menu');
    expect(menu).toMatchSnapshot();
  });
  it('menu renders correctly', () => {
    const badRoute = '/some/bad/route';
    renderWithProviders(
      <MemoryRouter initialEntries={[badRoute]}>
        <Menu burger={false} dataTestId='menu' />
      </MemoryRouter>
    );
    const menu = screen.getByTestId('menu');
    expect(menu).toBeInTheDocument();
  });
});
