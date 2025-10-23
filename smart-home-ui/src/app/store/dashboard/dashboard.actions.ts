import { createAction, props } from '@ngrx/store';
import { Dashboard } from '../../models/api.model';

export const saveDashboard = createAction(
  // effect sends POST /api/dashboards/:dashboardId, then exitEditMode()
  '[Dashboard] Save Dashboard'
);

export const saveDashboardSuccess = createAction(
  '[Dashboard] Save Dashboard Success',
  props<{ dashboard: Dashboard }>()
);

export const saveDashboardFailure = createAction(
  '[Dashboard] Save Dashboard Failure',
  props<{ error: unknown }>()
);

export const discardChanges = createAction(
  //reverts to snapshot made at Edit Mode entry, then exitEditMode()
  '[Dashboard] Discard Changes'
);

