import { FieldValues, useForm } from 'react-hook-form';
import { ObjectSchema } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { InputLoginAuth, SubmitButton } from '..';
import { EnumText } from '../../types';
import SelectForm from '../select/select';
import { countries } from '../data/arrays';
import { registerStepThreeSchema } from '../../helpers';
import { RootState } from '../../store/store';
import styles from './user-addresses.module.scss';

export default function UserAddressesForm() {
  const selectSchema = (): ObjectSchema<FieldValues> => {
    return registerStepThreeSchema as ObjectSchema<FieldValues>;
  };

  const {
    register,
    handleSubmit,
    // watch,
    // clearErrors,
    // trigger,
    // setError,
    formState: { errors },
  } = useForm({
    mode: 'all',
    criteriaMode: 'all',
    shouldFocusError: true,
    resolver: yupResolver(selectSchema()),
  });

  const onSubmit = () => {};

  const [readOnly, setReadOnly] = useState<boolean>(true);
  return (
    <form action='' onSubmit={handleSubmit(onSubmit)}>
      <InputLoginAuth
        id='city'
        type='text'
        title={EnumText.LABEL_CITY}
        placeholder={EnumText.PLACEHOLDER_CITY}
        register={register}
        fieldName='city'
        error={Boolean(errors.city)}
        value={useSelector((state: RootState) => state.user.user.addresses['0'].city)}
        readonly={readOnly}
        profile
      />
      {errors.city && <span id={styles.error}>{errors.city.message?.toString()}</span>}
      <InputLoginAuth
        id='street'
        type='text'
        title={EnumText.LABEL_STREET}
        placeholder={EnumText.PLACEHOLDER_STREET}
        register={register}
        fieldName='street'
        error={Boolean(errors.street)}
        value={useSelector((state: RootState) => state.user.user.addresses['0'].streetName)}
        readonly={readOnly}
        profile
      />
      {errors.street && <span id={styles.error}>{errors.street.message?.toString()}</span>}
      <SelectForm
        id='country'
        register={register}
        fieldName='country'
        data={countries}
        error={Boolean(errors.country)}
        value={useSelector((state: RootState) => state.user.user.addresses['0'].country)}
        profile
        readonly={readOnly}
      />
      {errors.country && <span id={styles.error}>{errors.country.message?.toString()}</span>}
      <InputLoginAuth
        id='postIndex'
        type='text'
        title={EnumText.LABEL_POST_INDEX}
        placeholder={EnumText.PLACEHOLDER_POST_INDEX}
        register={register}
        fieldName='postIndex'
        error={Boolean(errors.postIndex)}
        value={useSelector((state: RootState) => state.user.user.addresses['0'].postalCode)}
        readonly={readOnly}
        profile
      />
      {errors.postIndex && <span id={styles.error}>{errors.postIndex.message?.toString()}</span>}
      <SubmitButton
        type={readOnly ? 'button' : 'submit'}
        disabled={!(Object.keys(errors).length === 0)}
        onClick={() => (Object.keys(errors).length === 0 ? setReadOnly(!readOnly) : null)}
      >
        {readOnly ? EnumText.TEXT_BUTTON_CHANGE : EnumText.TEXT_USER_SAVE_CHANGE}
      </SubmitButton>
    </form>
  );
}
