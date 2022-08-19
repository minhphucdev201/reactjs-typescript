import { Product } from './../../models/product';
import { PayloadAction } from '@reduxjs/toolkit';
import { productActions } from './productSlice';
import { call, debounce, put, takeLatest } from 'redux-saga/effects';
import { ListParams, ListResponse } from 'models';
import productApi from 'api/productApi';
function* fetchProductList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Product> = yield call(productApi.getAll, action.payload);
    yield put(productActions.fetchProductListSuccess(response));
  } catch (error) {
    console.log('failed to fetch product', error);
  }
  yield put(productActions.fetchProductListFailed('error.message'));
}

function* handleSearchDebouce(action: PayloadAction<ListParams>) {
  yield put(productActions.setFilter(action.payload));
}

export default function* productSaga() {
  yield takeLatest(productActions.fetchProductList, fetchProductList);
  yield debounce(500, productActions.setFilterWithDebounce.type, handleSearchDebouce);
}
