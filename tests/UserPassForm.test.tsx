import { screen } from '@testing-library/react';
import UserPassForm from '../src/ui/user-pass-form/user-pass-form';
import renderWithProviders from './utils/test.utils';

describe('Form component', () => {
  it('form renders correctly', () => {
    renderWithProviders(<UserPassForm dataTestId='form' />);
    const form = screen.getByTestId('form');
    expect(form).toBeInTheDocument();
  });
  it('form matches snapshot', () => {
    renderWithProviders(<UserPassForm dataTestId='form' />);
    const form = screen.getByTestId('form');
    expect(form).toMatchSnapshot();
  });
});