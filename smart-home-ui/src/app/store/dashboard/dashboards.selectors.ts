import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardsState } from './dashboard.reducer';

export const selectDashboardsState = createFeatureSelector<DashboardsState>('dashboards');

export const selectDashboardsList = createSelector(
  selectDashboardsState,
  state => state.dashboards
);

export const selectLoadingDashboards = createSelector(
  selectDashboardsState,
  state => state.loading
);

export const selectErrorDashboards = createSelector(
  selectDashboardsState,
  state => state.error
);

export const selectorDashboardById = (id: string) =>
  createSelector(
    selectDashboardsList,
    dashboards => dashboards.find(d => d.id === id) || null
  );

export const selectorCurrentDashboard =
  createSelector(
    selectDashboardsState,
    state => state.selectedDashboard
  ) 