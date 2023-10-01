import { Link } from 'react-router-dom';

import styles from './breadcrumbs.module.scss';
import routeNames from '../../routing/routs';

export type BreadcrumbsProps = {
  category: string | undefined;
  productId: string | undefined;
};

export default function Breadcrumbs({ category, productId }: BreadcrumbsProps) {
  return (
    <div className={`${styles.breadcrumbs__wrapper}`}>
      {category && (
        <nav className={styles.bradcrumbs} aria-label='Breadcrumb'>
          <ol className={styles.breadcrumbs__list}>
            <li className={styles.breadcrumbs__item}>
              <Link to={`${routeNames.HOME}`} className={styles.bradcrumbs__page}>
                home
              </Link>
            </li>
            <li className={styles.breadcrumbs__item}>
              {productId ? (
                <Link
                  to={`${routeNames.HOME}/${category}`}
                  className={styles.bradcrumbs__page}
                  data-test-id='breadcrumbs-link'
                >
                  {category}
                </Link>
              ) : (
                <span className={styles.breadcrumbs__page} aria-current='page'>
                  {category}
                </span>
              )}
            </li>
            {productId && (
              <li className={styles.breadcrumbs__item}>
                <span className={styles.breadcrumbs__page} aria-current='page'>
                  {productId}
                </span>
              </li>
            )}
          </ol>
        </nav>
      )}
    </div>
  );
}
