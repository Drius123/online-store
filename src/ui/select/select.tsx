import { EnumText, SelectFormProps } from '../../types';
import styles from './select.module.scss';

export default function SelectForm({
  id,
  register,
  fieldName,
  data,
  error,
  value,
  readonly,
  profile,
  datatestId,
}: SelectFormProps) {
  return (
    <select
      className={`${styles.select} ${error ? styles.error : ''}`}
      id={id}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...register(fieldName)}
      defaultValue={value}
      disabled={readonly}
      data-testid={datatestId}
    >
      {profile ? null : (
        <option selected disabled>
          {' '}
          {EnumText.LABEL_COUNTRY}
        </option>
      )}
      {data.map((item) => {
        return (
          <option value={item.value} key={item.value}>
            {item.text}
          </option>
        );
      })}
    </select>
  );
}
