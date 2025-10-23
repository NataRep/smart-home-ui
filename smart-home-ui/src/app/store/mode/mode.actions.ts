import { createAction } from "@ngrx/store";

export const enterEditMode = createAction(
  '[Mode] Enter Edit Mode'
);

export const exitEditMode = createAction(
  '[Mode] Exit Edit Mode'
);