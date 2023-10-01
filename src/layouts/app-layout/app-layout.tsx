import { Outlet } from 'react-router-dom';

import { Footer, Header } from '../../components';

import styles from './app-layout.module.scss';

export default function AppLayout() {
  return (
    <div className={styles['app-layout']}>
      <div className={`app-layout__container ${styles.app}`}>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
