import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { Device } from '../../models/api.model';
import { DashboardService } from '../../services/dashboard.service';
import * as TabsActions from './tabs.actions';

@Injectable()
export class TabsEffects {
  private actions$ = inject(Actions);
  private dashboardService = inject(DashboardService);
  private router = inject(Router);
  private store = inject(Store);

  // Загрузка вкладок
  loadTabs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TabsActions.loadTabs),
      switchMap(action =>
        this.dashboardService.getDashboardTabs(action.dashboardId).pipe(
          map(response => TabsActions.loadTabsSuccess({ tabs: response.tabs })),
          catchError(error => of(TabsActions.loadTabsFailure({ error })))
        )
      )
    )
  );

  // Загрузка вкладок и навигация на первую
  loadTabsAndNavigate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TabsActions.loadTabsAndNavigate),
      switchMap(action =>
        this.dashboardService.getDashboardTabs(action.dashboardId).pipe(
          switchMap(response => {
            const tabs = response.tabs ?? [];
            const firstTabId = tabs.length > 0 ? tabs[0].id : "null";

            return [
              TabsActions.loadTabsSuccess({ tabs }),
              TabsActions.navigateToFirstTab({
                dashboardId: action.dashboardId,
                tabId: firstTabId
              })
            ];
          }),
          catchError(error => of(TabsActions.loadTabsFailure({ error })))
        )
      )
    )
  );

  // Навигация на первую вкладку (без dispatch)
  navigateToFirstTab$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TabsActions.navigateToFirstTab),
        tap(({ dashboardId, tabId }) => {
          if (dashboardId && tabId) {
            this.router.navigate(['dashboard', dashboardId, tabId]);
          }
        })
      ),
    { dispatch: false }
  );

  // Переключение состояния устройства
  toggleDeviceState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TabsActions.toggleDeviceState),
      mergeMap(action =>
        this.dashboardService.changeStateDeviceById(action.id, action.state).pipe(
          map((device: Device) => TabsActions.toggleDeviceStateSuccess({ device })),
          catchError(error => of(TabsActions.toggleDeviceStateFailure({ error })))
        )
      )
    )
  );
}
