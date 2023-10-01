import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { linksAndTitles } from '../data/arrays';
import { HeaderNavProps } from '../../types';
import { isShowActions } from '../../store/reducers/ViewSlice';

import styles from './header-nav.module.scss';

export default function HeaderNav({ burger, dataTestId }: HeaderNavProps) {
  const dispatch = useDispatch();

  const buttonMenuHundle = () => {
    dispatch(isShowActions.viewMenuBurger({ isShow: false }));
  };

  return (
    <nav className={`${styles.nav} ${burger ? styles.burger : ''}`} data-testid={dataTestId}>
      <ul className={styles['nav-list']}>
        {linksAndTitles.map((item, i, arr) =>
          i % 2 === 0 ? (
            <li key={item} className={styles.nav__item}>
              <Link to={item} onClick={buttonMenuHundle}>
                {arr[i + 1]}
              </Link>
            </li>
          ) : null
        )}
      </ul>
    </nav>
  );
}
