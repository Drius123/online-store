import { Link, Outlet } from 'react-router-dom';
import { EnumText } from '../../types';
import routeNames from '../../routing/routs';

import logo from '../../assets/LOGO.svg';

import styles from './auth-layout.module.scss';

export default function AuthLayout() {
  return (
    <div className={styles['app-layout-auth']}>
      <div className='app-layout__container'>
        <h1 className='visually-hidden'>{EnumText.TITLE_AUTH}</h1>
        <Link to={routeNames.HOME}>
          <img className={styles.logo} src={logo} alt='logo' width='120' height='70' />
        </Link>
        <Outlet />
      </div>
    </div>
  );
}
