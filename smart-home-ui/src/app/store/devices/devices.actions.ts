import { createAction, props } from "@ngrx/store";
import { Device } from "../../models/api.model";

export const loadDevices = createAction(
  '[Devices] Load Devices'
);

export const loadDevicesSuccess = createAction(
  '[Devices] Load Devices Success',
  props<{ devices: Device[] }>()
);

export const loadDevicesFailure = createAction(
  '[Devices] Load Devices Failure',
  props<{ error: unknown }>()
);
