import useGetProductsQuery from '../store/services';
import { refreshToken } from '../store/services/refreshToken';
import { useGetCategoriesQuery } from '../store/services/categoriesApi';
import { useGetDiscountsQuery } from '../store/services/discountsApi';

export default function useGetFullProductsQuery() {
  const arg = 0;
  const {
    data: products,
    isLoading: isFetchingP,
    isError: isErrorP,
    error: errorP,
    refetch: refetchP,
  } = useGetProductsQuery(arg);
  const {
    // data: categories,
    isLoading: isFetchingC,
    isError: isErrorC,
    error: errorC,
    // refetch: refetchC,
  } = useGetCategoriesQuery(arg);
  const {
    // data: discounts,
    isLoading: isFetchingD,
    isError: isErrorD,
    error: errorD,
    // refetch: refetchD,
  } = useGetDiscountsQuery(arg);

  const error = errorP || errorC || errorD;
  const isFetching = isFetchingP || isFetchingC || isFetchingD;
  const isError = isErrorP || isErrorC || isErrorD;
  // const refetch = refetchP && refetchC && refetchD;

  if (error && 'status' in error && error?.status === 401) {
    refreshToken().then(() => {
      refetchP();
    });
  }

  return {
    products,
    isFetching,
    isError,
    error,
  };
}
