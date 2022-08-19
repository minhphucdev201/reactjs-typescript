import productApi from 'api/productApi';
import { Product } from 'models';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { ListResponse } from './../../models/common';
import { dashboardActions } from './dashboardSlice';

function* fetchStatistics() {
  const responseList: Array<ListResponse<Product>> = yield all([
    call(productApi.getAll, {
      _page: 1,
      _limit: 1,
      name_contains: 'Áo Thun',
    }),
    call(productApi.getAll, {
      _page: 1,
      _limit: 1,
      name_contains: 'Áo Polo',
    }),
    call(productApi.getAll, {
      _page: 1,
      _limit: 10,
      name_contains: 'Áo Khoác',
    }),
  ]);
  const statisticList = responseList.map((x) => x.pagination.total);
  const [aoThunCount, aoPoloCount, aoKhoacCount] = statisticList;
  yield put(dashboardActions.setStatistics({ aoThunCount, aoPoloCount, aoKhoacCount }));
}
function* fetchHighestProductList() {
  const { data }: ListResponse<Product> = yield call(productApi.getAll, {
    _page: 1,
    _limit: 1,
    _sort: 'price:desc',
  });
  yield put(dashboardActions.setHighestProductList(data));
}
function* fetchLowestProductList() {
  const { data }: ListResponse<Product> = yield call(productApi.getAll, {
    _page: 1,
    _limit: 1,
    _sort: 'price',
  });
  yield put(dashboardActions.setLowestProductList(data));
}
function* fetchDashboardData() {
  try {
    yield all([call(fetchStatistics), call(fetchHighestProductList), call(fetchLowestProductList)]);
    yield put(dashboardActions.fetchDataSuccess());
  } catch (error) {
    console.log('failed to fetch dashboard data', error);
    yield put(dashboardActions.fetchDataFailed());
  }
}

export default function* dashboardSaga() {
  yield takeLatest(dashboardActions.fetchData.type, fetchDashboardData);
}
