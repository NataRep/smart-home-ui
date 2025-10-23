import { createAction, props } from '@ngrx/store';

export const toggleDeviceState = createAction(
  //effect sends PATCH /api/devices/:deviceId
  '[Device] Toggle Device State',
  props<{ deviceId: string, newState: boolean }>()
);
