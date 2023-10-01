import { useDispatch } from 'react-redux';
import { isShowActions } from '../../store/reducers/ViewSlice';

import styles from './button-close.module.scss';

export default function ButtonClose() {
  const dispatch = useDispatch();

  const buttonMenuHandle = () => {
    dispatch(isShowActions.viewMenuBurger({ isShow: false }));
  };

  return <button type='button' className={styles['button-close']} aria-label='close' onClick={buttonMenuHandle} />;
}
