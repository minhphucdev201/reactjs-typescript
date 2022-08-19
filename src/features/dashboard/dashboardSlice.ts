import { RootState } from './../../app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from 'models';
export interface DashboardStatistics {
  aoThunCount: number;
  aoPoloCount: number;
  aoKhoacCount: number;
}
export interface DashboardState {
  loading: boolean;
  statistics: DashboardStatistics;
  highestProductList: Product[];
  lowestProductList: Product[];
}
const initialState: DashboardState = {
  loading: false,
  statistics: {
    aoThunCount: 0,
    aoPoloCount: 0,
    aoKhoacCount: 0,
  },
  highestProductList: [],
  lowestProductList: [],
};
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    fetchData(state) {
      state.loading = true;
    },
    fetchDataSuccess(state) {
      state.loading = false;
    },
    fetchDataFailed(state) {
      state.loading = false;
    },

    setStatistics(state, action: PayloadAction<DashboardStatistics>) {
      state.statistics = action.payload;
    },
    setHighestProductList(state, action: PayloadAction<Product[]>) {
      state.highestProductList = action.payload;
    },
    setLowestProductList(state, action: PayloadAction<Product[]>) {
      state.lowestProductList = action.payload;
    },
  },
});
//actions
export const dashboardActions = dashboardSlice.actions;
//selectors
export const selectDashboardLoading = (state: RootState) => state.dashboard.loading;
export const selectDashboardStatistics = (state: RootState) => state.dashboard.statistics;
export const selectHighestProductList = (state: RootState) => state.dashboard.highestProductList;
export const selectLowestProductList = (state: RootState) => state.dashboard.lowestProductList;
//reducer
const dashboardReducer = dashboardSlice.reducer;
export default dashboardReducer;
