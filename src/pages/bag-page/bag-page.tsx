import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useAddPromoMutation, useDeleteCartMutation, useGetBasketQuery } from '../../store/services/getBasketApi';
import { EnumText, PageProps, Product, ProductInCart } from '../../types';
import styles from './bag-page.module.scss';
import { RootState } from '../../store/store';
import BasketItem from '../../ui/basket-item/basket-item';
import { SubmitButton } from '../../ui';
import routeNames from '../../routing/routs';
import { ApiErrorResponse } from '../../types/error';

export default function BagPage({ dataTestId }: PageProps) {
  const [promo, setPromo] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPromo(event.target.value);
  };
  const [deleteCart] = useDeleteCartMutation();
  const [addPromo, { error: errAddPromo }] = useAddPromoMutation();
  const clearCart = (cartId: string, version: number) => {
    // eslint-disable-next-line no-console
    console.log('удаляем корзину');
    deleteCart({ cartId, version });
  };

  const addPromoCode = (cartId: string, version: number) => {
    // eslint-disable-next-line no-console
    console.log('Добавляем промо', promo);
    addPromo({ promoCode: promo, cartId, version });
  };

  const { data: cart, isLoading, isFetching, refetch } = useGetBasketQuery('');
  const productsState: Product[] = useSelector((state: RootState) => state.products.products);
  const cartStatus = useSelector((state: RootState) => state.basket.cart?.id_cart);
  const [products, setProducts] = useState<ProductInCart[]>();
  useEffect(() => {
    const productsBag = productsState.reduce((acc: ProductInCart[], product) => {
      cart?.lineItems.forEach(({ id_api, quantity, lineItemId }) => {
        const returnedTarget: ProductInCart = { quantity, lineItemId, ...product };
        if (product.id_api === id_api) acc.push(returnedTarget);
      });
      return acc;
    }, []);
    setProducts(productsBag);
    refetch();
  }, [productsState, cartStatus, cart?.lineItems]);

  if (!isLoading && !isFetching && cart && cart.lineItems && products) {
    /* const products: ProductInCart[] = productsState.reduce((acc: ProductInCart[], product) => {
      cart?.lineItems.forEach(({ id_api, quantity }) => {
        const returnedTarget: ProductInCart = { quantity, ...product };
        if (product.id_api === id_api) acc.push(returnedTarget);
      });
      return acc;
    }, []); */
    const totalPrice = cart.totalPrice.centAmount / 100;
    const totalPriceManual = products.reduce((acc, i) => acc + i.price * i.quantity, 0);
    const quantityProducts = products.reduce((acc, i) => acc + i.quantity, 0);
    return (
      <section className={styles.products} data-testid={dataTestId}>
        {cartStatus && products && (
          <div className='products__container'>
            <div className={styles.link}>
              <Link to={routeNames.HOME}>{EnumText.TEXT_LINK_HOME}</Link>
              <span>{EnumText.TEXT_LINK_BAG}</span>
            </div>
            <div className={styles.title}>
              <h1>{EnumText.TEXT_BAG}</h1>
              <span>
                {EnumText.TEXT_AMOUT_BAG} {quantityProducts}
              </span>
            </div>
            <div className={styles['button-clear-bag']}>
              <SubmitButton type='button' onClick={() => clearCart(cart.id_cart, cart.version)}>
                {EnumText.TEXT_DELETE_BAG}
              </SubmitButton>
            </div>
            <div className={styles['product-wrapper']}>
              <div className={styles.products__list}>
                {products.length > 0 ? (
                  products.map((item: ProductInCart) => {
                    return (
                      <div className={styles.products__item} key={item.id}>
                        {' '}
                        {products && <BasketItem product={item} />}
                      </div>
                    );
                  })
                ) : (
                  <div className={styles['not-category']}>{EnumText.TEXT_NOT_PRODUCTS}</div>
                )}
              </div>
            </div>
            <div className={styles['total-price']}>
              <span className={styles.price}>
                <form className={styles['input-bar']} action=''>
                  <input
                    type='text'
                    placeholder='Введите промокод'
                    id='promo'
                    name='promo'
                    onChange={handleChange}
                    value={promo}
                    autoComplete='off'
                  />
                  <SubmitButton type='button' onClick={() => addPromoCode(cart.id_cart, cart.version)}>
                    Применить промокод
                  </SubmitButton>
                </form>
                {(errAddPromo as ApiErrorResponse) && (
                  <span className={styles.error}>{(errAddPromo as ApiErrorResponse).data.message.toString()}</span>
                )}
              </span>
            </div>
            <div className={styles['total-price']}>
              <span className={styles.price}>
                <span>
                  {EnumText.TEXT_TOTAL_PRICE}
                  {totalPriceManual === totalPrice && totalPrice}
                  {totalPriceManual !== totalPrice && (
                    <span>
                      <span className={classNames(styles.discount)}>{totalPriceManual}</span>
                      <span> {totalPrice}</span>
                    </span>
                  )}
                </span>
                {/* eslint-disable-next-line no-console */}
                <SubmitButton type='button' onClick={() => console.log('Оформляем заказ')}>
                  {EnumText.TEXT_CHECKOUT}
                </SubmitButton>
              </span>
            </div>
          </div>
        )}
        {(!cartStatus || !products) && (
          <div>
            <div className='products__container'>
              <div className={styles.link}>
                <Link to={routeNames.HOME}>{EnumText.TEXT_LINK_HOME}</Link>
                <span>{EnumText.TEXT_LINK_BAG}</span>
              </div>
              <div className={styles['product-wrapper']}>
                <span className={styles.message}>{EnumText.TEXT_EMPTY_BAG}</span>
                <Link className={styles['message-link']} to={routeNames.HOME}>
                  {EnumText.TEXT_LINK_TO_HOME}
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>
    );
  }
  return (
    <section className={styles.products} data-testid={dataTestId}>
      <div className='products__container'>
        <div className={styles.link}>
          <Link to={routeNames.HOME}>{EnumText.TEXT_LINK_HOME}</Link>
          <span>{EnumText.TEXT_LINK_BAG}</span>
        </div>
        <div className='products__container'>
          <div className={styles['product-wrapper']}>
            <span className={styles.message}>{EnumText.TEXT_EMPTY_BAG}</span>
            <Link className={styles['message-link']} to={routeNames.HOME}>
              {EnumText.TEXT_LINK_TO_HOME}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
