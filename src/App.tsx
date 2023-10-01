import { Navigate, Routes, Route } from 'react-router-dom';

import { AppLayout, AuthLayout } from './layouts';
import { AuthPage, AboutUsPage, HomePage, NotFoundPage, ProductPage, RegisterPage, UserProfilePage } from './pages';

import './App.scss';
import routeNames from './routing/routs';
import { refreshToken } from './store/services/refreshToken';
import useGetProductsQuery from './store/services';
import Products from './components/products/products';
import BagPage from './pages/bag-page/bag-page';
import { useGetBasketQuery } from './store/services/getBasketApi';
// import useGetFullProductsQuery from './hooks';

export default function App() {
  const { data, isLoading, error, refetch } = useGetProductsQuery('');
  const { error: errorCart } = useGetBasketQuery('');
  if (error && 'status' in error && error?.status === 401) {
    refreshToken().then(() => {
      refetch();
    });
  }
  if (errorCart && 'status' in errorCart && errorCart?.status === 401) {
    // eslint-disable-next-line no-console
    console.log('Не могу получить корзину');
  }
  return (
    <div>
      {isLoading && <div>Загрузка...</div>}
      {data && (
        <div>
          <Routes>
            <Route path='*' element={<NotFoundPage />} />
            <Route path={routeNames.PATH} element={<AppLayout />}>
              <Route path={routeNames.PATH} element={<Navigate to={routeNames.HOME} />} />
              <Route path={routeNames.HOME} element={<HomePage />} />
              <Route path={routeNames.ABOUTUS} element={<AboutUsPage />} />
              <Route path={routeNames.PROFILE} element={<UserProfilePage />} />
              <Route path={routeNames.BAG} element={<BagPage />} />
              <Route path={`${routeNames.HOME}/:${routeNames.CATEGORY}`} element={<Products />} />
              <Route path={`${routeNames.HOME}/:${routeNames.CATEGORY}/:productId`} element={<ProductPage />} />
            </Route>
            <Route element={<AuthLayout />}>
              <Route path={routeNames.AUTH} element={<AuthPage />} />
              <Route path={routeNames.REGISTRATION} element={<RegisterPage />} />
            </Route>
          </Routes>
        </div>
      )}
    </div>
  );
}
