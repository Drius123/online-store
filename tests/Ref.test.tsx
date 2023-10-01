import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { Ref } from '../src/ui';

describe('ref', () => {
  it('should work as expected', () => {
    const badRoute = '/some/bad/route';
    const ref = renderer
      .create(
        <MemoryRouter initialEntries={[badRoute]}>
          <Ref link={badRoute} imgLink='test' title='test' id='test' type='form' />
        </MemoryRouter>
      )
      .toJSON();
    expect(ref).toMatchSnapshot();
  });
  it('ref renders correctly', () => {
    const badRoute = '/some/bad/route';
    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <Ref link={badRoute} imgLink='test' title='test' id='test' type='form' dataTestId='ref' />
      </MemoryRouter>
    );
    const ref = screen.getByTestId('ref');
    expect(ref).toBeInTheDocument();
  });
});
