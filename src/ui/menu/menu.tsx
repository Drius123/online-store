import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { MenuProps } from '../../types';
import { CategoriesResult } from '../../types/catogoriesResult';
import { useGetCategoriesQuery } from '../../store/services/categoriesApi';
import { refreshToken } from '../../store/services/refreshToken';
import { isShowActions } from '../../store/reducers/ViewSlice';

import { getLocale } from '../../helpers';

import styles from './menu.module.scss';

export default function Menu({ burger, dataTestId }: MenuProps) {
  const locale = getLocale();
  const { data: categories, isFetching, isError, error, refetch } = useGetCategoriesQuery('');
  const dispatch = useDispatch();

  if (error && 'status' in error && error?.status === 401) {
    refreshToken().then(() => {
      refetch();
    });
  }

  const buttonMenuHundle = () => {
    dispatch(isShowActions.viewMenuBurger({ isShow: false }));
  };

  return (
    <nav className={styles.nav} data-testid={dataTestId}>
      <ul className={`${styles['nav-menu']} ${burger ? styles.burger : ''}`}>
        {!isFetching &&
          !isError &&
          categories.results.map((item: CategoriesResult) => (
            <li key={item.id} className={styles.nav__item}>
              <NavLink to={`home/${item.slug['en-US']}`} onClick={buttonMenuHundle}>
                <span>{item.name[locale]}</span>
              </NavLink>
            </li>
          ))}
      </ul>
    </nav>
  );
}
