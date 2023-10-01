import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import FormLoginAuth from '../../ui/form-login-auth/form-login-auth';
import { EnumText, PageProps } from '../../types';
import routs from '../../routing/routs';

import styles from './auth-page.module.scss';

export default function AuthPage({ dataTestId }: PageProps) {
  const authed = Cookies.get('authToken');

  if (authed) {
    return <Navigate to={routs.HOME} replace />;
  }

  return (
    <div data-testid={dataTestId}>
      <div className={styles.auth}>
        <h2 className={styles.auth__title}>{EnumText.TITLE_FORM_AUTH}</h2>
        <FormLoginAuth type='auth' />
      </div>
    </div>
  );
}
