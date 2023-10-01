import { configureStore } from '@reduxjs/toolkit';
import { api } from './services/api';
import { userTokenApi } from './services/userTokenApi';
import { authUserSlice } from './reducers/AuthUserSlice';
//  import { productsSlice } from './reducers/ProductsSlice.ts';
import { userTokenSlice } from './reducers/UserTokenSlice';
import { productsSlice } from './reducers/ProductsSlice';
import { categoriesSlice } from './reducers/CategoriesSlice';
import { discountsSlice } from './reducers/DiscountsSlice';
import { rtkQueryErrorLogger } from './rtkQueryErrorLogger';
import { searchInputSlice } from './reducers/SearchInputSlice';
import { sortSlice } from './reducers/SortSlice';
import { currentUserApi } from './services/getCurrentUserApi';
import { viewSlice } from './reducers/ViewSlice';
import { basketApi } from './services/getBasketApi';
import { basketSlice } from './reducers/BasketSlice';
import { pageSlice } from './reducers/PageSlice';
import { productsPagingSlice } from './reducers/ProductsPagingSlice';

export const setupStore = () =>
  configureStore({
    reducer: {
      [userTokenApi.reducerPath]: userTokenApi.reducer,
      [api.reducerPath]: api.reducer,
      [currentUserApi.reducerPath]: currentUserApi.reducer,
      [basketApi.reducerPath]: basketApi.reducer,
      user: authUserSlice.reducer,
      products: productsSlice.reducer,
      token: userTokenSlice.reducer,
      categories: categoriesSlice.reducer,
      discounts: discountsSlice.reducer,
      searchInput: searchInputSlice.reducer,
      sortType: sortSlice.reducer,
      isShow: viewSlice.reducer,
      basket: basketSlice.reducer,
      page: pageSlice.reducer,
      productsPaging: productsPagingSlice.reducer,
    },
    middleware: (getDefaultMiddlware) =>
      getDefaultMiddlware().concat(
        userTokenApi.middleware,
        api.middleware,
        currentUserApi.middleware,
        basketApi.middleware,
        rtkQueryErrorLogger
      ),
  });

export const store = setupStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
