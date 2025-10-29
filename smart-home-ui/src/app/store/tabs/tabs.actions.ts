import { createAction, props } from '@ngrx/store';
import { Device, Tab } from '../../models/api.model';

export const loadTabs = createAction(
  '[Tabs] Load Tabs',
  props<{ dashboardId: string }>()
);

export const loadTabsSuccess = createAction(
  '[Tabs] Load Tabs Success',
  props<{ tabs: Tab[] }>()
);

export const loadTabsFailure = createAction(
  '[Tabs] Load Tabs Failure',
  props<{ error: unknown }>()
);

export const addTab = createAction(
  '[Tabs] Add Tab',
  props<{ title: string }>()
);

export const addTabSuccess = createAction(
  '[Tabs] Add Tab Success',
  props<{ tab: Tab }>()
);

export const addTabFailure = createAction(
  '[Tabs] Add Tab Failure',
  props<{ error: unknown }>()
);

export const removeTab = createAction(
  '[Tabs] Remove Tab',
  props<{ tabId: string }>()
);

export const removeTabSuccess = createAction(
  '[Tabs] Remove Tab Success',
  props<{ tabId: string }>()
);

export const removeTabFailure = createAction(
  '[Tabs] Remove Tab Failure',
  props<{ error: unknown }>()
);

export const reorderTab = createAction(
  '[Tabs] Reorder Tab',
  props<{ tabId: string, direction: 'left' | 'right' }>()
);

export const navigateToFirstTab = createAction(
  '[Tabs] Navigate To First Tab',
  props<{ dashboardId: string; tabId: string }>()
);

export const loadTabsAndNavigate = createAction(
  '[Tabs] Load Tabs And Navigate',
  props<{ dashboardId: string }>()
);

export const toggleDeviceState = createAction(
  '[Devices] Toggle Device state',
  props<{ id: string, state: boolean }>()
);

export const toggleDeviceStateSuccess = createAction(
  '[Devices] Toggle Device State Success',
  props<{ device: Device }>()
);

export const toggleDeviceStateFailure = createAction(
  '[Devices] Toggle Device State Failure',
  props<{ error: unknown }>()
);
