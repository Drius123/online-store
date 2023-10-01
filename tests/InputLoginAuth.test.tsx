import { fireEvent, render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { InputLoginAuth } from '../src/ui';
import { EnumText } from '../src/types';

const handleClick = jest.fn();

describe('input test', () => {
  it('input matches snapshot', () => {
    const id = [
      'email',
      'password',
      'phone',
      'firstName',
      'lastName',
      'birthday',
      'city',
      'street',
      'postIndex',
      'country',
    ];
    id.forEach((item) => {
      const input = renderer
        .create(
          <InputLoginAuth
            id={item}
            type='text'
            title={EnumText.LABEL_COUNTRY}
            placeholder={EnumText.PLACEHOLDER_COUNTRY}
            register={handleClick}
            fieldName='country'
          />
        )
        .toJSON();
      expect(input).toMatchSnapshot();
    });
  });
  it('input renders correctly', () => {
    render(
      <InputLoginAuth
        id='email'
        type='text'
        title={EnumText.LABEL_COUNTRY}
        placeholder={EnumText.PLACEHOLDER_COUNTRY}
        register={handleClick}
        fieldName='email'
        dataTestId='input'
      />
    );
    const input = screen.getByTestId('input');
    expect(input).toBeInTheDocument();
  });
  it('email inputs change correctly', () => {
    render(
      <InputLoginAuth
        id='email'
        type='email'
        title={EnumText.LABEL_COUNTRY}
        placeholder={EnumText.PLACEHOLDER_COUNTRY}
        register={handleClick}
        fieldName='email'
        dataTestId='input'
      />
    );
    const input = screen.getByTestId('input');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input).toHaveValue('test');
  });
  it('number inputs change correctly', () => {
    render(
      <InputLoginAuth
        id='password'
        type='password'
        title={EnumText.LABEL_COUNTRY}
        placeholder={EnumText.PLACEHOLDER_COUNTRY}
        register={handleClick}
        fieldName='password'
        dataTestId='input'
      />
    );
    const input = screen.getByTestId('input');
    fireEvent.change(input, { target: { value: 12312 } });
    expect(input).toHaveValue('12312');
  });
  it('date inputs change correctly', () => {
    render(
      <InputLoginAuth
        id='birthday'
        type='date'
        title={EnumText.LABEL_COUNTRY}
        placeholder={EnumText.PLACEHOLDER_COUNTRY}
        register={handleClick}
        fieldName='birthday'
        dataTestId='input'
      />
    );
    const input = screen.getByTestId('input');
    fireEvent.change(input, { target: { value: '2023-08-18' } });
    expect(input).toHaveValue('2023-08-18');
  });
});
