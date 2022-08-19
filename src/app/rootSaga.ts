import authSaga from 'features/auth/authSaga';
import categorySaga from 'features/category/categorySaga';
import counterSaga from 'features/counter/counterSaga';
import dashboardSaga from 'features/dashboard/dashboardSaga';
import productSaga from 'features/product/productSaga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([counterSaga(), authSaga(), dashboardSaga(), productSaga(), categorySaga()]);
}
