import { fireEvent, screen } from '@testing-library/react';
import { OrderButton } from '../src/ui';
import renderWithProviders from './utils/test.utils';
import { MemoryRouter } from 'react-router-dom';

const handleClick = jest.fn();

describe('OrderButton', () => {
  it('button click work correctly', () => {
    let step = 1;
    const addStep = (): void => {
      step += 1;
    };
    const badRoute = '/some/bad/route';
    renderWithProviders(
      <MemoryRouter initialEntries={[badRoute]}>
        <OrderButton type='button' disabled={false} onClick={() => addStep()} dataTestId='button'>
          <span />
        </OrderButton>
      </MemoryRouter>
    );
    const button = screen.getByTestId('button');
    fireEvent.click(button);
    expect(step).toBe(1);
  });
  it('button matches snapshot', () => {
    const badRoute = '/some/bad/route';
    renderWithProviders(
      <MemoryRouter initialEntries={[badRoute]}>
        <OrderButton type='button' disabled={false} onClick={handleClick} dataTestId='button'>
          <span />
        </OrderButton>
      </MemoryRouter>
      )
      const button = screen.getByTestId('button');
      expect(button).toMatchSnapshot();
  });
  it('button renders correctly', () => {
    const badRoute = '/some/bad/route';
    renderWithProviders(
      <MemoryRouter initialEntries={[badRoute]}>
        <OrderButton type='button' disabled={false} onClick={handleClick} dataTestId='button'>
          <span />
        </OrderButton>
      </MemoryRouter>
    );
    const button = screen.getByTestId('button');
    expect(button).toBeInTheDocument();
  });
});
