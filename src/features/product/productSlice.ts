import { RootState } from './../../app/store';
import { ListResponse, PaginationParams } from './../../models/common';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListParams, Product } from 'models';

export interface ProductState {
  loading: boolean;
  list: Product[];
  filter: ListParams;
  pagination: PaginationParams;
}
const initialState: ProductState = {
  loading: false,
  list: [],
  filter: {
    _page: 1,
    _limit: 3,
  },
  pagination: {
    page: 1,
    limit: 12,
    total: 12,
  },
};
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    fetchProductList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },
    fetchProductListSuccess(state, action: PayloadAction<ListResponse<Product>>) {
      state.list = action.payload.data;
      state.pagination = action.payload.pagination;
      // console.log(state.pagination);
      state.loading = false;
    },
    fetchProductListFailed(state, action: PayloadAction<string>) {
      state.loading = false;
    },

    setFilter(state, action: PayloadAction<ListParams>) {
      state.filter = action.payload;
    },
    setFilterWithDebounce(state, action: PayloadAction<ListParams>) {
      state.filter = action.payload;
    },
  },
});
//actions
export const productActions = productSlice.actions;
// selectors
export const selectProductList = (state: RootState) => state.product.list;
export const selectProductLoading = (state: RootState) => state.product.loading;
export const selectProductFilter = (state: RootState) => state.product.filter;
export const selectProductPagination = (state: RootState) => state.product.pagination;
// reducer
const productReducer = productSlice.reducer;
export default productReducer;
