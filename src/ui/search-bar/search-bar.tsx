import { useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { SearchBarProps } from '../../types';
import { searchInputActions } from '../../store/reducers/SearchInputSlice';

import search from '../../assets/search-icon.svg';

import styles from './search-bar.module.scss';

export default function SearchBar({ dataTestId }: SearchBarProps) {
  const [searchInput, setSearchInput] = useState('');
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      event.preventDefault();
      setSearchInput(event.target.value);
      dispatch(searchInputActions.inputValueCHanger({ query: event.target.value }));
    },
    [dispatch]
  );

  return (
    <form className={styles['search-bar']} action='' data-testid={dataTestId}>
      <button type='button'>
        <img src={search} alt='search-icon' />
      </button>
      <input type='search' placeholder='Поиск' ref={inputRef} onChange={handleChange} value={searchInput} />
    </form>
  );
}
