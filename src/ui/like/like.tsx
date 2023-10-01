import { useState } from 'react';
import { ReactSVG } from 'react-svg';
import { SubmitButton } from '..';
import { LikeProps } from '../../types';
import like from '../../assets/like.svg';

import styles from './like.module.scss';

export default function Like({ children }: LikeProps) {
  const [activeLike, setActiveLike] = useState<boolean>(false);
  return (
    <SubmitButton type='button' onClick={() => setActiveLike(!activeLike)}>
      {children}
      <ReactSVG className={activeLike ? styles.fill : ''} src={like} />
    </SubmitButton>
  );
}
