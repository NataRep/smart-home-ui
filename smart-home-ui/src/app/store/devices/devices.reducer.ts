import { createReducer, on } from "@ngrx/store";
import { Device } from "../../models/api.model";
import * as DevicesActions from "./devices.actions";

export interface DevicesState {
  devicesList: Device[];
  loading: boolean;
  error: unknown;
}

export const initialState: DevicesState = {
  devicesList: [],
  loading: false,
  error: null,
};

export const devicesReducer = createReducer(
  initialState,

  on(DevicesActions.loadDevices, state => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(DevicesActions.loadDevicesSuccess, (state, { devices }) => ({
    ...state,
    devicesList: devices,
    loading: false,
    error: null,

  })),

  on(DevicesActions.loadDevicesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

)

