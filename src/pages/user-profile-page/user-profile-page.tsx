import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
// import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { EnumText } from '../../types';
import UserAddressesForm from '../../ui/user-addresses-form/user-addresses-form';
import UserInformationsForm from '../../ui/user-inf-form/user-inf-form';
import UserPassForm from '../../ui/user-pass-form/user-pass-form';
import routs from '../../routing/routs';

import styles from './user-profile-page.module.scss';
import { useGetUserQuery } from '../../store/services/getCurrentUserApi';

import { RootState } from '../../store/store';

export default function UserProfilePage() {
  const { data, isLoading, isFetching, error } = useGetUserQuery('');
  const userState = useSelector((state: RootState) => state.user.user.id);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(data);
  }, [data, user, userState]);

  if (error && 'status' in error && error?.status === 401) {
    Cookies.remove('authToken');
  }
  const authed = Cookies.get('authToken');

  if (!authed) {
    return <Navigate to={routs.AUTH} replace />;
  }

  // if (user) dispatch(setUser(JSON.parse(user)));
  if (!isLoading && !isFetching) {
    return (
      user && (
        <div className={styles['user-profile-page']}>
          <div className='user-profile-page__container'>
            <div className={styles['user-profile']}>
              <div className={styles['user-profile-wrapper']}>
                <span>{EnumText.TEXT_USER_NAV}</span>
                <div className={styles['user-information']}>
                  <div className='user-inf-main'>
                    <h2>{EnumText.TEXT_PROFILE}</h2>
                    <UserInformationsForm />
                  </div>
                  <div className='user-inf-main'>
                    <h2>{EnumText.TEXT_PASSWORD}</h2>
                    <UserPassForm />
                  </div>
                </div>
                <h1>{EnumText.TEXT_USER_ADDRESES}</h1>
                <div className={styles['user-information']}>
                  <div className='user-inf-addresses'>
                    <h2>{EnumText.TEXT_USER_SHIP_ADDRESES}</h2>
                    <div className={styles.adresses}>
                      <UserAddressesForm />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    );
  }
}
