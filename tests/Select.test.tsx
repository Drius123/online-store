import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import SelectForm from '../src/ui/select/select';

const callback = jest.fn();

describe('select', () => {
  it('should work as expected', () => {
    const select = renderer
      .create(
        <SelectForm id='1' register={callback} fieldName='somename' data={[{text: '1', value: '1'}]}/>
      )
      .toJSON();
    expect(select).toMatchSnapshot();
  });
  it('select renders correctly', () => {
    render(
      <SelectForm id='1' register={callback} fieldName='somename' data={[{text: '1', value: '1'}]} value={'red'} datatestId='select'/>
    );
    const select = screen.getByTestId('select');
    expect(select).toBeInTheDocument();
  });
});
