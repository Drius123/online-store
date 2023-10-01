import { MemoryRouter } from 'react-router-dom';
import renderWithProviders from './utils/test.utils';
import { BurgerBtn } from '../src/ui';

describe('BurgerBtn', () => {
  it('should work as expected', () => {
    const badRoute = '/some/bad/route';
    renderWithProviders(
      <MemoryRouter initialEntries={[badRoute]}>
        <BurgerBtn />
      </MemoryRouter>
    );
  });
});
