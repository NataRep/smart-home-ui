import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, Subscription, take } from 'rxjs';
import { Dashboard } from '../../models/api.model';
import { ModalService } from '../../services/modal.service';
import { deleteDashboard, deleteDashboardSuccess } from '../../store/dashboard/dashboard.actions';
import { selectDashboardsList, selectErrorDashboards, selectLoadingDashboards } from '../../store/dashboard/dashboards.selectors';
import { loadTabs } from '../../store/tabs/tabs.actions';
import { selectTabsList } from '../../store/tabs/tabs.selectors';

@Component({
  selector: 'app-confirm-delete-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './Confirm-delete-dashboard.component.html',
  styleUrl: './Confirm-delete-dashboard.component.scss'
})
export class ConfirmDeleteDashboardComponent implements OnInit, OnDestroy {
  @Input() dashboard!: Dashboard | null;

  private modalService = inject(ModalService);
  private store = inject(Store);
  private router = inject(Router);
  private actions$ = inject(Actions);

  isLoading = this.store.selectSignal(selectLoadingDashboards);
  errorMessage = this.store.selectSignal(selectErrorDashboards);
  dashboards = this.store.selectSignal(selectDashboardsList);

  private subscription!: Subscription;
  private deleteSuccessSubscription!: Subscription;

  ngOnInit() {
    this.subscription = this.modalService.data$.subscribe(data => {
      this.dashboard = data?.dashboard || null;
    });

    this.deleteSuccessSubscription = this.actions$.pipe(
      ofType(deleteDashboardSuccess),
      filter(() => !!this.dashboard)
    ).subscribe(() => {
      this.modalService.close();
      this.navigateAfterDelete();
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.deleteSuccessSubscription?.unsubscribe();
  }

  onDelete() {
    if (!this.dashboard?.id) {
      return;
    }

    const dashboardId = this.dashboard.id;
    this.store.dispatch(deleteDashboard({ dashboardId }));
  }

  onCancel() {
    this.modalService.close();
  }

  private navigateAfterDelete() {
    const currentDashboards = this.dashboards();

    if (currentDashboards.length === 0) {
      this.router.navigate(['/']);
      return;
    }

    const firstDashboardId = currentDashboards[0].id;


    this.store.dispatch(loadTabs({ dashboardId: firstDashboardId }));

    const tabsSubscription = this.store.select(selectTabsList)
      .pipe(
        filter(tabs => tabs.length > 0),
        take(1)
      )
      .subscribe(tabs => {
        const firstTabId = tabs[0].id;
        this.router.navigate([`/dashboard/${firstDashboardId}/${firstTabId}`]);
        tabsSubscription.unsubscribe();
      });
  }
}