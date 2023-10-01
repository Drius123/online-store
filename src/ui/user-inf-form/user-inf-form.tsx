import { FieldValues, useForm } from 'react-hook-form';
import { ObjectSchema } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { InputLoginAuth, SubmitButton } from '..';
import { registerStepTwoSchema } from '../../helpers';
import { DataForm, EnumText, UserFormProps } from '../../types';
import { RootState } from '../../store/store';
import styles from './user-inf-form.module.scss';
import { useSetUserProfileMutation } from '../../store/services/changeUserApi';

export default function UserInformationsForm({ dataTestId }: UserFormProps) {
  const customerId = useSelector((state: RootState) => state.user.user.id);
  const version = useSelector((state: RootState) => state.user.user.version);
  const selectSchema = (): ObjectSchema<FieldValues> => {
    return registerStepTwoSchema as ObjectSchema<FieldValues>;
  };

  const [setUserProfile] = useSetUserProfileMutation();
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
      const actions = [
        {
          action: 'changeEmail',
          email: data.email,
        },
        {
          action: 'setDateOfBirth',
          dateOfBirth: data.birthday.toLocaleDateString('en-ca'),
        },
        {
          action: 'setFirstName',
          firstName: data.firstName,
        },
        {
          action: 'setLastName',
          lastName: data.lastName,
        },
      ];
      setUserProfile({ customerId, version, actions });
    }
  };

  const [readOnly, setReadOnly] = useState<boolean>(true);
  return (
    <form action='' onSubmit={handleSubmit(onSubmit)} data-testid={dataTestId}>
      <InputLoginAuth
        id='email'
        type='email'
        title={EnumText.LABEL_EMAIL}
        placeholder={EnumText.PLACEHOLDER_EMAIL}
        register={register}
        fieldName='email'
        error={Boolean(errors.email)}
        value={useSelector((state: RootState) => state.user.user.email)}
        readonly={readOnly}
        profile
      />
      {errors.email && <span id={styles.error}>{errors.email.message?.toString()}</span>}
      <InputLoginAuth
        id='firstName'
        type='text'
        title={EnumText.LABEL_NAME}
        placeholder={EnumText.PLACEHOLDER_NAME}
        register={register}
        fieldName='firstName'
        value={useSelector((state: RootState) => state.user.user.firstName)}
        error={Boolean(errors.firstName)}
        readonly={readOnly}
        profile
      />
      {errors.firstName && <span id={styles.error}>{errors.firstName.message?.toString()}</span>}
      <InputLoginAuth
        id='lastName'
        type='text'
        title={EnumText.LABEL_LAST_NAME}
        placeholder={EnumText.PLACEHOLDER_LAST_NAME}
        register={register}
        fieldName='lastName'
        error={Boolean(errors.lastName)}
        value={useSelector((state: RootState) => state.user.user.lastName)}
        readonly={readOnly}
        profile
      />
      {errors.lastName && <span id={styles.error}>{errors.lastName.message?.toString()}</span>}
      <InputLoginAuth
        id='birthday'
        type='date'
        title={EnumText.LABEL_BIRTHDAY}
        placeholder={EnumText.PLACEHOLDER_BIRTHDAY}
        register={register}
        fieldName='birthday'
        error={Boolean(errors.birthday)}
        value={useSelector((state: RootState) => state.user.user.dateOfBirth)}
        readonly={readOnly}
        profile
      />
      {errors.birthday && <span id={styles.error}>{errors.birthday.message?.toString()}</span>}
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
