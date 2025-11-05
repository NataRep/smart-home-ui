import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { tap } from "rxjs";
import { revertDashboardChanges } from "../dashboard/dashboard.actions";
import { exitEditMode } from "./edit-mode.actions";

@Injectable()
export class EditModeEffects {
  private actions$ = inject(Actions);
  private store = inject(Store)

  exitEditMode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(exitEditMode),
      tap(() =>
        this.store.dispatch(revertDashboardChanges())
      )
    )
  );
}