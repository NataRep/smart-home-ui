import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, Input, signal, TemplateRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { timer } from 'rxjs';
import { loadTabs } from '../../store/tabs/tabs.actions';
import { selectLoadingTabs, selectTabsError, selectTabsList } from '../../store/tabs/tabs.selectors';
import { CardListComponent } from '../card-list/card-list.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  @Input() deleteDashboardTemplate!: TemplateRef<unknown>;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(Store);
  private destroyRef = inject(DestroyRef);

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
    console.log(this.dashboardId());
  }
}
