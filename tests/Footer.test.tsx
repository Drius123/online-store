import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Footer } from '../src/components';
import renderWithProviders from './utils/test.utils';

describe('Footer', () => {
  it('header renders correctly', () => {
    const badRoute = '/some/bad/route';
    renderWithProviders(
      <MemoryRouter initialEntries={[badRoute]}>
        <Footer dataTestId='footer' />
      </MemoryRouter>
    );
    const header = screen.getByTestId('footer');
    expect(header).toBeInTheDocument();
  });
});
