import { EnumText, MainProps } from '../../types';
import { OrderButton } from '../../ui';
import styles from './main.module.scss';

export default function Main({ children }: MainProps) {
  return (
    <main className={styles.main}>
      <section className={styles['store-performance']}>
        <div className={styles['store-performance-content']}>
          <div className={styles['store-wrapper']}>
            <h1>{EnumText.TEXT_STORE}</h1>
            <h2>{EnumText.TEXT_PERFORMANCE}</h2>
            <OrderButton type='button' onClick={() => {}}>
              {EnumText.TEXT_BUTTON_CATALOG}
            </OrderButton>
          </div>{' '}
        </div>
      </section>
      {children}
    </main>
  );
}
