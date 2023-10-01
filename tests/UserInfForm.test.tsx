import { screen } from '@testing-library/react';
import UserInformationsForm from '../src/ui/user-inf-form/user-inf-form';
import renderWithProviders from './utils/test.utils';

describe('Form component', () => {
  it('form renders correctly', () => {
    renderWithProviders(<UserInformationsForm dataTestId='form' />);
    const form = screen.getByTestId('form');
    expect(form).toBeInTheDocument();
  });
	it('form matches snapshot', () => {
    renderWithProviders(<UserInformationsForm dataTestId='form' />);
    const form = screen.getByTestId('form');
    expect(form).toMatchSnapshot();
  });
});