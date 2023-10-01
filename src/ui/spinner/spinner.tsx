import styles from './spinner.module.scss';

export default function Spinner() {
  return (
    <div className={styles['spin-wrapper']}>
      <div className={styles.spinner} />
    </div>
  );
}
