import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, Subject, takeUntil } from 'rxjs';
import { Dashboard } from '../../models/api.model';
import { ModalService } from '../../services/modal.service';
import { NavigationService } from '../../services/navigate.service';
import { deleteDashboard, deleteDashboardSuccess } from '../../store/dashboard/dashboard.actions';
import { selectErrorDashboards, selectLoadingDashboards } from '../../store/dashboard/dashboards.selectors';

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
  private navigationService = inject(NavigationService); // Используем сервис
  private actions$ = inject(Actions);

  isLoading = this.store.selectSignal(selectLoadingDashboards);
  errorMessage = this.store.selectSignal(selectErrorDashboards);

  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.modalService.data$
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.dashboard = data?.dashboard || null;
      });

    this.actions$.pipe(
      ofType(deleteDashboardSuccess),
      filter(() => !!this.dashboard),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.modalService.close();
      this.navigateAfterDelete();
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDelete() {
    if (!this.dashboard?.id) {
      console.error('No dashboard to delete');
      return;
    }

    const dashboardId = this.dashboard.id;
    this.store.dispatch(deleteDashboard({ dashboardId }));
  }

  onCancel() {
    this.modalService.close();
  }

  private navigateAfterDelete() {
    this.navigationService.navigateToFirstAvailableDashboard();
  }
}