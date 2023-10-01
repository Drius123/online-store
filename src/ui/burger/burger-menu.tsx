import { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import HeaderNav from '../header-nav/header-nav';
import Menu from '../menu/menu';
import { BurgerMenuProps, EnumText } from '../../types';
import ButtonClose from '../button-close/button-close';

import { RootState } from '../../store/store';

import styles from './burger-menu.module.scss';

const BurgerMenu = forwardRef<HTMLDivElement, BurgerMenuProps>(function BurgerMenu({ dataTestId }, ref) {
  const isShowMenuBurger = useSelector((state: RootState) => state.isShow.isShowMenuBurger);

  return (
    <div
      ref={ref}
      className={isShowMenuBurger ? `${styles['burger-menu']} ${styles.active}` : styles['burger-menu']}
      data-testid={dataTestId}
    >
      <ButtonClose />
      <span className={styles.title}>{EnumText.TITLE_MENU}</span>
      <HeaderNav burger />
      <span className={styles.title}>{EnumText.TITLE_CATEGORIES}</span>
      <Menu burger />
    </div>
  );
});
export default BurgerMenu;
