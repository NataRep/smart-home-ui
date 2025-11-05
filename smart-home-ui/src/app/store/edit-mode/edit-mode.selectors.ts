import { createFeatureSelector } from "@ngrx/store";
import { EditModeState } from "./edit-mode.reducer";

export const selectEditModeState = createFeatureSelector<EditModeState>('editMode');