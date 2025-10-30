import { createReducer, on } from '@ngrx/store';
import { Dashboard } from '../../models/api.model';
import * as DashboardActions from './dashboard.actions';

export interface DashboardsState {
  dashboards: Dashboard[];
  selectedDashboard: Dashboard | null;
  loading: boolean;
  error: unknown;
  snapshotDashboard: Dashboard | null; // сюда сохраняем копию при входе в Edit Mode
}

export const initialState: DashboardsState = {
  dashboards: [],
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
    dashboards: dashboards,
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
    dashboards: [...state.dashboards, dashboard],
    selectedDashboard: dashboard,
    loading: false,

  })),

  on(DashboardActions.createDashboardFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(DashboardActions.revertDashboardChanges, state => ({
    ...state,
    selectedDashboard: state.snapshotDashboard,
    snapshotDashboard: null,
    loading: false,
    error: null,
  })),

  on(DashboardActions.clearDashboardsError, (state) => ({
    ...state,
    error: null
  })),

  on(DashboardActions.deleteDashboard, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(DashboardActions.deleteDashboardSuccess, (state, { dashboardId }) => ({
    ...state,
    loading: false,
    selectedDashboard: state.dashboards[0],
    dashboards: state.dashboards.filter(d => d.id !== dashboardId),
  })),

  on(DashboardActions.deleteDashboardFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  }))
);