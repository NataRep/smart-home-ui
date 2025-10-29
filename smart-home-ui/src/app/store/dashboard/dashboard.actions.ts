import { createAction, props } from '@ngrx/store';
import { Dashboard } from '../../models/api.model';

export const loadDashboards = createAction(
  '[Dashboard] Load Dashboards'
);

export const loadDashboardsSuccess = createAction(
  '[Dashboard] Load Dashboards Success',
  props<{ dashboards: Dashboard[] }>()
);

export const loadDashboardsFailure = createAction(
  '[Dashboard] Load Dashboards Failure',
  props<{ error: unknown }>()
);

export const createDashboard = createAction(
  // effect sends POST /api/dashboards, then exitEditMode()
  '[Dashboard] Create Dashboard',
  props<{ dashboard: Dashboard }>()
);

export const createDashboardSuccess = createAction(
  '[Dashboard] Create Dashboard Success',
  props<{ dashboard: Dashboard }>()
);

export const createDashboardFailure = createAction(
  '[Dashboard] Create Dashboard Failure',
  props<{ error: unknown }>()
);

export const discardChanges = createAction(
  //reverts to snapshot made at Edit Mode entry, then exitEditMode()
  '[Dashboard] Discard Changes'
);

export const clearDashboardsError = createAction('[Dashboard] Clear Error');

