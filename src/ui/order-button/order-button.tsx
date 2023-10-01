import Cookies from 'js-cookie';
import { MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderButtonProps } from '../../types';

import { useAddCartMutation, useAddItemMutation, useGetBasketQuery } from '../../store/services/getBasketApi';

import styles from './order-button.module.scss';
import routeNames from '../../routing/routs';

export default function OrderButton({
  children,
  type,
  disabled,
  display,
  dataTestId,
  productId,
  isProductBasket,
}: OrderButtonProps) {
  const [addItem] = useAddItemMutation();
  const { data: cart, refetch } = useGetBasketQuery('');
  const [addCart] = useAddCartMutation();
  const navigate = useNavigate();

  const redirectToBasket: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    navigate(routeNames.BAG, { replace: true });
  };

  const AddToBasket: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.stopPropagation();

    let cartNew;
    refetch();
    if (!cart && (Cookies.get('authToken') || Cookies.get('mainToken'))) {
      await addCart('RUB');
    }

    if (cart) cartNew = cart;
    else cartNew = Cookies.get('cart') ? JSON.parse(Cookies.get('cart') as string) : null;

    if (cartNew && productId) {
      addItem({ productId, cartId: cartNew.id_cart, version: cartNew.version }).then((res) => console.log(res));
    } else console.log('Да нет у тебя корзины. Или товара для добавления');
  };

  return (
    <button
      className={`${styles.button} ${display ? styles.hidden : ''}`}
      // eslint-disable-next-line react/button-has-type
      type={type || 'button'}
      disabled={disabled}
      onClick={!isProductBasket ? AddToBasket : redirectToBasket}
      data-testid={dataTestId}
    >
      {children}
    </button>
  );
}

OrderButton.defaultProps = {
  onClick: undefined,
  disabled: false,
  display: false,
  isProductBasket: false,
};
