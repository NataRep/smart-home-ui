export enum ITEM_TYPE {
  DEVICE = 'device',
  SENSOR = 'sensor',
}

export enum CARD_LAYOUT {
  VERTICAL = 'verticalLayout',
  HORIZONTAL = 'horizontalLayout',
  SINGLE = 'singleDevice',
}

export type Toggler = {
  state: boolean;
};
