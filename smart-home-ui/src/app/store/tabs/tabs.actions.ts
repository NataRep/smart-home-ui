import { createAction, props } from '@ngrx/store';

export const addTab = createAction(
  '[Tabs] Add Tab',
  props<{ title: string }>()
);

export const removeTab = createAction(
  '[Tabs] Remove Tab',
  props<{ tabId: string }>()
);

export const reorderTab = createAction(
  '[Tabs] Reorder Tab',
  props<{ tabId: string, direction: 'left' | 'right' }>()
);