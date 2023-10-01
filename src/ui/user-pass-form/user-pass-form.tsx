import { FieldValues, useForm } from 'react-hook-form';
import { ObjectSchema } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { InputLoginAuth, SubmitButton } from '..';
import { DataForm, EnumText, UserFormProps } from '../../types';
import { RootState } from '../../store/store';
//  import styles from './user-pass-form.module.scss';
import { useSetUserPasswordMutation } from '../../store/services/changeUserPassApi';
import { registerPassSchema } from '../../helpers/validation';

export default function UserPassForm({ dataTestId }: UserFormProps) {
  const customerId = useSelector((state: RootState) => state.user.user.id);
  const version = useSelector((state: RootState) => state.user.user.version);
  const selectSchema = (): ObjectSchema<FieldValues> => {
    return registerPassSchema as ObjectSchema<FieldValues>;
  };

  const [setUserPassword, { error }] = useSetUserPasswordMutation();
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

  const onSubmit = (data: FieldValues) => {
    if (data as DataForm) {
      setUserPassword({ customerId, version, currentPassword: data.old_password, newPassword: data.new_password });
    }
  };

  if (error && 'status' in error && error?.status === 409) {
    // eslint-disable-next-line no-console
    console.log('Не совпадение версии на сервере и на клиенте');
  }

  const [readOnly, setReadOnly] = useState<boolean>(true);
  return (
    <form action='' onSubmit={handleSubmit(onSubmit)} data-testid={dataTestId}>
      <InputLoginAuth
        id='old_password'
        type='password'
        title={EnumText.LABEL_PASSWORD}
        placeholder={EnumText.PLACEHOLDER_OLD_PASSWORD}
        register={register}
        fieldName='old_password'
        error={Boolean(errors.old_password)}
        readonly={readOnly}
        profile
      />
      {errors.old_password && <span>{errors.old_password.message?.toString()}</span>}
      <InputLoginAuth
        id='new_password'
        type='password'
        title={EnumText.LABEL_PASSWORD}
        placeholder={EnumText.PLACEHOLDER_NEW_PASSWORD}
        register={register}
        fieldName='new_password'
        error={Boolean(errors.new_password)}
        readonly={readOnly}
        profile
      />
      {errors.new_password && <span>{errors.new_password.message?.toString()}</span>}
      <SubmitButton
        type={!readOnly ? 'button' : 'submit'}
        disabled={!(Object.keys(errors).length === 0)}
        onClick={() => (Object.keys(errors).length === 0 ? setReadOnly(!readOnly) : null)}
      >
        {readOnly ? EnumText.TEXT_BUTTON_CHANGE : EnumText.TEXT_USER_SAVE_CHANGE}
      </SubmitButton>
    </form>
  );
}
