import { RootState } from 'app/store';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from 'models';
import { ListResponse, PaginationParams } from './../../models/common';

export interface CategoryState {
  loading: boolean;
  list: Category[];
}
const initialState: CategoryState = {
  loading: false,
  list: [],
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    fetchCategoryList(state) {
      state.loading = true;
    },
    fetchCategoryListSuccess(state, action: PayloadAction<ListResponse<Category>>) {
      state.list = action.payload.data;
      // state.pagination = action.payload.pagination;
      state.loading = false;
      console.log(state.list);
    },
    fetchCategoryListFailed(state) {
      state.loading = false;
    },
  },
});
//actions
export const categoryActions = categorySlice.actions;
//selectors
export const selectCategoryList = (state: RootState) => state.category.list;
export const selectCategoryLoading = (state: RootState) => state.category.loading;
export const selectCategoryMap = createSelector(selectCategoryList, (list) =>
  list.reduce((map: { [key: string]: Category }, category) => {
    map[category.id] = category;
    return map;
  }, {})
);

export const selectCategoryOptions = createSelector(selectCategoryList, (categoryList) =>
  categoryList.map((cat) => ({
    label: cat.title,
    value: cat.id,
  }))
);

//reducer
const categoryReducer = categorySlice.reducer;
export default categoryReducer;
