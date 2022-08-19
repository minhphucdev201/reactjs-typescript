import { configureStore, ThunkAction, combineReducers, Action } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import authReducer from 'features/auth/authSlice';
import dashboardReducer from 'features/dashboard/dashboardSlice';
import counterReducer from '../features/counter/counterSlice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import { history } from 'utils';
import productReducer from 'features/product/productSlice';
import categoryReducer from 'features/category/categorySlice';

const rootReducer = combineReducers({
  router: connectRouter(history),
  counter: counterReducer,
  auth: authReducer,
  dashboard: dashboardReducer,
  product: productReducer,
  category: categoryReducer,
});
const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware(history)),
});

sagaMiddleware.run(rootSaga);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
