import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardsState } from './dashboard.reducer';

export const selectDashboardsState = createFeatureSelector<DashboardsState>('dashboards');

export const selectDashboardsList = createSelector(
  selectDashboardsState,
  state => state.dashboardsList
);

export const selectLoadingDashboards = createSelector(
  selectDashboardsState,
  state => state.loading
);