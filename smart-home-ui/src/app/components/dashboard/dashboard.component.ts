import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, signal, TemplateRef, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { timer } from 'rxjs';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { ModalService } from '../../services/modal.service';
import { selectorDashboardById } from '../../store/dashboard/dashboards.selectors';
import { loadTabs } from '../../store/tabs/tabs.actions';
import { selectLoadingTabs, selectTabsError, selectTabsList } from '../../store/tabs/tabs.selectors';
import { CardListComponent } from '../card-list/card-list.component';
import { ConfirmDeleteDashboardComponent } from '../confirm-delete-dashboard/confirm-delete-dashboard.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardListComponent, ConfirmDeleteDashboardComponent, CapitalizePipe],
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
  private destroyRef = inject(DestroyRef);
  private modalService = inject(ModalService);

  // Сигналы
  tabs = this.store.selectSignal(selectTabsList);
  isLoading = this.store.selectSignal(selectLoadingTabs);
  error = this.store.selectSignal(selectTabsError);

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

        //TODO если tabId нет в списке для dashboardId и он не равен 'null', то сделать редирект на 404
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
    const id = this.dashboardId();
    if (!id) return;

    const dashboard = this.store.selectSignal(selectorDashboardById(id))();

    this.modalService.open(this.deleteDashboardTemplate, 'deleteDashboard',
      { dashboard },
    );
  }
}
