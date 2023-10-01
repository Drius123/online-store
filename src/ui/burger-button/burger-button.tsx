import { Ref, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BurgerBtnProps } from '../../types';
import { isShowActions } from '../../store/reducers/ViewSlice';
import { RootState } from '../../store/store';

import styles from './burger-button.module.scss';

const BurgerBt = forwardRef<HTMLButtonElement, BurgerBtnProps>(function BurgerBt(
  _props: BurgerBtnProps,
  ref: Ref<HTMLButtonElement>
) {
  const dispatch = useDispatch();
  const isShowMenuBurger = useSelector((state: RootState) => state.isShow.isShowMenuBurger);

  const buttonBurgerHundle = () => {
    dispatch(isShowActions.viewMenuBurger({ isShow: !isShowMenuBurger }));
  };

  return (
    <button
      ref={ref}
      type='button'
      className={styles['nav-burger']}
      onClick={buttonBurgerHundle}
      data-testid={_props.dataTestId}
    >
      {' '}
      <span />
    </button>
  );
});

export default BurgerBt;
