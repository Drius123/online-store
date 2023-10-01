import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { UserMenu } from '../src/ui';
import renderWithProviders from './utils/test.utils';

const handleClick = jest.fn();

describe('UserMenu', () => {
  it('usermenu renders correctly', () => {
    const badRoute = '/some/bad/route';
    renderWithProviders(
      <MemoryRouter initialEntries={[badRoute]}>
        <UserMenu authed={false} active={false} setActive={handleClick} dataTestId='menu' />
      </MemoryRouter>
    );
    const menu = screen.getByTestId('menu');
    expect(menu).toBeInTheDocument();
  });
  it('usermenu matches snapshot', () => {
    const badRoute = '/some/bad/route';
    renderWithProviders(
      <MemoryRouter initialEntries={[badRoute]}>
        <UserMenu authed={false} active={false} setActive={handleClick} dataTestId='menu' />
      </MemoryRouter>);
    const menu = screen.getByTestId('menu');
    expect(menu).toMatchSnapshot();
  });
});
