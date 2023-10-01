import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import Products from '../../components/products/products';
import Breadcrumbs from '../../components/breadcrumbs';
import { RootState } from '../../store/store';
import { OrderButton, Slider } from '../../ui';
import Like from '../../ui/like/like';
import { EnumText, Product } from '../../types';
import { selectAmount } from '../../ui/data/arrays';
import Modal from '../../ui/modal/modal';
import IsProductBasket from '../../helpers/is-product-basket';

import styles from './product-page.module.scss';

export default function ProductPage() {
  let slider: string[] = [];
  const { category: categorySlug, productId } = useParams();
  const id = Number(productId);
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product>();
  const [modalActive, setModalActive] = useState<boolean>(false);
  const productsState = useSelector((state: RootState) => state.products.products);

  const isProductBasket = IsProductBasket(product?.id_api);

  useEffect(() => {
    setProducts(productsState);
    setProduct(products[id]);
  }, [id, products, productsState]);

  if (product && product.images) {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < product.images.length; i++) {
      slider.push(product.images[i].url);
    }
    if (slider.length === 1) slider = [product.image, product.image, product.image];
  }
  if (product) {
    return (
      product && (
        <div className='product'>
          <div className='product__container'>
            <div className={styles.breadcrumbs}>
              <Breadcrumbs category={categorySlug} productId={productId} />
            </div>
            <div className={styles['product-view']}>
              <h1 className={styles['product-name']}>{product.title}</h1>
              <div className={styles['product-image']}>
                <div className={styles.slider}>
                  <Slider src={slider} modalActive={setModalActive} pagination={{ clickable: true }} />
                  <div className={modalActive ? classNames(styles.modal, styles.active) : styles.modal}>
                    <Modal active={modalActive} setActive={setModalActive}>
                      <Slider src={slider} modalActive={setModalActive} pagination={{ clickable: true }} />
                    </Modal>
                  </div>
                </div>
              </div>
              <div className={styles['product-performance']}>
                <span className={styles['product-category']}>{product.category}</span>
                <div className={styles['product-price']}>
                  <div>
                    <span className={classNames(styles.price, { [styles.discount]: product.discount_permyriad })}>
                      {product.price}₽
                    </span>
                    {product.discount_permyriad && (
                      <span className={styles['crossed-out-price']}>
                        {(product.price - (product.price * 100) / product.discount_permyriad).toFixed(0)}₽
                      </span>
                    )}
                  </div>

                  <OrderButton productId={product.id_api} type='button' isProductBasket={isProductBasket}>
                    {!isProductBasket ? EnumText.TITLE_BUTTON_ADD_CART : EnumText.TITLE_BUTTON_PRODUCT_IN_CART}
                  </OrderButton>
                  <Like>
                    <span>{EnumText.TEXT_FOR_LIKE}</span>
                  </Like>
                </div>
                <div className={styles['product-size']}>
                  <div className={styles.color}>
                    <span>{EnumText.TEXT_COLOR}</span>
                    <span>{product.color}</span>
                    <span style={{ backgroundColor: `${product.color}`, width: `100%`, height: '10px' }} />
                  </div>
                  <div className={styles['select-amount']}>
                    <span>{EnumText.TEXT_AMOUNT}</span>
                    <select className={styles.amount} defaultValue={1}>
                      {selectAmount.map((item) => {
                        return (
                          <option value={item.value} key={item.value}>
                            {item.text}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className={styles.sizes}>
                    <span>{EnumText.TEXT_SIZES}</span>
                    <span>
                      ${product.itemLength} СМ X ${product.itemWidth} СМ X ${product.itemHeight} СМ
                    </span>
                  </div>
                </div>
                <div className={styles['product-description']}>
                  <span className={styles.description}>{EnumText.TEXT_DESCRIPTION}</span>
                  <span>{product.description}</span>
                </div>
              </div>
            </div>
            <Products />
          </div>
        </div>
      )
    );
  }
}
