import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, mergeMap, of, switchMap } from 'rxjs';
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

  createDashboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.createDashboard),
      exhaustMap((action) =>
        this.dashboardService.createDashboard({ ...action.dashboard }).pipe(
          map(dashboard => DashboardActions.createDashboardSuccess({ dashboard })),
          catchError(error => {
            return of(DashboardActions.createDashboardFailure({ error: error.error || 'Something is wrong. Please change the details.' }))
          })
        ))
    )
  )

  deleteDashboard$ = createEffect(() => this.actions$.pipe(
    ofType(DashboardActions.deleteDashboard),
    mergeMap(({ dashboardId }) =>
      this.dashboardService.deleteDashboardById(dashboardId).pipe(
        map(() => DashboardActions.deleteDashboardSuccess({ dashboardId })),
        catchError(error => of(DashboardActions.deleteDashboardFailure({ error })))
      )
    )))
}