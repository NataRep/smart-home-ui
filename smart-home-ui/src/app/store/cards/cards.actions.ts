import { createAction, props } from '@ngrx/store';
import { Device, Sensor } from '../../models/api.model';


export const addCard = createAction(
  '[Cards] Add Card',
  props<{ tabId: string, layout: string }>()
);


export const removeCard = createAction(
  '[Cards] Remove Card',
  props<{ tabId: string, cardId: string }>()
);

export const reorderCard = createAction(
  // visually update position in the UI immediately, persist only on Save.
  '[Cards] Reorder Card',
  props<{ tabId: string, cardId: string, newIndex: number }>()
);


export const addItemToCard = createAction(
  '[Cards] Add Item To Card',
  props<{ tabId: string, cardId: string, item: Device | Sensor }>()
);

export const removeItemFromCard = createAction(
  '[Cards] Remove Item From Card',
  props<{ tabId: string, cardId: string, itemId: string }>()
);
