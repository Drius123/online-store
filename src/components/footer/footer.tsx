import { Link } from 'react-router-dom';

import { EnumText, FooterProps } from '../../types';
import routeNames from '../../routing/routs';
import { getLocale } from '../../helpers';
import { useGetCategoriesQuery } from '../../store/services/categoriesApi';
import { CategoriesResult } from '../../types/catogoriesResult';

import { Ref } from '../../ui';
import inst from '../../assets/inst.svg';
import mail from '../../assets/mail.svg';
import phone from '../../assets/phone.svg';

import styles from './footer.module.scss';
import { refreshToken } from '../../store/services/refreshToken';

export default function Footer({ dataTestId }: FooterProps) {
  const locale = getLocale();

  const { data: categories, isFetching, isError, error, refetch } = useGetCategoriesQuery('');
  if (error && 'status' in error && error?.status === 401) {
    refreshToken().then(() => {
      refetch();
    });
  }
  return (
    <footer className={styles.footer} data-testid={dataTestId}>
      <div className='footer__container'>
        <div className={styles['footer-nav']}>
          <nav>
            <span>{EnumText.TITLE_FOOTER_NAV}</span>
            <ul className={styles['nav-list']}>
              {!isFetching &&
                !isError &&
                categories.results.map((item: CategoriesResult) => (
                  <li key={item.id} className={styles.nav__item}>
                    <Link to={`home/${item.slug['en-US']}`}>{item.name[locale]}</Link>
                  </li>
                ))}
            </ul>
          </nav>
          <div className={styles['footer-contact']}>
            <Link to={routeNames.HOME}>LM</Link>
            <span>
              {EnumText.TITLE_FOOTER_ADRESSFIRST}
              <br />
              {EnumText.TITLE_FOOTER_ADRESSSECOND}
            </span>
          </div>
        </div>
        <div className={styles['footer-social-media']}>
          <div className={styles.links}>
            <Link to='promotion'>{EnumText.TITLE_FOOTER_PROMOTION}</Link>
            <Link to='novelties'>{EnumText.TITLE_FOOTER_NEW}</Link>
          </div>
          <div className={styles['social-media']}>
            <Ref
              link='tel:8 (964) 89 99 119'
              imgLink={phone}
              title={EnumText.TITLE_TELEPHONE_NUMBER}
              id=''
              type={null}
            />
            <Ref link='Instagram' imgLink={inst} title={EnumText.TITLE_INSTAGRAM_LINK} id='' type={null} />
            <Ref
              link='mailto:mebel_loft_anapa@mail.ru'
              imgLink={mail}
              title={EnumText.TITLE_MAIL_LINK}
              id=''
              type={null}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
