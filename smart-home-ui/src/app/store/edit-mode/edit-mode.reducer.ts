import { createReducer, on } from "@ngrx/store";
import { enterEditMode, exitEditMode } from "./edit-mode.actions";

export interface EditModeState {
  isEditing: boolean
}

export const initialState: EditModeState = {
  isEditing: false
};

export const editModeReducer = createReducer(
  initialState,


  on(enterEditMode, state => ({
    ...state,
    isEditing: true
  })),

  on(exitEditMode, state => ({
    ...state,
    isEditing: false
  })),
)
