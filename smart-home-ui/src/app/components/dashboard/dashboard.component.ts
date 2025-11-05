import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, signal, TemplateRef, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { timer } from 'rxjs';
import { Tab } from '../../models/api.model';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { ModalService } from '../../services/modal.service';
import { loadDashboardsSuccess, selectDashboard } from '../../store/dashboard/dashboard.actions';
import { selectLoadingDashboards, selectorCurrentDashboard } from '../../store/dashboard/dashboards.selectors';
import { enterEditMode } from '../../store/edit-mode/edit-mode.actions';
import { selectEditModeState } from '../../store/edit-mode/edit-mode.selectors';
import { loadTabs } from '../../store/tabs/tabs.actions';
import { selectLoadingTabs, selectTabsError, selectTabsList } from '../../store/tabs/tabs.selectors';
import { CardListComponent } from '../card-list/card-list.component';
import { ConfirmDeleteDashboardComponent } from '../confirm-delete-dashboard/confirm-delete-dashboard.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardListComponent, ConfirmDeleteDashboardComponent, CapitalizePipe, CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  @ViewChild('deleteConfirmDashboardTemplate', { static: true })
  deleteDashboardTemplate!: TemplateRef<unknown>;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(Store);
  private actions$ = inject(Actions);
  private destroyRef = inject(DestroyRef);
  private modalService = inject(ModalService);

  dashboard = this.store.selectSignal(selectorCurrentDashboard);
  tabs = this.store.selectSignal(selectTabsList);
  isLoading = this.store.selectSignal(selectLoadingTabs);
  isDashboardsLoaded = this.store.selectSignal(selectLoadingDashboards);
  error = this.store.selectSignal(selectTabsError);
  editMode = this.store.selectSignal(selectEditModeState);
  isEditing = computed(() => this.editMode().isEditing);

  showLoading = signal(false);
  dashboardId = signal<string | null>(null);
  activeTabId = signal<string | null>(null);

  activeTabCards = computed(() => {
    const tabId = this.activeTabId();
    return this.tabs().find(tab => tab.id === tabId)?.cards || [];
  });

  constructor() {
    this.initRouteListener();
    this.initTabSelection();
    this.watchLoadingWithDelay(2000);
    this.actions$.pipe(
      ofType(loadDashboardsSuccess),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      this.onDashboardsLoaded();
    });

  }

  private onDashboardsLoaded() {
    this.store.dispatch(selectDashboard({ dashboardId: this.dashboardId(), }));
  }

  private initRouteListener() {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(paramMap => {
        const dashboardId = paramMap.get('dashboardId');
        const tabId = paramMap.get('tabId');
        this.dashboardId.set(dashboardId);
        this.activeTabId.set(tabId);

        if (dashboardId) {
          this.loadTabs(dashboardId);
        }
      });
  }

  private initTabSelection() {
    computed(() => {
      const tabs = this.tabs();
      const currentTab = this.activeTabId();
      if (tabs.length > 0 && (!currentTab || !tabs.some(t => t.id === currentTab))) {
        const firstTabId = tabs[0].id;
        this.activeTabId.set(firstTabId);

        if (this.dashboardId()) {
          this.router.navigate(['dashboard', this.dashboardId(), firstTabId]);
        }
      }
    });
  }

  private loadTabs(dashboardId: string) {
    this.store.dispatch(loadTabs({ dashboardId }));
  }

  private watchLoadingWithDelay(delayMs: number) {
    computed(() => {
      if (this.isLoading()) {
        const timerSub = timer(delayMs)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(() => this.showLoading.set(true));

        computed(() => {
          if (!this.isLoading()) {
            timerSub.unsubscribe();
            this.showLoading.set(false);
          }
        });
      }
    });
  }

  onTabButton(tabId: string) {
    this.activeTabId.set(tabId);
    if (this.dashboardId()) {
      this.router.navigate(['dashboard', this.dashboardId(), tabId]);
    }
  }

  onDashboardDeleteButton() {
    this.modalService.open(this.deleteDashboardTemplate, 'deleteDashboard',
      { dashboard: this.dashboard },
    );
  }

  onEnterEditMode() {
    this.store.dispatch(enterEditMode())
  }

  shiftTab(direction: string) {
    console.log(direction)
  }

  onEditTab(tab: Tab) {
    console.log(tab)

  }
}
