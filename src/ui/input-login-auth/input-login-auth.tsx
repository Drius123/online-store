/* eslint-disable react/jsx-props-no-spreading */
import { InputForm } from '../../types';
import styles from './input-login-auth.module.scss';

export default function InputLoginAuth({
  id,
  title,
  placeholder,
  type,
  register,
  fieldName,
  value,
  error,
  dataTestId,
  readonly,
  profile,
}: InputForm) {
  return (
    <label htmlFor={fieldName}>
      <span className={profile ? '' : 'visually-hidden'}>{title}</span>
      <input
        className={`${styles.input} ${error ? styles.error : ''} ${readonly ? styles.readonly : ''}`}
        id={id}
        placeholder={placeholder}
        type={type}
        {...register(fieldName)}
        autoComplete='on'
        defaultValue={value}
        readOnly={readonly}
        data-testid={dataTestId}
      />
    </label>
  );
}
