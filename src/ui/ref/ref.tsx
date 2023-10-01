import { Link } from 'react-router-dom';
import styles from './ref.module.scss';
import { RefLink } from '../../types';

export default function Ref({ link, imgLink, title, id, type, dataTestId }: RefLink) {
  return (
    <div id={id} className={styles.link} data-testid={dataTestId}>
      <Link to={link}>
        {type && type === 'form' && <span className={styles.link__form}>{title}</span>}
        <img src={imgLink} alt='ref-img' />
        {!type && <span>{title}</span>}
      </Link>
    </div>
  );
}
