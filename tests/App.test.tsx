import { MemoryRouter } from 'react-router-dom';
import renderWithProviders from './utils/test.utils';
import App from '../src/App';

describe('App', () => {
  it('should work as expected', () => {
    const badRoute = '/some/bad/route';
    renderWithProviders(
      <MemoryRouter initialEntries={[badRoute]}>
        <App />
      </MemoryRouter>
    );
  });
});
