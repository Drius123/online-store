import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

import { EnumText, PageProps } from '../../types';
import FormLoginAuth from '../../ui/form-login-auth/form-login-auth';
import routs from '../../routing/routs';

import styles from './register-page.module.scss';

export default function RegisterPage({ dataTestId }: PageProps) {
  const authed = Cookies.get('authToken');

  if (authed) {
    return <Navigate to={routs.HOME} replace />;
  }

  return (
    <div className={styles.auth} data-testid={dataTestId}>
      <h2 className={styles.auth__title}>{EnumText.TITLE_FORM_REGISTER}</h2>
      <FormLoginAuth type='register' />
    </div>
  );
}
