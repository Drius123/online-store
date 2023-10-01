import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { sortTypeActions } from '../../store/reducers/SortSlice';
import { Filter, ProductPreview } from '..';
import { EnumText, Product, ProductsProps } from '../../types';
import { FilterBar, OtherClick } from '../../helpers';
import Breadcrumbs from '../breadcrumbs';
import routs from '../../routing/routs';
import { RootState } from '../../store/store';
import { CategoriesResult } from '../../types/catogoriesResult';
import { getProductsPaging } from '../../store/services/getProductsPagingApi';
import { setPageNumber } from '../../store/reducers/PageSlice';
import { setProductsPaging } from '../../store/reducers/ProductsPagingSlice';
import Spinner from '../../ui/spinner/spinner';

import styles from './products.module.scss';

export default function Products({ isHomePage }: ProductsProps) {
  const isShowFilter = useSelector((state: RootState) => state.sortType.isShowFilter);
  const dispatch = useDispatch();
  const { category: categorySlug, productId } = useParams();

  const filterRef = useRef<HTMLDivElement | null>(null);
  const buttonFilterRef = useRef<HTMLButtonElement | null>(null);

  const query = useSelector((state: RootState) => state.searchInput.query);

  const categories = useSelector((state: RootState) => state.categories.categories);
  const navigate = useNavigate();

  const currentCategory = (categoryId: string, id: number) => {
    if (categories) {
      categories.forEach((item: CategoriesResult) => {
        if (item.id === categoryId) {
          navigate(`${routs.HOME}/${item.slug['en-US']}/${id}`);
        }
      });
    }
  };

  const buttonFilterHundle = () => {
    dispatch(sortTypeActions.sortChangerIsShowFilter({ sortType: !isShowFilter }));
  };

  OtherClick({ body: filterRef, button: buttonFilterRef, isShow: isShowFilter, type: 'filter' });

  const productsFilter = FilterBar(categorySlug, query);
  const pageNumber = useSelector((state: RootState) => {
    return state.page.page;
  });

  const [disabledNext, setDisabledNext] = useState(false);
  const [disabledPrev, setDisabledPrev] = useState(false);
  const [page, setPage] = useState(pageNumber);
  const [productsLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const allProducts = useSelector((state: RootState) => {
    return state.products.products;
  });
  const allProductsPage = Math.floor(allProducts.length / 9);

  useEffect(() => {
    dispatch(setPageNumber(page));
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = (await getProductsPaging(page)) as Product[];
        dispatch(setProductsPaging(response));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown Error: api.get.data');
        // setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    setDisabledPrev(false);
    setDisabledNext(false);
    if (page === 1) {
      setDisabledPrev(true);
    }

    if (allProductsPage + 1 === page) {
      setDisabledNext(true);
    }
  }, [page, dispatch, allProductsPage]);

  const handleChangeNext = () => {
    setPage(page + 1);
  };

  const handleChangePrev = () => {
    setPage(page - 1);
  };

  if (productsLoading) {
    return <Spinner />;
  }
  if (error) {
    return error;
  }

  return (
    <section className={styles.products}>
      <div className='products__container'>
        {!productId && (
          <div className={styles.breadcrumbs}>
            <Breadcrumbs category={categorySlug} productId={productId} />
          </div>
        )}
        <div className={styles.products__header}>
          {!productId && (
            <div className={styles['filter-mobile']}>
              <button
                ref={buttonFilterRef}
                className={styles['products__button-filter']}
                type='button'
                onClick={buttonFilterHundle}
              >
                {EnumText.FILTER_TEXT_BUTTON}
              </button>
              <div
                ref={filterRef}
                className={classNames(styles['filter-mobile__body'], { [styles.active]: isShowFilter })}
              >
                <Filter />
              </div>
            </div>
          )}
          {!categorySlug && (
            <p className={styles.bestsellers}>{productsFilter.length > 0 && EnumText.TEXT_BESTSELLERS}</p>
          )}
        </div>
        <div className={styles['product-wrapper']}>
          {!productId && (
            <div className={styles.filter}>
              <Filter />
            </div>
          )}
          <div className={styles.products__list}>
            {productsFilter.length > 0 ? (
              productsFilter.map((item: Product) => {
                return (
                  <div className={styles.products__item} key={item.id}>
                    {' '}
                    {productsFilter && (
                      <ProductPreview
                        product={item}
                        onClick={(id) => currentCategory(item.category_id, id + page * 9 - 9)}
                      />
                    )}
                  </div>
                );
              })
            ) : (
              <div className={styles['not-category']}>{EnumText.TEXT_NOT_PRODUCTS}</div>
            )}
            <div className={!isHomePage ? 'visually-hidden' : styles['button-pagination']}>
              <button className={styles['btn-next']} type='button' onClick={handleChangePrev} disabled={disabledPrev}>
                {EnumText.TEXT_BUTTON_PREV_PAGE}
              </button>
              <span className={styles['page-number']}>{pageNumber}</span>
              <button className={styles['btn-prev']} type='button' onClick={handleChangeNext} disabled={disabledNext}>
                {EnumText.TEXT_BUTTON_NEXT_PAGE}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
