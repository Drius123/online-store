import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { EnumText, ProductInCart } from '../../types';
import { SubmitButton } from '..';

import styles from './basket-item.module.scss';
import { RootState } from '../../store/store';
import { useDeleteItemMutation, useSetQuantityItemMutation } from '../../store/services/getBasketApi';

export type BasketItemProps = {
  product: ProductInCart;
};

export default function BasketItem({ product }: BasketItemProps) {
  const [deleteItem] = useDeleteItemMutation();
  const [setQuantityItem] = useSetQuantityItemMutation();
  const productImage = typeof product?.image === 'string' ? product.image : '';
  const cart = useSelector((state: RootState) => state.basket.cart);
  const [count, setCount] = useState(product.quantity);
  const removeItem = (lineItemId: string, cartId: string, version: number, quantity: number) => {
    // eslint-disable-next-line no-console
    console.log('удаляем товар');
    deleteItem({ lineItemId, cartId, version, quantity });
  };

  const updateItem = (lineItemId: string, cartId: string, version: number, quantity: number) => {
    // eslint-disable-next-line no-console
    console.log('обновляем товар', quantity);
    setQuantityItem({ lineItemId, cartId, version, quantity });
  };

  return (
    <div className={styles.product}>
      <div className={styles.product__image}>
        <img src={productImage || ''} alt='product-img' />
      </div>

      <div className={styles['product-inf']}>
        <p className={styles.product__title}>{product?.title}</p>

        <p className={styles.product__category}>{product?.category}</p>

        <div className={styles.color}>
          <span>{EnumText.TEXT_COLOR}</span>
          <span>{product.color}</span>
          <span style={{ backgroundColor: `${product.color}`, width: `100%`, height: '10px' }} />
        </div>

        <p className={styles.product__amount}>{EnumText.TEXT_AMOUNT}</p>
        <span>
          <span className={styles.product__button}>
            <button
              type='button'
              className={styles.product__button}
              onClick={() => {
                setCount(count - 1);
                updateItem(product.lineItemId, cart.id_cart, cart.version, count - 1);
              }}
            >
              -
            </button>
          </span>
          <span>{count}</span>
          <span className={styles.product__button}>
            <button
              type='button'
              className={styles.product__button}
              onClick={() => {
                setCount(count + 1);
                updateItem(product.lineItemId, cart.id_cart, cart.version, count + 1);
              }}
            >
              +
            </button>
          </span>
        </span>
        <div className={styles.product__size}>
          <span>{EnumText.TEXT_SIZES}:</span>
          <span>
            {product.itemLength} СМ X {product.itemWidth} СМ X {product.itemHeight} СМ
          </span>
        </div>
      </div>

      <div className={styles.product__price}>
        <span className={classNames(styles.price, { [styles.discount]: product.discount_permyriad })}>
          {product.price}
        </span>
        {product.discount_permyriad && (
          <span className={styles['crossed-out-price']}>
            {(product.price - (product.price * 100) / product.discount_permyriad).toFixed(0)}
          </span>
        )}
      </div>

      <div className={styles.product__button}>
        <SubmitButton
          onClick={() => removeItem(product.lineItemId, cart.id_cart, cart.version, product.quantity)}
          type='button'
        >
          X
        </SubmitButton>
      </div>
    </div>
  );
}
