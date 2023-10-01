import { KeyboardEvent } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/reducers/AuthUserSlice';
import { setUserToken } from '../../store/reducers/UserTokenSlice';
import routeNames from '../../routing/routs';
import { EnumText, UserMenuProps } from '../../types';
import ButtonClose from '../button-close/button-close';
import exit from '../../assets/user-bar-icon/exit-icon.svg';
import auth from '../../assets/user-bar-icon/icons-key.svg';
import profile from '../../assets/user-bar-icon/profile-menu-icon.svg';
import register from '../../assets/user-bar-icon/register-icon.svg';

import styles from './user-menu.module.scss';
import { setBasket } from '../../store/reducers/BasketSlice';
import { basketApi } from '../../store/services/getBasketApi';

export default function UserMenu({ authed, active, setActive, dataTestId }: UserMenuProps) {
  const dispatch = useDispatch();
  const clearUser = (): void => {
    dispatch(setUser(''));
    dispatch(setUserToken(''));
    dispatch(setBasket(''));
    Cookies.remove('user');
    Cookies.remove('authToken');
    Cookies.remove('cart');
    Cookies.remove('userToken');
    dispatch(basketApi.util.invalidateTags(['cart']));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      // Обработчик нажатия клавиши Enter или пробела
      // ...
    }
  };

  return (
    <div
      role='button'
      tabIndex={0}
      className={active ? `${styles['user-menu']} ${styles.active}` : styles['user-menu']}
      onClick={() => {
        document.body.classList.remove('hidden');
        setActive(false);
      }}
      onKeyDown={handleKeyDown}
      data-testid={dataTestId}
    >
      <ButtonClose />
      <nav>
        <ul className={styles['user-menu-list']}>
          <li className={styles['user-menu-list__item']}>
            <Link to={authed ? routeNames.PROFILE : routeNames.AUTH}>
              <img src={authed ? profile : auth} alt='icon-menu' />
              <span>{authed ? EnumText.TEXT_LINK_PROFILE : EnumText.TEXT_BUTTON_AUTH}</span>
            </Link>
          </li>
          <li className={styles['user-menu-list__item']}>
            <Link to={authed ? routeNames.HOME : routeNames.REGISTRATION} onClick={() => clearUser()}>
              <img src={authed ? exit : register} alt='icon-menu' />
              <span>{authed ? EnumText.TEXT_LINK_EXIT : EnumText.TITLE_FORM_REGISTER}</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
