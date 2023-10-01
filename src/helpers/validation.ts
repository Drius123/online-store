import { ObjectSchema, string, object, date } from 'yup';
import RegExp from './regexp';
import { ValueSchema } from '../types';

const value: ValueSchema = {
  stringEmpty: string().required('Поле не может быть пустым'),
  firstName: string()
    .required('Поле не может быть пустым')
    .matches(RegExp.notSymbol, 'Поле не должно содержать спецсимволов или цифр'),
  lastName: string()
    .required('Поле не может быть пустым')
    .matches(RegExp.notSymbol, 'Поле не должно содержать спецсимволов или цифр'),
  numbers: string().matches(RegExp.numbers, 'Поле должно содержать только цифры'),
  password: string()
    .required('Поле не может быть пустым')
    .matches(RegExp.leastEightCharacters, 'Поле должно содержать не менее 8 символов')
    .matches(RegExp.capitalized, 'Поле должно содержать символ с заглавной буквой')
    .matches(RegExp.numbers, 'Поле должно содержать цифры'),
  old_password: string()
    .required('Поле не может быть пустым')
    .matches(RegExp.leastEightCharacters, 'Поле должно содержать не менее 8 символов')
    .matches(RegExp.capitalized, 'Поле должно содержать символ с заглавной буквой')
    .matches(RegExp.numbers, 'Поле должно содержать цифры'),
  new_password: string()
    .required('Поле не может быть пустым')
    .matches(RegExp.leastEightCharacters, 'Поле должно содержать не менее 8 символов')
    .matches(RegExp.capitalized, 'Поле должно содержать символ с заглавной буквой')
    .matches(RegExp.numbers, 'Поле должно содержать цифры'),
  email: string().required('Поле не может быть пустым').matches(RegExp.email, 'Введите корректный e-mail'),
  birthday: date()
    .typeError('Необходимо ввести дату рождения')
    .transform((v) => {
      return new Date(v);
    })
    .max(
      new Date(new Date().getFullYear() - 13, new Date().getMonth(), new Date().getDate()),
      'Вам должно быть более 13 лет'
    ),
  city: string()
    .required('Поле не может быть пустым')
    .matches(RegExp.notSymbol, 'Поле не должно содержать спецсимволов или цифр'),
  country: string()
    .transform((v) => {
      return v === 'Страна' ? '' : v;
    })
    .required('Необходимо выбрать страну'),
  postIndex: string()
    .required('Поле не может быть пустым')
    .matches(RegExp.postIndex, 'Поле должно содержать индекс состоящий из шести цифр'),
};

export const registerStepOneSchema: ObjectSchema<{
  password: string;
  email: string;
}> = object().shape({
  password: value.password,
  email: value.email,
});

export const registerStepTwoSchema: ObjectSchema<{
  lastName: string;
  firstName: string;
  birthday: Date | undefined;
}> = object().shape({
  lastName: value.lastName,
  firstName: value.firstName,
  birthday: value.birthday,
});

export const registerStepThreeSchema: ObjectSchema<{
  city: string;
  street: string;
  postIndex: string | undefined;
  country: string;
}> = object().shape({
  city: value.city,
  street: value.stringEmpty,
  postIndex: value.postIndex,
  country: value.country,
});

export const registerPassSchema: ObjectSchema<{
  old_password: string;
  new_password: string;
}> = object().shape({
  old_password: value.old_password,
  new_password: value.new_password,
});
