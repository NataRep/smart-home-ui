import { createAction } from "@ngrx/store";

export const enterEditMode = createAction(
  '[Edit Mode] Enter Edit Mode'
);

export const exitEditMode = createAction(
  '[Edit Mode] Exit Edit Mode'
);