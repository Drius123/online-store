import profile from '../../assets/user-bar-icon/profile-icon.svg';
import profileAuthed from '../../assets/user-bar-icon/profile-icon-authed.svg';
import styles from './user-button.module.scss';
import { UserButtonProps } from '../../types';

export default function UserButton({ authed, callback, dataTestId }: UserButtonProps) {
  return (
    <button
      className={styles['profile-menu']}
      type='button'
      onClick={() => {
        document.body.classList.add('hidden');
        callback();
      }}
      data-testid={dataTestId}
    >
      <img src={authed ? profileAuthed : profile} alt='profile-menu-img' />
    </button>
  );
}
