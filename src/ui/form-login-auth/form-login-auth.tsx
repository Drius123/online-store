import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { ObjectSchema } from 'yup';
import classNames from 'classnames';
import { yupResolver } from '@hookform/resolvers/yup';
import { Address, Customer, CustomerWithAddress, DataForm, EnumText, FormType, HTTPError } from '../../types';
import { InputLoginAuth, SubmitButton, Ref } from '..';
import { countries } from '../data/arrays';
import routeNames from '../../routing/routs';
import { registerStepOneSchema, registerStepTwoSchema, registerStepThreeSchema } from '../../helpers';
import { refreshToken } from '../../store/services/refreshToken';
import { RootState } from '../../store/store';
import SelectForm from '../select/select';
import { useRegisterUserWithAddressMutation } from '../../store/services/registrationWithAddressApi';
import { useSetDefAddressMutation } from '../../store/services/setDefAddressApi';
import { useAuthenticationUserMutation } from '../../store/services/authUserApi';
import { useGetUserTokenMutation } from '../../store/services/userTokenApi';
import arrow from '../../assets/arrow-register.svg';
import styles from './form-login-auth.module.scss';

export default function FormLoginAuth({ type, dataTestId }: FormType) {
  const [step, setStep] = useState(1);
  //   const [registerUser, {error: errorRegistration}] = useRegisterUserMutation();
  const [registerUserWithAddress, { error: errorRegistrationWithAddress }] = useRegisterUserWithAddressMutation();
  const [authUser, { error: errorAuth }] = useAuthenticationUserMutation();
  const [tokenUser, { error: errorGetToken }] = useGetUserTokenMutation();
  const [setDefAddress, { error: errorSetDefAddress }] = useSetDefAddressMutation();
  const [formData, setFormData] = useState({});

  const signin = useSelector((state: RootState) => !(Object.keys(state.user.user).length === 0));

  const clickTokenUser = (authCustomer: Customer) => {
    // eslint-disable-next-line no-console
    tokenUser(authCustomer).then((result) => console.log(result));
  };

  const selectSchema = (currentStep: number): ObjectSchema<FieldValues> => {
    if (currentStep === 1) {
      return registerStepOneSchema as ObjectSchema<FieldValues>;
    }
    if (currentStep === 2) {
      return registerStepTwoSchema as ObjectSchema<FieldValues>;
    }
    if (currentStep === 3) {
      return registerStepThreeSchema as ObjectSchema<FieldValues>;
    }
    return registerStepOneSchema as ObjectSchema<FieldValues>;
  };

  const {
    register,
    handleSubmit,
    // watch,
    // clearErrors,
    // trigger,
    setError,
    formState: { errors },
  } = useForm({
    mode: 'all',
    criteriaMode: 'all',
    shouldFocusError: true,
    resolver: yupResolver(selectSchema(step)),
  });

  const clickAuthUser = (authCustomer: Customer) => {
    authUser(authCustomer).then((result) => {
      // console.log('authUser', result);
      if ('error' in result && 'status' in result.error && result.error.status === 400) {
        const error = result.error as HTTPError;
        setError('root.serverError', {
          type: '400',
          message: error.data.message,
        });
      }
    });
  };

  const clickRegisterUserWithAddress = (customer: CustomerWithAddress) => {
    registerUserWithAddress(customer).then((result) => {
      if (result && 'data' in result && 'customer' in result.data) {
        clickAuthUser(customer);
        clickTokenUser(customer);
        if (result.data.customer.addresses[0].id && result.data.customer.id) {
          const customerId = result.data.customer.id;
          const addressId = result.data.customer.addresses[0].id;
          const action = 'addBillingAddressId';
          setDefAddress({ customerId, addressId, action });
        }
      }
      if ('error' in result && 'status' in result.error && result.error.status === 400) {
        const error = result.error as HTTPError;
        setError('root.serverError', {
          type: '400',
          message: error.data.message,
        });
      }
    });
  };

  const onSubmit = (data: FieldValues) => {
    if (type === 'register') {
      if (step === 1) {
        setStep(step + 1);
      }
      if (step === 2) {
        setStep(step + 1);
      }
      if (step === 3) {
        setStep(step + 1);
        if (data as DataForm) {
          // const customer = data as Customer;
          const address: Address = {
            streetName: data.street,
            postalCode: data.postIndex,
            city: data.city,
            country: data.country,
          };
          const customer = {
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            password: data.password,
            dateOfBirth: data.birthday,
            addresses: [address],
          };
          setFormData(customer);
          // clickRegisterUser(customer);
          clickRegisterUserWithAddress(customer);
        }
      }
    } else if (type === 'auth') {
      if (data && 'email' in data) {
        const authCustomer = data as Customer;
        setFormData(authCustomer);
        clickAuthUser(authCustomer);
        clickTokenUser(authCustomer);
      }
    }
  };

  const onBackPage = () => {
    if (step === 2) {
      setStep(step - 1);
      Object.keys(errors).forEach((key) => delete errors[key]);
    }
    if (step === 3) {
      setStep(step - 1);
      Object.keys(errors).forEach((key) => delete errors[key]);
    }
  };

  if (
    errorRegistrationWithAddress &&
    'status' in errorRegistrationWithAddress &&
    errorRegistrationWithAddress?.status === 401
  ) {
    refreshToken().then(() =>
      registerUserWithAddress(formData as CustomerWithAddress).then((result) => {
        if (result && 'data' in result && 'customer' in result.data) {
          clickAuthUser(formData as Customer);
          clickTokenUser(formData as Customer);
          if (result.data.customer.addresses[0].id && result.data.customer.id) {
            const customerId = result.data.customer.id;
            const addressId = result.data.customer.addresses[0].id;
            const action = 'addBillingAddressId';
            setDefAddress({ customerId, addressId, action });
          }
        }
      })
    );
  } else if (errorAuth && 'status' in errorAuth && errorAuth?.status === 401) {
    refreshToken().then(() => clickAuthUser(formData as Customer));
  } else if (errorAuth || errorGetToken || errorSetDefAddress)
    // eslint-disable-next-line no-console
    console.log(errorAuth || errorGetToken || errorSetDefAddress);
  else if (signin) {
    return (
      <div>
        <Navigate to={routeNames.HOME} />
      </div>
    );
  }
  return (
    <form
      className={classNames(styles.auth__form, styles.form)}
      action=''
      onSubmit={handleSubmit(onSubmit)}
      data-testid={dataTestId}
    >
      <div className={styles['input-wrapper']}>
        {(type === 'auth' || (type === 'register' && step === 1)) && (
          <>
            <InputLoginAuth
              id='email'
              type='email'
              title={EnumText.LABEL_EMAIL}
              placeholder={EnumText.PLACEHOLDER_EMAIL}
              register={register}
              fieldName='email'
              error={Boolean(errors.email)}
            />
            {errors.email && <span>{errors.email.message?.toString()}</span>}
          </>
        )}
        {(type === 'auth' || (type === 'register' && step === 1)) && (
          <>
            <InputLoginAuth
              id='password'
              type='password'
              title={EnumText.LABEL_PASSWORD}
              placeholder={EnumText.PLACEHOLDER_PASSWORD}
              register={register}
              fieldName='password'
              error={Boolean(errors.password)}
            />
            {errors.password && <span>{errors.password.message?.toString()}</span>}
          </>
        )}
        {type === 'register' && step === 1 && (
          <InputLoginAuth
            id='phone'
            type='tel'
            title={EnumText.LABEL_PHONE}
            placeholder={EnumText.PLACEHOLDER_PHONE}
            register={register}
            fieldName='phone'
          />
        )}
        {type === 'register' && step === 2 && (
          <>
            <InputLoginAuth
              id='firstName'
              type='text'
              title={EnumText.LABEL_NAME}
              placeholder={EnumText.PLACEHOLDER_NAME}
              register={register}
              fieldName='firstName'
              error={Boolean(errors.firstName)}
            />
            {errors.firstName && <span>{errors.firstName.message?.toString()}</span>}
          </>
        )}
        {type === 'register' && step === 2 && (
          <>
            <InputLoginAuth
              id='lastName'
              type='text'
              title={EnumText.LABEL_LAST_NAME}
              placeholder={EnumText.PLACEHOLDER_LAST_NAME}
              register={register}
              fieldName='lastName'
              error={Boolean(errors.lastName)}
            />
            {errors.lastName && <span>{errors.lastName.message?.toString()}</span>}
          </>
        )}
        {type === 'register' && step === 2 && (
          <>
            <InputLoginAuth
              id='birthday'
              type='date'
              title={EnumText.LABEL_BIRTHDAY}
              placeholder={EnumText.PLACEHOLDER_BIRTHDAY}
              register={register}
              fieldName='birthday'
              error={Boolean(errors.birthday)}
            />
            {errors.birthday && <span>{errors.birthday.message?.toString()}</span>}
          </>
        )}
        {type === 'register' && step === 3 && (
          <>
            <InputLoginAuth
              id='city'
              type='text'
              title={EnumText.LABEL_CITY}
              placeholder={EnumText.PLACEHOLDER_CITY}
              register={register}
              fieldName='city'
              error={Boolean(errors.city)}
            />
            {errors.city && <span>{errors.city.message?.toString()}</span>}
          </>
        )}
        {type === 'register' && step === 3 && (
          <>
            <InputLoginAuth
              id='street'
              type='text'
              title={EnumText.LABEL_STREET}
              placeholder={EnumText.PLACEHOLDER_STREET}
              register={register}
              fieldName='street'
              error={Boolean(errors.street)}
            />
            {errors.street && <span>{errors.street.message?.toString()}</span>}
          </>
        )}
        {type === 'register' && step === 3 && (
          <>
            <SelectForm
              id='country'
              register={register}
              fieldName='country'
              data={countries}
              error={Boolean(errors.country)}
            />
            {errors.country && <span>{errors.country.message?.toString()}</span>}
          </>
        )}
        {type === 'register' && step === 3 && (
          <>
            <InputLoginAuth
              id='postIndex'
              type='text'
              title={EnumText.LABEL_POST_INDEX}
              placeholder={EnumText.PLACEHOLDER_POST_INDEX}
              register={register}
              fieldName='postIndex'
              error={Boolean(errors.postIndex)}
            />
            {errors.postIndex && <span>{errors.postIndex.message?.toString()}</span>}
          </>
        )}
      </div>
      <div className={styles.form__button}>
        <SubmitButton type='submit' disabled={Object.keys(errors).length !== 0}>
          {type === 'auth' && EnumText.TEXT_BUTTON_AUTH}
          {type === 'register' && step === 1 && EnumText.TEXT_BUTTON_REGISTER_NEXT_STEP}
          {type === 'register' && step === 2 && EnumText.TEXT_BUTTON_REGISTER_NEXT_STEP}
          {type === 'register' && step === 3 && EnumText.TEXT_BUTTON_REGISTER}
        </SubmitButton>
        <SubmitButton
          type='button'
          display={type === 'auth' || (type === 'register' && step === 1)}
          onClick={onBackPage}
        >
          {type === 'register' && (step === 2 || step === 3) && EnumText.TEXT_BUTTON_BACK}
        </SubmitButton>
      </div>
      <div className={styles.form__footer}>
        <span>
          {type === 'register' && EnumText.TEXT_LINK_RETURN_AUTH}
          {type === 'auth' && EnumText.TEXT_LINK_RETURN_REGISTER}
        </span>
        {type === 'register' && (
          <Ref link={routeNames.AUTH} imgLink={arrow} title={EnumText.TEXT_BUTTON_AUTH} type='form' id='' />
        )}
        {type === 'auth' && (
          <Ref link={routeNames.REGISTRATION} imgLink={arrow} title={EnumText.TEXT_BUTTON_REGISTER} type='form' id='' />
        )}
      </div>
      {errors?.root?.serverError.type === '400' && <p className={styles.error}>{errors?.root?.serverError.message}</p>}
    </form>
  );
}
