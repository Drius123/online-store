import { Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';

import styles from './modal.module.scss';
import { ButtonClose } from '..';

interface ModalProps {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}

export default function Modal({ active, setActive, children }: ModalProps) {
  return (
    <div
      className={active ? classNames(styles.modal, styles.active) : styles.modal}
      onClick={() => {
        document.body.classList.remove('hidden');
        setActive(false);
      }}
      role='presentation'
    >
      <div className={styles['modal-btn']}>
        <ButtonClose />
      </div>
      <div
        className={active ? classNames(styles.modal__content, styles.active) : styles.modal__content}
        onClick={(e) => e.stopPropagation()}
        role='presentation'
      >
        {children}
      </div>
    </div>
  );
}
