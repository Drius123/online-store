import { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BurgerBtn, BurgerMenu, HeaderNav, Menu, SearchBar, Ref, UserButton, UserMenu } from '../../ui';
import { EnumText, HeaderProps } from '../../types';
import routeNames from '../../routing/routs';
import { OtherClick } from '../../helpers';
import { RootState } from '../../store/store';

import logo from '../../assets/LOGO.svg';
import car from '../../assets/delivery-icon.svg';
import wishlist from '../../assets/user-bar-icon/wishlist-icon.svg';
import bag from '../../assets/user-bar-icon/bag.svg';
import phone from '../../assets/phone.svg';

import styles from './header.module.scss';

export default function Header({ dataTestId }: HeaderProps) {
  const buttonBurgerRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const isShowMenuBurger = useSelector((state: RootState) => state.isShow.isShowMenuBurger);
  const [menuUserActive, setUserMenuActive] = useState<boolean>(false);
  const { productId } = useParams();

  const bagNumberItems = useSelector((state: RootState) => {
    return state.basket.cart?.lineItems?.length;
  });

  const [bagItems, setBagItems] = useState(0);

  useEffect(() => {
    if (bagNumberItems) {
      setBagItems(bagNumberItems);
    } else {
      setBagItems(0);
    }
  }, [bagNumberItems]);

  OtherClick({ body: menuRef, button: buttonBurgerRef, isShow: isShowMenuBurger, type: 'burger' });

  return (
    <header className={styles.header} data-testid={dataTestId}>
      <div className='header__container'>
        <div className={styles['header-nav']}>
          <BurgerBtn ref={buttonBurgerRef} />
          <BurgerMenu ref={menuRef} />
          <Link to={routeNames.HOME}>
            <img src={logo} alt='logo-img' />
          </Link>
          <HeaderNav burger={false} />
          {!productId && <SearchBar />}
          <Ref
            link='tel:8 (964) 89 99 119'
            imgLink={phone}
            title={EnumText.TITLE_TELEPHONE_NUMBER}
            id={styles['telephone-header']}
            type={null}
          />
          <div className={styles.delivery}>
            <Link to='delivery'>
              <img src={car} alt='car-img' />
              <span>{EnumText.TITLE_DELIVERY_LINK}</span>
            </Link>
          </div>
          <div className={styles['user-bar']}>
            <Link to='wishlist'>
              <img src={wishlist} alt='wishlist-img' />
            </Link>
            <Link to='bag'>
              <img src={bag} alt='bag-img' />
              <span className={styles['bag-number']}>{bagItems}</span>
            </Link>
            <UserButton authed={!!Cookies.get('authToken')} callback={() => setUserMenuActive(!menuUserActive)} />
            <UserMenu authed={!!Cookies.get('authToken')} active={menuUserActive} setActive={setUserMenuActive} />
          </div>
        </div>
        <div className={styles['header-menu']}>
          <Menu burger={false} />
        </div>
      </div>
    </header>
  );
}
