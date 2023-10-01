import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FormLoginAuth from '../src/ui/form-login-auth/form-login-auth';
import renderWithProviders from './utils/test.utils';

describe('Form component', () => {
  it('form renders correctly', () => {
    const badRoute = '/some/bad/route';
    renderWithProviders(
      <MemoryRouter initialEntries={[badRoute]}>
        <FormLoginAuth type='auth' dataTestId='form' />
      </MemoryRouter>
    );
    const form = screen.getByTestId('form');
    expect(form).toBeInTheDocument();
  });
	it('form renders correctly', () => {
    const badRoute = '/some/bad/route';
    renderWithProviders(
      <MemoryRouter initialEntries={[badRoute]}>
        <FormLoginAuth type='auth' dataTestId='form' />
      </MemoryRouter>
    );
    const form = screen.getByTestId('form');
    expect(form).toMatchSnapshot();
  });
});
