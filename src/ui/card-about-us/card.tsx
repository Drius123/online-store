import { Link } from 'react-router-dom';
import gitHub from '../../assets/github.png';
import styles from './card.module.scss';
import { EnumText } from '../../types';

interface CardProps {
  name: string;
  img: string;
  roleDev: string;
  biography: string;
  gitHubLink: string;
  contribution: string;
}

export default function Card({ name, img, roleDev, biography, gitHubLink, contribution }: CardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.card__content}>
        <div className={styles.information}>
          <span className={styles.name}>{name}</span>
          <span className={styles.role}>{roleDev}</span>
          <span className={styles.biography}>{biography}</span>
          <span className={styles.contribution}>{contribution}</span>
        </div>
        <div className={styles['img-link']}>
          <img src={img} alt='dev-img' className={styles.photo} />
          <div className={styles['github-link']}>
            <Link to={gitHubLink}>
              <img src={gitHub} alt='gitHub-img' className={styles.gitHub} /> {EnumText.GITHUB}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
