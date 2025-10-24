import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { DashboardService } from "../../services/dashboard.service";
import * as DashboardActions from './dashboard.actions';

@Injectable()
export class DashboardEffects {
  private actions$ = inject(Actions);
  private dashboardService = inject(DashboardService);

  loadDashboards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.loadDashboards),
      switchMap(() =>
        this.dashboardService.getDashboards().pipe(
          map(dashboards => DashboardActions.loadDashboardsSuccess({ dashboards })),
          catchError(error => of(DashboardActions.loadDashboardsFailure({ error })))
        ))
    ));
}