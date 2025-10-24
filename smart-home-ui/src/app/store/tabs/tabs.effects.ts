import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, of, switchMap } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DashboardService } from '../../services/dashboard.service';
import * as TabsActions from './tabs.actions';

@Injectable()
export class TabsEffects {
  private actions$ = inject(Actions);
  private dashboardService = inject(DashboardService);
  private router = inject(Router);
  private store = inject(Store);

  loadTabs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TabsActions.loadTabs),
      switchMap(action =>
        this.dashboardService.getDashboardTabs(action.dashboardId).pipe(
          switchMap(response => [
            TabsActions.loadTabsSuccess({ tabs: response.tabs })
          ]),
          catchError(error => of(TabsActions.loadTabsFailure({ error })))
        )
      )
    )
  );

  loadTabsAndNavigate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TabsActions.loadTabsAndNavigate),
      switchMap(action =>
        this.dashboardService.getDashboardTabs(action.dashboardId).pipe(
          switchMap(response => [
            TabsActions.loadTabsSuccess({ tabs: response.tabs }),
            TabsActions.navigateToFirstTab({
              dashboardId: action.dashboardId,
              tabId: response.tabs[0]?.id
            })
          ]),
          catchError(error => of(TabsActions.loadTabsFailure({ error })))
        )
      )
    )
  );

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
}