import { OrderButtonProps } from '../../types';
import styles from './submit-button.module.scss';

export default function SubmitButton({ children, type, onClick, disabled, display, dataTestId }: OrderButtonProps) {
  return (
    <button
      className={`${styles.button} ${display ? styles.hidden : ''}`}
      // eslint-disable-next-line react/button-has-type
      type={type || 'button'}
      disabled={disabled}
      onClick={onClick}
      data-testid={dataTestId}
    >
      {children}
    </button>
  );
}

SubmitButton.defaultProps = {
  onClick: undefined,
  disabled: false,
  display: false,
};
