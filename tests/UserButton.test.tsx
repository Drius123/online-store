import renderer from 'react-test-renderer';
import { fireEvent, render, screen } from '@testing-library/react';
import { UserButton } from '../src/ui';

const handleClick = jest.fn();

describe('OrderButton', () => {
  it('input matches snapshot', () => {
    const button = renderer.create(<UserButton authed={false} callback={handleClick} />).toJSON();
    expect(button).toMatchSnapshot();
  });
  it('button renders correctly', () => {
    render(<UserButton authed={false} dataTestId='button' callback={handleClick} />);
    const button = screen.getByTestId('button');
    expect(button).toBeInTheDocument();
  });
  it('button click work correctly', () => {
    let step = 1;
    const addStep = (): void => {
      step += 1;
    };
    render(<UserButton authed={false} callback={() => addStep()} dataTestId='button' />);
    const button = screen.getByTestId('button');
    fireEvent.click(button);
    expect(step).toBe(2);
  });
});
