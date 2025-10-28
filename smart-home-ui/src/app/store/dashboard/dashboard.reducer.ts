import { createReducer, on } from '@ngrx/store';
import { Dashboard } from '../../models/api.model';
import * as DashboardActions from './dashboard.actions';

export interface DashboardsState {
  dashboardsList: Dashboard[];
  selectedDashboard: Dashboard | null;
  loading: boolean;
  error: unknown;
  snapshotDashboard: Dashboard | null; // сюда сохраняем копию при входе в Edit Mode
}

export const initialState: DashboardsState = {
  dashboardsList: [],
  selectedDashboard: null,
  loading: false,
  error: null,
  snapshotDashboard: null,
};

export const dashboardReducer = createReducer(
  initialState,


  on(DashboardActions.loadDashboards, state => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(DashboardActions.loadDashboardsSuccess, (state, { dashboards }) => ({
    ...state,
    dashboardsList: dashboards,
    loading: false,
  })),

  on(DashboardActions.loadDashboardsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(DashboardActions.createDashboard, state => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(DashboardActions.createDashboardSuccess, (state, { dashboard }) => ({
    ...state,
    selectedDashboard: dashboard,
    loading: false,
  })),

  on(DashboardActions.createDashboardFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(DashboardActions.discardChanges, state => ({
    ...state,
    selectedDashboard: state.snapshotDashboard,
    snapshotDashboard: null,
    loading: false,
    error: null,
  })),
);