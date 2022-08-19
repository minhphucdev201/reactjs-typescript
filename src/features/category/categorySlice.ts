import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { Category, ListResponse } from 'models';

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
    fetchCategorySuccess(state, action: PayloadAction<ListResponse<Category>>) {
      state.list = action.payload.data;
      state.loading = false;
      console.log(state.list);
    },
    fetchCategoryFailed(state) {
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

//reducer
const categoryReducer = categorySlice.reducer;
export default categoryReducer;
