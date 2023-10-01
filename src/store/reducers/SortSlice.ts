import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortOrder } from '../../types';

export type SortTypeState = {
  sortPrice: SortOrder;
  sortName: SortOrder;
  sortType: string;
  selectCategory: string;
  isSelectCategory: boolean;
  minPrice: number;
  maxPrice: number;
  isShowFilter: boolean;
  selectColor: string[];
};

const initialState: SortTypeState = {
  sortPrice: SortOrder.desc,
  sortName: SortOrder.desc,
  sortType: 'price',
  selectCategory: '',
  isSelectCategory: false,
  minPrice: 0,
  maxPrice: 0,
  isShowFilter: false,
  selectColor: [],
};

export const sortSlice = createSlice({
  name: 'sortType',
  initialState,
  reducers: {
    sortChangerPrice: (state, action: PayloadAction<{ sortType: SortOrder }>) => {
      const sortState = state;
      sortState.sortPrice = action.payload.sortType;
    },
    sortChangerName: (state, action: PayloadAction<{ sortType: SortOrder }>) => {
      const sortState = state;
      sortState.sortName = action.payload.sortType;
    },
    sortChangerType: (state, action: PayloadAction<{ sortType: string }>) => {
      const sortState = state;
      sortState.sortType = action.payload.sortType;
    },
    sortChangerCategory: (state, action: PayloadAction<{ sortType: string }>) => {
      const sortState = state;
      sortState.selectCategory = action.payload.sortType;
    },
    sortChangerIsSelect: (state, action: PayloadAction<{ sortType: boolean }>) => {
      const sortState = state;
      sortState.isSelectCategory = action.payload.sortType;
    },
    sortChangerMinPrice: (state, action: PayloadAction<{ sortType: number }>) => {
      const sortState = state;
      sortState.minPrice = action.payload.sortType;
    },
    sortChangerMaxPrice: (state, action: PayloadAction<{ sortType: number }>) => {
      const sortState = state;
      sortState.maxPrice = action.payload.sortType;
    },
    sortChangerIsShowFilter: (state, action: PayloadAction<{ sortType: boolean }>) => {
      const sortState = state;
      sortState.isShowFilter = action.payload.sortType;
    },
    sortChangerSelectColor: (state, action: PayloadAction<{ sortType: string[] }>) => {
      const sortState = state;
      sortState.selectColor = action.payload.sortType;
    },
  },
});

export const { reducer: SortTypeReducer, actions: sortTypeActions } = sortSlice;
