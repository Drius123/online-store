import { screen } from '@testing-library/react';
import renderWithProviders from './utils/test.utils';
import { MemoryRouter } from 'react-router-dom';
import { BurgerMenu } from '../src/ui';

describe('burger', () => {
  it('should work as expected', () => {
    const badRoute = '/some/bad/route';
    renderWithProviders(
      <MemoryRouter initialEntries={[badRoute]}>
        <BurgerMenu  dataTestId='burger'/>
      </MemoryRouter>
    )
    const burger = screen.getByTestId('burger');
    expect(burger).toMatchSnapshot();
  });
  it('burger renders correctly', () => {
    const badRoute = '/some/bad/route';
    renderWithProviders(
      <MemoryRouter initialEntries={[badRoute]}>
        <BurgerMenu dataTestId='burger' />
      </MemoryRouter>
    );
    const burger = screen.getByTestId('burger');
    expect(burger).toBeInTheDocument();
  });
});
