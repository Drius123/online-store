import { MemoryRouter } from 'react-router-dom';
import renderWithProviders from './utils/test.utils';
import { ButtonClose } from '../src/ui';

describe('ButtonClose', () => {
  it('should work as expected', () => {
    const badRoute = '/some/bad/route';
    renderWithProviders(
      <MemoryRouter initialEntries={[badRoute]}>
        <ButtonClose />
      </MemoryRouter>
    );
  });
});
