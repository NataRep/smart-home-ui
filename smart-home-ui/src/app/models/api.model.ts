import { ITEM_TYPE } from "./enums";

export interface Dashboard {
  id: string,
  title: string,
  icon: string
}

export interface DashboardTabs {
  tabs: Tab[];
}

export interface Tab {
  id: string;
  title: string;
  cards: Card[];
}

export interface Card {
  id: string;
  title: string;
  layout: string;
  items: (Device | Sensor)[];
}

export interface Device {
  id: string,
  type: ITEM_TYPE.DEVICE,
  icon: string,
  label: string,
  state: boolean
}

export interface Sensor {
  id: string,
  type: ITEM_TYPE.SENSOR,
  icon: string,
  label: string,
  value: SensorValue;
}

export interface SensorValue {
  amount: number;
  unit: string;
}

export interface User {
  fullName: string;
  initials: string;
}

export interface LoginResponse {
  token: string
}