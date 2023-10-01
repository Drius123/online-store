import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { sortTypeActions } from '../store/reducers/SortSlice';
import { isShowActions } from '../store/reducers/ViewSlice';

export type OtherClickProps = {
  isShow: boolean;
  body: React.MutableRefObject<HTMLDivElement | null>;
  button: React.MutableRefObject<HTMLButtonElement | null>;
  type: string;
};

export default function OtherClick({ body, button, isShow, type }: OtherClickProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        body.current &&
        !body.current.contains(event.target as Node) &&
        button.current &&
        !button.current.contains(event.target as Node)
      ) {
        if (type === 'filter') {
          dispatch(sortTypeActions.sortChangerIsShowFilter({ sortType: false }));
        }
        if (type === 'burger') {
          dispatch(isShowActions.viewMenuBurger({ isShow: false }));
        }
      }
    };

    if (isShow) {
      document.addEventListener('click', handleClick);
    }

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [body, isShow, button, type, dispatch]);
}
