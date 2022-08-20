import categoryApi from 'api/categoryApi';
import { Category, ListResponse } from 'models';
import { call, put, takeLatest } from 'redux-saga/effects';
import { categoryActions } from './categorySlice';

function* fetchCategoryList() {
  try {
    const response: ListResponse<Category> = yield call(categoryApi.getAll);
    yield put(categoryActions.fetchCategoryListSuccess(response));
  } catch (error) {
    console.log('failed to fetch category:', error);
    yield put(categoryActions.fetchCategoryListFailed());
  }
}
export default function* categorySaga() {
  yield takeLatest(categoryActions.fetchCategoryList.type, fetchCategoryList);
}
