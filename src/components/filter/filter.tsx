import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ChangeEvent, useEffect } from 'react';
import { RootState } from '../../store/store';
import { sortTypeActions } from '../../store/reducers/SortSlice';
import { useGetCategoriesQuery } from '../../store/services/categoriesApi';
import { refreshToken } from '../../store/services/refreshToken';
import { getLocale } from '../../helpers';
import { colors } from '../../ui';

import { EnumText, FilterProps, SortOrder } from '../../types';
import { CategoriesResult } from '../../types/catogoriesResult';

import sort from '../../assets/sort.svg';

import styles from './filter.module.scss';

export default function Filter({ dataTestId }: FilterProps) {
  const selectedColors = useSelector((state: RootState) => state.sortType.selectColor);
  // const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const locale = getLocale();
  const { category: categorySlug } = useParams();
  const dispatch = useDispatch();
  const sortPrice = useSelector((state: RootState) => state.sortType.sortPrice);
  const sortName = useSelector((state: RootState) => state.sortType.sortName);
  const selsectCategory = useSelector((state: RootState) => state.sortType.selectCategory);
  const { data: categories, isFetching, isError, error, refetch } = useGetCategoriesQuery('');

  if (error && 'status' in error && error?.status === 401) {
    refreshToken().then(() => {
      refetch();
    });
  }

  const sortButtonHandle = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(sortTypeActions.sortChangerType({ sortType: event.currentTarget.name }));

    if (event.currentTarget && event.currentTarget.name === 'price') {
      if (sortPrice === SortOrder.asc) {
        dispatch(sortTypeActions.sortChangerPrice({ sortType: SortOrder.desc }));
      } else {
        dispatch(sortTypeActions.sortChangerPrice({ sortType: SortOrder.asc }));
      }
    }

    if (event.currentTarget && event.currentTarget.name === 'name') {
      if (sortName === SortOrder.asc) {
        dispatch(sortTypeActions.sortChangerName({ sortType: SortOrder.desc }));
      } else {
        dispatch(sortTypeActions.sortChangerName({ sortType: SortOrder.asc }));
      }
    }
  };

  const handleCategoryFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(sortTypeActions.sortChangerCategory({ sortType: event.target.value }));
  };

  const handlePriceFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'minPrice') {
      dispatch(sortTypeActions.sortChangerMinPrice({ sortType: +event.target.value }));
    }
    if (event.target.name === 'maxPrice') {
      dispatch(sortTypeActions.sortChangerMaxPrice({ sortType: +event.target.value }));
    }
  };

  const sortResetHandle = () => {
    dispatch(sortTypeActions.sortChangerPrice({ sortType: SortOrder.desc }));
    dispatch(sortTypeActions.sortChangerName({ sortType: SortOrder.desc }));
    dispatch(sortTypeActions.sortChangerCategory({ sortType: '' }));
    dispatch(sortTypeActions.sortChangerMinPrice({ sortType: 0 }));
    dispatch(sortTypeActions.sortChangerMaxPrice({ sortType: 0 }));
    dispatch(sortTypeActions.sortChangerSelectColor({ sortType: [] }));
  };

  const handleColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    let updatedColors = [];
    if (checked) {
      updatedColors = [...selectedColors, name];
    } else {
      updatedColors = selectedColors.filter((color) => color !== name);
    }

    dispatch(sortTypeActions.sortChangerSelectColor({ sortType: updatedColors }));
  };

  useEffect(() => {
    if (!categorySlug) {
      dispatch(sortTypeActions.sortChangerCategory({ sortType: '' }));
    }
  }, [categorySlug, dispatch]);

  return (
    <div className={styles.filter} data-testid={dataTestId}>
      {!isFetching && !isError && (
        <div className={styles['filter-wrapper']}>
          {!categorySlug && (
            <div className={classNames(styles.filter__item, styles.item)}>
              <h2 className={styles.item__title}>{EnumText.FILTER_TEXT_TITLE_CAREGORY}</h2>
              <div className={styles.item__select}>
                <select value={selsectCategory} onChange={handleCategoryFilterChange}>
                  <option value=''>{EnumText.FILTER_TEXT_ALL}</option>
                  {categories.results.map((category: CategoriesResult) => (
                    <option value={category.slug['en-US']} key={category.id}>
                      {category.name[locale]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
          <div className={classNames(styles.filter__item, styles.item)}>
            <h2 className={styles.item__title}>{EnumText.FILTER_TEXT_TITLE_PRICE}</h2>
            <div className={classNames(styles.item__price, styles.price)}>
              <input type='number' name='minPrice' placeholder='От' onChange={handlePriceFilterChange} />
              <span>-</span>
              <input type='number' name='maxPrice' placeholder='До' onChange={handlePriceFilterChange} />
            </div>
          </div>
          <div className={classNames(styles.filter__item, styles.item, styles['ckeckbox-wrapper'])}>
            {colors.map((color) => (
              <label htmlFor={`filter-${color}`} key={color}>
                <input
                  id={`filter-${color}`}
                  type='checkbox'
                  name={color}
                  checked={selectedColors.includes(color)}
                  onChange={handleColorChange}
                />
                <span className={styles[`input-${color}`]} />
              </label>
            ))}
          </div>
          <button className={styles['button-sort']} type='button' name='price' onClick={sortButtonHandle}>
            <span>{EnumText.FILTER_TEXT_SORT_PRICE}</span>
            <img className={classNames({ [styles.active]: sortPrice })} src={sort} alt='' />
          </button>
          <button className={styles['button-sort']} type='button' name='name' onClick={sortButtonHandle}>
            <span>{EnumText.FILTER_TEXT_SORT_NAME}</span>
            <img className={classNames({ [styles.active]: sortName })} src={sort} alt='' />
          </button>
          <button
            className={classNames(styles['button-sort'], styles['button-reset'])}
            type='button'
            onClick={sortResetHandle}
          >
            <span>{EnumText.FILTER_TEXT_RESET}</span>
          </button>
        </div>
      )}
    </div>
  );
}
