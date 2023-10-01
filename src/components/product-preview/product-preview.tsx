// import classNames from 'classnames';

import classNames from 'classnames';

import { EnumText, Product } from '../../types';
import Like from '../../ui/like/like';
import { OrderButton } from '../../ui';
import IsProductBasket from '../../helpers/is-product-basket';

import styles from './product-preview.module.scss';

export type ProductPreviewProps = {
  product: Product;
  onClick: (id: number) => void;
};

export default function ProductPreview({ product, onClick }: ProductPreviewProps) {
  const productImage = typeof product?.image === 'string' ? product.image : '';

  const isProductBasket = IsProductBasket(product.id_api);

  return (
    <div
      className={styles.product}
      role='presentation'
      onClick={(e) => {
        return e.target instanceof SVGElement ? null : (onClick(product.id), window.scrollTo(0, 0));
      }}
    >
      <div className={styles['svg-like']}>
        <Like />
      </div>
      <div className={styles.product__image}>
        <img src={productImage || ''} alt='' width='200' height='150' />
      </div>

      <p className={styles.product__title}>{product?.title}</p>

      <p className={styles.product__category}>{product?.category}</p>

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
        <OrderButton productId={product.id_api} type='button' isProductBasket={isProductBasket}>
          {!isProductBasket ? EnumText.TITLE_BUTTON_ADD_CART : EnumText.TITLE_BUTTON_PRODUCT_IN_CART}
        </OrderButton>
      </div>
    </div>
  );
}
