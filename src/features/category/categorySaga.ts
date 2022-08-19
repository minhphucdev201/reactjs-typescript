import categoryApi from 'api/categoryApi';
import { call, put, takeLatest } from 'redux-saga/effects';
import { Category, ListParams, ListResponse } from 'models';
import { categoryActions } from './categorySlice';
import { PayloadAction } from '@reduxjs/toolkit';

function* fetchCategoryList() {
  try {
    const response: ListResponse<Category> = yield call(categoryApi.getAll);
    yield put(categoryActions.fetchCategorySuccess(response));
  } catch (error) {
    console.log('failed to fetch category:', error);
    yield put(categoryActions.fetchCategoryFailed());
  }
}
export default function* categorySaga() {
  yield takeLatest(categoryActions.fetchCategoryList.type, fetchCategoryList);
}
