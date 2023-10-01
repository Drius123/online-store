import { Link } from 'react-router-dom';
import { EnumText, PageProps } from '../../types';
import andrew from '../../assets/dev-photo/andrew.jpg';
import andrey from '../../assets/dev-photo/andrey.jpg';
import viacheslav from '../../assets/dev-photo/viacheslav.png';
import rsschool from '../../assets/rs_school.svg';
import Card from '../../ui/card-about-us/card';
import styles from './about-us-page.module.scss';

export default function AboutUsPage({ dataTestId }: PageProps) {
  return (
    <div className={styles['about-us']} data-testid={dataTestId}>
      <div className='about-us__container'>
        <div className={styles['about-us-content']}>
          <h1>{EnumText.OUR_TEAM_TEXT}</h1>
          <Card
            name='Андрей'
            img={andrey}
            roleDev='Руководитель группы'
            biography={EnumText.ANDREY_BIOGRAPHY}
            contribution={EnumText.ANDREY_CONTRIBUTION}
            gitHubLink='https://github.com/Krautsou-Andrei'
          />
          <Card
            name='Вячеслав'
            img={viacheslav}
            roleDev='Разработчик'
            biography={EnumText.VIACHESLAV_BIOGRAPHY}
            contribution={EnumText.VIACHESLAV_CONTRIBUTION}
            gitHubLink='https://github.com/DonAlPatino'
          />
          <Card
            name='Андрей'
            img={andrew}
            roleDev='Разработчик'
            biography={EnumText.ANDREW_BIOGRAPHY}
            contribution={EnumText.ANDREW_CONTRIBUTION}
            gitHubLink='https://github.com/Drius123'
          />
          <span className={styles.collaboration}>{EnumText.COLLABORATION_INFORMATION}</span>
          <Link to='https://rs.school/' className={styles.rs_school}>
            <img src={rsschool} alt='rs_school-img' />
          </Link>
        </div>
      </div>
    </div>
  );
}
